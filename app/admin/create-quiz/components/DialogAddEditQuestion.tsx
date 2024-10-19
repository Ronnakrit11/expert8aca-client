import {
    Button,
    Modal,
    TextInput,
    Textarea,
    Label,
    FileInput,
    Dropdown,
    Radio,
    Select,
} from "flowbite-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { ItemType } from "../add/page";
import { CiTrash } from "react-icons/ci";

const CHOICES = ["A", "B", "C", "D"];

const initialQuizState = {
    question: "",
    description: "",
    image: null,
    image_link: null,
    choices: [
        {
            choice: "A",
            answer: "",
            image: null,
        },
        {
            choice: "B",
            answer: "",
            image: null,
        },
        {
            choice: "C",
            answer: "",
            image: null,
        },
        {
            choice: "D",
            answer: "",
            image: null,
        },
    ],
}

interface IProps {
    openModal: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
    data?: ItemType;
    currentIndex?: number
}

const DialogAddEditQuestion: React.FC<IProps> = ({
    openModal,
    onClose,
    onAdd,
    data,
    currentIndex,
}: IProps) => {
    const [choiceType, setChoiceType] = React.useState("text");
    const [imageLise, setImageList] = React.useState([null, null, null, null]);
    const [imagePreview, setImagePreview] = React.useState([null, null, null, null,]);
    const [quizState, setQuizState] = React.useState<any>(JSON.parse(JSON.stringify(initialQuizState)));
    const [answer, setAnswer] = React.useState("");
    const [error, setError] = React.useState<any>({});
    const isEditMode = data ? true : false;
    const [imagePreviewTitle, setImagePreviewTitle] = React.useState('');

    useEffect(() => {
        if (data) {
            const { answer, ...another } = data

            setQuizState({ ...another })
            setAnswer(answer)
            setImagePreviewTitle(another?.image_link || another?.preview || '')
            console.log(another);

        }
    }, [data]);

    const validateError = (field = "") => {
        const newError: any = {};
        if (!quizState.question) {
            newError.question = "Question is required";
        }
        if (choiceType === "text") {
            quizState.choices.forEach((choice) => {
                if (!choice.answer) {
                    newError[choice.choice] = "Answer is required";
                }
            });
        } else {
            quizState.choices.forEach((choice) => {
                if (!choice.image) {
                    newError[choice.choice] = "Image is required";
                }
            });
        }
        const isHaveError = Object.keys(newError).length > 0;
        setError(newError);
        return isHaveError;
    };

    const onSelectedChoiceType = (e) => {
        setChoiceType(e.target.value);
    };

    const onChangeImage = (event, index) => {
        const newImageList = [...imageLise];
        newImageList[index] = event.target.files[0];
        setImageList(newImageList);
        genImagePreview(newImageList);
    };

    const genImagePreview = (newImageList) => {
        const newImagePreview: any = newImageList.map((image, index) => {
            if (image) {
                return URL.createObjectURL(image);
            }
            return null;
        });
        setImagePreview(newImagePreview);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setQuizState({ ...quizState, [name]: value });
    };

    const handleChangeRadio = (e) => {
        setAnswer(e.target.value);
    };

    const handleChoiceChange = (e, choice) => {
        const newChoices = [...quizState.choices];
        const choiceIndex = newChoices.findIndex((item) => item.choice === choice);
        newChoices[choiceIndex].answer = e.target.value;
        setQuizState({ ...quizState, choices: newChoices });
    };
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            let sizeMb = 2
            const maxSize = sizeMb * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                toast.error(`File size exceeds the ${sizeMb}MB limit. Please select a smaller file.`);
                e.target.value = "";
                setImagePreviewTitle('')
                return;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    const imageUrl = URL.createObjectURL(file);
                    setQuizState({ ...quizState, image_base64: reader.result, preview: imageUrl });
                    setImagePreviewTitle(imageUrl)
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setQuizState({ ...quizState, image_base64: '', image_link: '' });
        setImagePreviewTitle('')
    }
    const handleSubmit = () => {
        if (validateError()) {
            return;
        }

        if (!answer) {
            return toast.error("Please select answer");
        }

        const dataSave = {
            question: quizState.question,
            description: quizState.description,
            image: quizState.image,
            image_link: quizState.image_link,
            choices: quizState.choices,
            image_base64: quizState.image_base64,
            preview: quizState.preview,
            answer,
            isEditMode,
            currentIndex,
        };
        onAdd(dataSave);
    };
    return (
        <div>
            <Modal show={openModal} onClose={onClose}>
                <Modal.Header>Add Question</Modal.Header>
                <Modal.Body>
                    <div className="space-y-3">
                        <div>
                            <div className=" block">
                                <RequireLabel />
                                <Label htmlFor="small" value="Question" />
                            </div>
                            <TextInput
                                onChange={handleChangeInput}
                                color={error?.question ? "failure" : "gray"}
                                helperText={
                                    <>
                                        <span className="font-light text-[12px]">
                                            {error?.question}
                                        </span>
                                    </>
                                }
                                value={
                                    quizState.question
                                }
                                name="question"
                                id="small"
                                type="text"
                                sizing="sm"
                            />
                        </div>
                        <div>
                            <div className=" block">
                                <Label htmlFor="comment" value="Description" />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Leave a comment..."
                                required
                                rows={2}
                                name="description"
                                value={quizState.description}
                                onChange={handleChangeInput}
                            />
                        </div>
                        {/* <div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Upload file" />
                            </div>
                            <FileInput
                                id="file-upload-helper-text"
                                helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                                name="image"
                            />
                        </div> */}
                        {/* input image question */}
                        <div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Upload file" />
                            </div>
                            <FileInput
                                id="file-upload-helper-text"
                                helperText="SVG, PNG, JPG or GIF (MAX. 800x400px Size. 2MB)."
                                name="image"
                                onChange={handleFileChange}
                            />
                            <div className="flex justify-center">
                                {imagePreviewTitle &&
                                    <div className="relative">
                                        <img src={imagePreviewTitle} className="max-w-[800px] max-h-[400px]"></img>
                                        <CiTrash
                                            onClick={() => { handleDeleteImage() }}
                                            className='bg-white border-2 rounded-md absolute top-2 right-2 text-red-600 hover:scale-110  cursor-pointer' size={30} />
                                    </div>

                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-black mt-5">
                        <div className="flex items-center ">
                            <p>Choice : </p>
                            {/* <Select value={choiceType} onChange={onSelectedChoiceType} id="ChoiceType" required>
                                <option value={"text"}>Text</option>
                                <option value={"image"}>Image</option>
                            </Select> */}
                        </div>
                        <div className=" w-full grid grid-cols-2 gap-4">
                            {choiceType === "text" ? (
                                <>
                                    {CHOICES.map((choice) => {
                                        return (
                                            <Choice
                                                isError={error[choice]}
                                                dataChoice={quizState.choices.find((item) => item.choice === choice)}
                                                onBlur={validateError}
                                                key={choice}
                                                choice={choice}
                                                answer={answer}
                                                handleChangeRadio={handleChangeRadio}
                                                handleChoiceChange={handleChoiceChange}
                                            ></Choice>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {CHOICES.map((choice, index) => {
                                        return (
                                            <ChoiceImage
                                                key={choice}
                                                choice={choice}
                                                onChange={onChangeImage}
                                                idx={index}
                                                imagePreview={imagePreview[index]}
                                            ></ChoiceImage>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button onClick={() => handleSubmit()}>{
                        isEditMode ? "Update" : "Add"

                    }</Button>
                    <Button color="gray" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const RequireLabel = () => {
    return <span className="text-red-500">*</span>;
};

const Choice = ({
    dataChoice,
    choice,
    handleChangeRadio,
    answer,
    handleChoiceChange,
    isError,
    onBlur,
}) => {
    return (
        <div className="">
            <div className=" block">
                <div className="pl-5">
                    <RequireLabel />
                    <Label htmlFor="small" value={choice} className="" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Radio
                            checked={answer === choice}
                            onChange={handleChangeRadio}
                            id="united-state"
                            name={"choice-radio"}
                            value={choice}
                        />
                        <TextInput
                            value={dataChoice.answer}
                            onBlur={onBlur}
                            onChange={(event) => handleChoiceChange(event, choice)}
                            color={isError ? "failure" : "gray"}
                            className="w-full"
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                    {isError && (
                        <p className="mt-1 pl-6 text-[12px] text-red-600 dark:text-red-500">
                            <span className=" font-light">Choice is required</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChoiceImage = ({ choice, onChange, idx, imagePreview }) => {
    return (
        <div className="">
            <div className=" block">
                <div className="pl-5">
                    <RequireLabel />
                    <Label htmlFor="file-upload" value={choice} className="" />
                </div>
                <div className="flex justify-center pb-2">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Selected preview"
                            style={{ marginTop: "10px", maxHeight: "300px" }}
                        />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="united-state" name="countries" value={choice} />
                    <FileInput
                        onChange={(event) => onChange(event, idx)}
                        sizing="sm"
                        id="file-upload"
                    />
                </div>
            </div>
        </div>
    );
};

const DropdownType = () => {
    return (
        <Dropdown label="Type" dismissOnClick={false}>
            <Dropdown.Item>Text</Dropdown.Item>
            <Dropdown.Item>Image</Dropdown.Item>
        </Dropdown>
    );
};
export default DialogAddEditQuestion;

import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { ToggleSwitch } from "flowbite-react";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quizApi";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseQuiz: FC<Props> = ({
    courseInfo,
    setCourseInfo,
    active,
    setActive,
}) => {
    const [quizOptions, setQuizOptions] = useState<any[]>([]);
    const { data: quizData, isLoading: quizLoading, error: quizError, } = useGetAllQuizQuery<any>(undefined, { refetchOnMountOrArgChange: true, });
    const quiz = courseInfo.quiz;
    useEffect(() => {
        if (quiz) {

        }
    }, [])

    useEffect(() => {
        if (quizData) {
            const options = quizData.quiz.map((quiz) => ({ title: quiz.name, value: quiz._id }))
            setQuizOptions(options)
        }
    }, [quizData])

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (quiz.preTestEnabled) {
            if (quiz.preTestTitle === "") {
                toast.error("Please enter pre-test title!");
                return;
            }
            if (quiz.preTestId === "") {
                toast.error("Please select pre-test quiz!");
                return;
            }
        }

        if (quiz.postTestEnabled) {
            if (quiz.postTestTitle === "") {
                toast.error("Please enter post-test title!");
                return;
            }
            if (quiz.postTestId === "") {
                toast.error("Please select post-test quiz!");
                return;
            }
        }

        setActive(active + 1);
    };

    const handleQuizChange = (name, value) => {
        setCourseInfo((prev) => ({
            ...prev,
            quiz: {
                ...prev.quiz,
                [name]: value,
            },
        }));
    }

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    Quiz
                </label>
                <br />
            </div>
            <div className="mt-[20px] mb-5">
                <ToggleSwitch
                    sizing={'lg'}
                    checked={quiz.preTestEnabled}
                    label="Pre-test"
                    onChange={(value) => handleQuizChange('preTestEnabled', value)}
                />
            </div>
            {
                quiz.preTestEnabled && (
                    <div>
                        <label className={`${styles.label} text-[18px] mt-5`}>
                            Pre-test Title
                        </label>
                        <br />
                        <input
                            type="text"
                            name="preTestTitle"
                            placeholder="แบบทดสอบก่อนเรียน"
                            required
                            className={`${styles.input} my-2`}
                            value={quiz.preTestTitle}
                            onChange={({ target: { value } }) => handleQuizChange('preTestTitle', value)}
                        />
                        <div>
                            <label className={`${styles.label} text-[18px] mt-1`}>
                                Select Quiz
                            </label>
                            <br />
                            <SelectQuiz
                                quizOptions={quizOptions}
                                setQuizSelected={(value) => handleQuizChange('preTestId', value)}
                                quizSelected={quiz.preTestId}
                            />
                        </div>
                    </div>
                )
            }

            <div className="mt-[40px] mb-5">
                <ToggleSwitch
                    sizing={'lg'}
                    checked={quiz.postTestEnabled}
                    label="Post-test"
                    onChange={(value) => handleQuizChange('postTestEnabled', value)}
                />
            </div>
            {
                quiz.postTestEnabled && (
                    <div>
                        <label className={`${styles.label} text-[18px] mt-5`}>
                            Post-test Title
                        </label>
                        <br />
                        <input
                            type="text"
                            name="postTestTitle"
                            placeholder="แบบทดสอบหลังเรียน"
                            required
                            className={`${styles.input} my-2`}
                            value={quiz.postTestTitle}
                            onChange={({ target: { value } }) => handleQuizChange('postTestTitle', value)}
                        />
                        <div>
                            <label className={`${styles.label} text-[18px] mt-1`}>
                                Select Quiz
                            </label>
                            <br />
                            <SelectQuiz
                                quizOptions={quizOptions}
                                setQuizSelected={(value) => handleQuizChange('postTestId', value)}
                                quizSelected={quiz.postTestId}
                            />
                        </div>
                    </div>
                )
            }

            <SelectCert setCourseInfo={setCourseInfo} courseInfo={courseInfo} />

            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
        </div>
    );
};
const SelectCert = ({ courseInfo, setCourseInfo }) => {
    const optionList = [
        { title: 'Inactive certificate', value: '' },
        { title: 'PostTest', value: 'PostTest' },
        { title: 'Process', value: 'Process' },
        { title: 'PostTest or Process', value: 'PostTest or Process' },
    ]
    return (
        <>
            <div className={`${styles.label} mt-1`}>Certificate Option</div>
            <select value={courseInfo?.certificate || ''} className="w-full text-black"
                onChange={(event) => {
                    setCourseInfo((prev) => ({
                        ...prev,
                        certificate: event.target.value,
                    }));
                }}>
                {
                    optionList.map((option) => (
                        <option value={option.value}>{option.title}</option>
                    ))
                }

            </select>
        </>
    )
}
const SelectQuiz = ({ quizOptions, setQuizSelected, quizSelected }) => {
    return (
        <select value={quizSelected} className="w-full text-black"
            onChange={(event) => {
                setQuizSelected(event.target.value)
            }}>
            <option value="">Select Quiz</option>
            {
                quizOptions.map((option) => (
                    <option value={option.value}>{option.title}</option>
                ))
            }
        </select>
    )
}

export default CourseQuiz;

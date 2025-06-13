"use client";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuizInputForm from "./QuizInputForm";
import DialogAddQuizItem from "./DialogAddEditQuestion";
import { CiFloppyDisk } from "react-icons/ci";
import {
    useCreateQuizMutation,
    useGetAllQuizQuery,
    useGetQuizByIdQuery,
    useUpdateQuizMutation,
} from "@/redux/features/quiz/quizApi";
import toast from "react-hot-toast";
import { QuizDetailResponse } from "../type";

interface QuizDataResponse {
  quiz: QuizDetailResponse;
  success: boolean;
}

export type ItemType = {
    question: string;
    description: string;
    image?: string | null;
    choices: {
        choice: string;
        answer: string;
        image: string | null;
    }[];
    answer: string;
};

const initialItems: ItemType[] = [
    // {
    //   question: "ถ้าต้องการย้อนการเปลี่ยนแปลง commit ก่อนหน้า โดยไม่เปลี่ยนแปลงประวัติการ commit จะใช้คำสั่งอะไร",
    //   description: "vdfvdf",
    //   image: null,
    //   choices: [
    //     { choice: "A", answer: "git revert", image: null },
    //     { choice: "B", answer: "git forward", image: null },
    //     { choice: "C", answer: "git rollback", image: null },
    //     { choice: "D", answer: "git reflog", image: null },
    //   ],
    //   answer: "D",
    // },
];

interface IopenModal {
    isOpen: boolean;
    data?: ItemType;
    currentIndex?: number;
}

interface IProps {
    quizId?: string;
}

const QuizDetailContainner = ({ quizId }) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<IopenModal>({
        isOpen: false,
        data: undefined,
    });
    const [items, setItems] = useState<any[]>([]);

    console.log("🚀 ~ QuizDetailContainner ~ openModal:", openModal);
    const { refetch: refreshAllQuiz } = useGetAllQuizQuery({
        refetchOnMountOrArgChange: true,
    });
    const { data: quizData } = useGetQuizByIdQuery(quizId, {
        refetchOnMountOrArgChange: true,
    });

    const [parentItems, setParentItems] = useState(initialItems);
    const [state, setState] = useState({
        name: "",
        description: "",
        passPercentage: 80,
        maxSubmissionPreTest: 10,
        maxSubmissionPostTest: 10,
        timeLimitMinutes: 90,
        isCheckTotalTime: true,
    });

    const [createQuiz] = useCreateQuizMutation();
    const [updateQuiz] = useUpdateQuizMutation();

    const isEdit = quizId !== undefined;

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ quizId mounted");
    }, []);

    useEffect(() => {
        if (quizData && (quizData as QuizDataResponse).quiz) {
            const {
                name,
                description,
                pass_percentage,
                max_submission_pre_test,
                max_submission_post_test,
                quizItem,
                time_limit_minutes,
            } = (quizData as QuizDataResponse).quiz;
            setState({
                name,
                description,
                passPercentage: pass_percentage,
                maxSubmissionPreTest: max_submission_pre_test,
                maxSubmissionPostTest: max_submission_post_test,
                timeLimitMinutes: time_limit_minutes,
                isCheckTotalTime: (time_limit_minutes > 0),
            });

            setItems(quizItem);
            console.log("🚀 ~ useEffect ~ quizData:", quizData);
            // fetch quiz by id
        }
    }, [quizData]);

    const callbackDragEndItem = (items) => {
        setItems(items);
    };

    const handleAddQuizItem = (item) => {
        if (openModal.currentIndex !== undefined) {
            const newItem = [...items];
            newItem[openModal.currentIndex] = item;
            setItems(newItem);
            handleCloseModal();
            return;
        }
        setItems([...items, item]);
        handleCloseModal();
    };

    const handleEdit = (index) => {
        const selectQuestion = items.find((ele, idx) => idx === index);
        console.log("🚀 ~ handleEdit ~ selectQuestion:", selectQuestion);
        setOpenModal({
            isOpen: true,
            data: selectQuestion,
            currentIndex: index,
        });
    };

    const handleDelete = (index) => {
        console.log("🚀 ~ handleDelete ~ index:", index);
        const newItem = items.filter((ele, idx) => idx !== index);
        console.log("🚀 ~ handleDelete ~ newItem:", newItem);
        if (newItem.length === 0) {
            return setItems([]);
        }
        setItems([...newItem]);
    };

    const handleCloseModal = () => {
        setOpenModal({
            isOpen: false,
            data: undefined,
        });
    };

    const handleSave = async () => {
        if (!state.name) {
            return toast.error("Please enter quiz name");
        }
        const payloadBody = {
            name: state.name,
            description: state.description,
            pass_percentage: state.passPercentage,
            max_submission_pre_test: state.maxSubmissionPreTest,
            max_submission_post_test: state.maxSubmissionPostTest,
            time_limit_minutes: state.timeLimitMinutes,
            quizItem: items.map((item) => ({
                question: item.question,
                description: item.description,
                image: item.image,
                image_base64: item.image_base64,
                image_link: item.image_link,
                choices: item.choices.map((choice) => ({
                    choice: choice.choice,
                    answer: choice.answer,
                    type: "text",
                    image: choice.image,
                })),
                answer: item.answer,
            })),
        };

        if (isEdit) {
            // update quiz
            return toast.promise(
                updateQuiz({ body: payloadBody, quizId: (quizData as QuizDataResponse).quiz._id })
                    .unwrap()
                    .then((res) => {
                        refreshAllQuiz();
                    }),
                {
                    loading: "Updating...",
                    success: "Update success",
                    error: "Update quiz failed",
                }
            );
        }

        toast.promise(
            createQuiz(payloadBody)
                .unwrap()
                .then((res) => {
                    refreshAllQuiz();
                    router.push("/admin/create-quiz");
                }),
            {
                loading: "Creating...",
                success: "Create success",
                error: "Create quiz failed",
            }
        );

    };

    const handleClickAddQuizItem = () => {
        setOpenModal({
            isOpen: true,
            data: undefined,
        });
    };

    const lengthQuizItem = items.length;
    return (
        <div>
            <div className="text-black min-w-[900px] mt-[40px]">
                <div className="w-full flex justify-between items-center">
                    <Button onClick={() => router.back()} color="light">
                        {" "}
                        {"< "}Back
                    </Button>

                    <Button onClick={handleClickAddQuizItem} gradientMonochrome="lime">
                        + Add Question
                    </Button>
                </div>
                <div>
                    <QuizInputForm
                        state={state}
                        setState={setState}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        callBack={callbackDragEndItem}
                        items={items}
                    />
                </div>
                {openModal.isOpen && (
                    <DialogAddQuizItem
                        data={openModal.data}
                        currentIndex={openModal.currentIndex}
                        onAdd={handleAddQuizItem}
                        openModal={openModal.isOpen}
                        onClose={handleCloseModal}
                    />
                )}
                <div className="flex justify-center mt-10">
                    <Button onClick={handleSave}>
                        <CiFloppyDisk className="mr-2 h-5 w-5" />
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizDetailContainner;

"use client";

import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import ReorderableAccordion from "./TableQuestion";
import { useDeleteQuizMutation, useGetAllQuizQuery } from "@/redux/features/quiz/quizApi";
import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import toast from "react-hot-toast";
import { DialogDeleteConfirm } from "@/app/admin/upload/component/DialogDeleteConfirm";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/DashboardHero";

interface Quiz {
    _id: string,
    name: string,
    quizItemCount: number,
    pass_percentage: number
}

interface QuizResponse {
    quiz: Quiz[];
    success: boolean;
}

const QuizPage = () => {
    const router = useRouter()
    const { data: quizResponse, refetch } = useGetAllQuizQuery({ refetchOnMountOrArgChange: true })
    const [deleteQuiz,] = useDeleteQuizMutation()
    const [dataList, setDataList] = useState<Quiz[]>([])
    const [openModalDel, setOpenModalDel] = useState(false)
    const [selectDelId, setSelectDelId] = useState<string | null>(null)

    useEffect(() => {
        if (quizResponse) {
            // console.log("🚀 ~ useEffect ~ quizResponse:", quizResponse.quiz)
            setDataList((quizResponse as QuizResponse).quiz)
        }
    }, [quizResponse])

    const handleDelQuiz = (quizId?: string) => {
        if (!quizId) return

        toast.promise(
            deleteQuiz(quizId).unwrap().then(() => {
                setOpenModalDel(false)
                refetch()
            }),
            {
                loading: 'Deleting...',
                success: 'Deleted successfully',
                error: 'Failed to delete'
            }
        )
        console.log("🚀 ~ handleDelQuiz ~ idx", quizId)
    }



    return (
        <div>

            <div className="w-full flex justify-end text-black">
                <Button color="info" onClick={() => router.push('/admin/create-quiz/add')}>+ Create quiz</Button>
            </div>
            <div className="overflow-x-auto mt-3">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Total question</Table.HeadCell>
                        <Table.HeadCell>Pass percentage</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            dataList.map((item, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell>{item.quizItemCount}</Table.Cell>
                                    <Table.Cell>{item.pass_percentage}%</Table.Cell>
                                    <Table.Cell className="flex justify-end gap-2">
                                        <button onClick={() => router.push(`/admin/create-quiz/${item._id}`)}><CiEdit className=' hover:scale-110' size={22} /></button>
                                        <button onClick={() => {
                                            setSelectDelId(item._id)
                                            setOpenModalDel(true)
                                        }}><CiTrash className=' hover:scale-110' size={22} /></button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                {
                    openModalDel && <DialogDeleteConfirm
                        openModal={openModalDel}
                        onClose={() => { setOpenModalDel(false) }}
                        onConfirm={() => { handleDelQuiz(selectDelId || '') }}
                    />
                }
            </div>
        </div>
    )
}

export default QuizPage
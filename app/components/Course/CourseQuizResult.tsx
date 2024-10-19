import { Button } from 'flowbite-react'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Table } from "flowbite-react";
import { DateLongTH, DateShortTH, DateShortTHAndTime, DiffBetweenDateInMinutes, DiffBetweenDateWithLabel } from '@/app/utils/dateFomat';
import { RxCrossCircled } from "react-icons/rx";
import { BiListCheck, BiRevision } from 'react-icons/bi';

const CourseQuizResult = ({
	isPassed,
	score,
	totalScore,
	onCheckAnswer,
	onReQuiz,
	title,
	histoyList,
	maxSubmit,
}) => {
	console.log("🚀 ~ histoyList:", histoyList)
	return (
		<div className='flex justify-center flex-col items-center'>
			<h1 className='text-2xl'>ผลของการทดสอบ</h1>
			<h1 className='text-xl mt-2'>{title}</h1>
			<div className='flex justify-center flex-col items-center mt-5'>
				{
					isPassed ? <PassIcon /> : <FailIcon />
				}
			</div>
			<div className='flex justify-between items-center flex-col mt-4'>
				<p>คะแนนที่ได้: <span className=' font-bold'>{score}</span> /  {totalScore}</p>
				<div className="overflow-x-auto mt-2">
					<Table>
						<Table.Head>
							<Table.HeadCell>ครั้งที่</Table.HeadCell>
							<Table.HeadCell>วันที่</Table.HeadCell>
							<Table.HeadCell>คะเเนน</Table.HeadCell>
							<Table.HeadCell>สถานะ</Table.HeadCell>
							<Table.HeadCell>เวลาที่ใช้</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{
								histoyList.map((item, index) => (
									<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<Table.Cell>{index + 1}</Table.Cell>
										<Table.Cell>{DateShortTHAndTime(item.submit_date)}</Table.Cell>
										<Table.Cell>{item.score}</Table.Cell>
										<Table.Cell>{item.isPassed ? 'ผ่าน' : 'ไม่ผ่าน'}</Table.Cell>
										<Table.Cell>{DiffBetweenDateWithLabel(item.submit_date, item.start_date)}</Table.Cell>
									</Table.Row>
								))
							}
						</Table.Body>
					</Table>
				</div>
				<div className='flex justify-center gap-5 mt-10'>
					<Button color="gray" onClick={onCheckAnswer}><BiListCheck size={16} className='mr-1'/>ตรวจสอบคำตอบ</Button>
					{
						!isPassed && <Button disabled={histoyList.length >= maxSubmit} onClick={onReQuiz}>
							<BiRevision size={16}  className='mr-2'/>
							ทดสอบใหม่อีกครั้ง (
							{histoyList.length}/{maxSubmit}
							)
						</Button>
					}
				</div>
			</div>
		</div>
	)
}

const PassIcon = () => {
	return (
		<>
			<IoMdCheckmarkCircleOutline size={99} className='text-9xl text-green-500' />
			<p className='text-xl text-green-500 font-bold'>ผ่าน</p>
		</>
	)
}

const FailIcon = () => {
	return (
		<>
			<RxCrossCircled size={99} className='text-9xl text-red-500' />
			<p className='text-xl text-red-500 font-bold'>ไม่ผ่าน</p>
		</>
	)
}
export default CourseQuizResult
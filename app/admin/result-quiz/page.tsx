"use client";
import React, { useEffect, useMemo, useState } from "react";
// import QuizPage from './components/QuizPage'
import { Label, Select } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Table } from "flowbite-react";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quizApi";
import { Pagination } from "flowbite-react";
import axios from "axios";
import { DateShortTHAndTime } from "@/app/utils/dateFomat";

const last30Days = new Date();
last30Days.setDate(last30Days.getDate() - 30);


const page = () => {
  const { data: quizResponse } = useGetAllQuizQuery({
    refetchOnMountOrArgChange: true,
  });
  const [quizOptions, setQuizOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState("" as string);
  const [dataTable, setDataTable] = useState<
    {
      name: string;
      score: number;
      status: boolean;
      lastSubmitDate: string;
      totalSubmit: number;
    }[]
  >([]);
  const [selectedQuizType, setSelectedQuizType] = useState(
    "pre-test" as string
  );
  const [selectedQuizObject, setSelectedQuizObject] = useState<any>({});
  const [responseQuizReport, setResponseQuizReport] = useState<any>({});
  const [formDate, setFormDate] = useState(last30Days);
  console.log("🚀 ~ page ~ formDate:", formDate)
  const [toDate, setToDate] = useState('');

  const onPageChange = (page: number) => setCurrentPage(page);
  useEffect(() => {
    if (quizResponse?.quiz?.length) {
      const quizOptions = quizResponse.quiz.map((quiz) => {
        return { label: quiz.name, value: quiz._id };
      });
      setQuizOptions(quizOptions);
    }
  }, [quizResponse]);

  useEffect(() => {
    if (quizOptions.length) {
      setSelectedQuiz(quizOptions[0].value);
      const selectedQuizObject = quizResponse.quiz.find(
        (quiz) => quiz._id === quizOptions[0].value
      );
      setSelectedQuizObject(selectedQuizObject);
    }
  }, [quizOptions]);

  useEffect(() => {
    if (selectedQuiz) {
      fetchQuizReport();
    }
  }, [selectedQuiz]);

  const fetchQuizReport = () => {
    axios
      .get("/api/v1/admin/quiz-report", {
        params: {
          quiz_id: selectedQuiz,
        },
      })
      .then((res) => {
        if (res.data?.result?.length) {
          const tableList = res.data.result.map((item: any) => {
            const isPretest = selectedQuizType === "pre-test";
            const selected_key = isPretest ? "pre_test" : "post_test";
            return {
              name: item.user[0].name,
              score: item[`${selected_key}_score`],
              status: item[`${selected_key}_passed`],
              lastSubmitDate: item[`${selected_key}_last_submit_date`],
              totalSubmit: item[`${selected_key}_count`],
            };
          });
          setDataTable(tableList);
          setResponseQuizReport(res.data.result);
        } else {
          setDataTable([]);
          setResponseQuizReport([]);
        }
      });
  };

  useEffect(() => {
    if (responseQuizReport.length) {
      const tableList = responseQuizReport.map((item: any) => {
        const isPretest = selectedQuizType === "pre-test";
        const selected_key = isPretest ? "pre_test" : "post_test";
        return {
          name: item.user[0].name,
          score: item[`${selected_key}_score`],
          status: item[`${selected_key}_passed`],
          lastSubmitDate: item[`${selected_key}_last_submit_date`],
          totalSubmit: item[`${selected_key}_count`],
        };
      });
      setDataTable(tableList);
    } else {
      setDataTable([]);
    }
  }, [selectedQuizType]);

  const totalData = dataTable.length;
  const dataPerPage = 10;
  const totalPage = Math.ceil(totalData / dataPerPage);

  const getPaginationData = () => {
    const start = (currentPage - 1) * dataPerPage;
    const end = start + dataPerPage;
    return dataTable?.slice?.(start, end) || [];
  };

  const getSummarize = useMemo(() => {
    const dataList = dataTable;
    const total = dataList.length;
    const passed = dataList.filter((item) => item.status).length;
    const failed = total - passed;
    const avgScore =
      dataList.reduce((acc, item) => acc + item.score, 0) / total;
    return {
      total,
      passed,
      failed,
      avgScore,
    };
  }, [dataTable]);

  return (
    <div className="w-[900px]">
      <div className="flex gap-4 mb-5">
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="quizType" value="Quiz Type" />
            </div>
            <Select
              id="quizType"
              required
              value={selectedQuizType}
              onChange={(e) => setSelectedQuizType(e.target.value)}
            >
              <option value={"pre-test"}>Pre Test</option>
              <option value={"post-test"}>Post Test</option>
            </Select>
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="quiz" value="Select Quiz" />
            </div>
            <Select
              id="quiz"
              required
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
            >
              {quizOptions.map((quiz: any) => {
                return (
                  <option key={quiz.value} value={quiz.value}>
                    {quiz.label}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        {/* <div className='grid grid-cols-2 w-full gap-4'>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="formDate" value="from date" />
            </div>
            <Datepicker
              id='formDate'
              language='th'
              value={formDate.toISOString()}
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="toDate" value="to date" />
            </div>
            <Datepicker
              id='toDate'
              language='th'
            />
          </div>
        </div> */}
      </div>

      <div>
        <div>
          <div className="flex justify-end text-black">
            <div>
              <div className="flex gap-4">
                <div className="text-sm">
                  <p>Total: {getSummarize.total}</p>
                  <p>Passed: {getSummarize.passed}</p>
                  <p>Failed: {getSummarize.failed}</p>
                  <p>Avg Score: {getSummarize.avgScore.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Score</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Last Submit Date</Table.HeadCell>
              <Table.HeadCell>Total Submit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {getPaginationData().map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {+dataPerPage * (currentPage - 1) + (index + 1)}
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    {item.score}/{selectedQuizObject?.quizItemCount}
                  </Table.Cell>
                  <Table.Cell
                    className={`${item.status ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {item.status ? "Passed" : "Failed"}
                  </Table.Cell>
                  <Table.Cell>
                    {DateShortTHAndTime(new Date(item.lastSubmitDate))}
                  </Table.Cell>
                  <Table.Cell>{item.totalSubmit}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex overflow-x-auto sm:justify-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

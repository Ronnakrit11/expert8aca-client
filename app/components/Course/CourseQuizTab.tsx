import { Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { VscNotebook } from "react-icons/vsc";
import CourseQuizStart from './CourseQuizStart';
import { useGetQuizStatusMutation, useStartQuizMutation } from '@/redux/features/quiz/quizApi';
import { toast } from 'react-hot-toast';
import CourseQuizResult from './CourseQuizResult';
import CourseQuizCheck from './CourseQuizCheck';

export const QUIZ_STAGE = {
  NOT_START: "NOT_START",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
}

export const QUIZ_TYPE = {
  PRE_TEST: "pre-test",
  POST_TEST: "post-test",
}

enum TAB_ENUM {
  INITIAL,
  INTRO_QUIZ,
  START_QUIZ,
  CHECK_ANSWER,
  RESULT,
}


const CourseQuizTab = ({ quizData, isPreTest, courseId, preTestRefetch }) => {
  const [startQuiz] = useStartQuizMutation()
  const [questionList, setQuestionList] = React.useState([])
  const [
    getQuizStatus,
  ] = useGetQuizStatusMutation()

  const [tab, setTab] = React.useState(TAB_ENUM.INITIAL)
  console.log("🚀 ~ CourseQuizTab ~ tab:", tab)
  const [quizSubmission, setQuizSubmission] = React.useState<any>({})
  const [answerList, setAnswerList] = React.useState([])
  const [lastSubmission, setLastSubmission] = React.useState({
    score: 0,
    totalScore: 0,
    isPassed: false,
    submit_date: ''
  })
  const quizType = isPreTest ? QUIZ_TYPE.PRE_TEST : QUIZ_TYPE.POST_TEST
  const [submissionId, setSubmissionId] = React.useState('')
  const preTestId = quizData?.preTestId?._id || quizData.preTestId;
  const [quizStartInfo, setQuizStartInfo] = React.useState<any>({})

  useEffect(() => {
    fetchQuizStatus()
  }, [])

  useEffect(() => {
    fetchQuizStatus()
  }, [isPreTest])

  const fetchQuizStatus = () => {
    console.log("🚀 ~ fetchQuizStatus ~ payload.quizData:", quizData)
    const payload = {
      quizId: isPreTest ? preTestId : quizData?.postTestId?._id,
      body: {
        course_id: courseId,
        type: isPreTest ? QUIZ_TYPE.PRE_TEST : QUIZ_TYPE.POST_TEST,
      }
    }

    getQuizStatus(payload).unwrap().then(({ result }: any) => {
      const { quizSubmission, quiz, } = result
      const quizStatus = isPreTest ? quizSubmission?.pre_test_status : quizSubmission?.post_test_status || null
      if (quizStatus === QUIZ_STAGE.COMPLETED) {
        const selectTest = isPreTest ? quizSubmission.pre_test : quizSubmission.post_test
        const answerList = selectTest[selectTest.length - 1].answerList
        const mapAnswerList = answerList.map(item => item.answer)
        console.log("🚀 ~ getQuizStatus ~ mapAnswerList:", mapAnswerList)
        const lastSubmission = selectTest[selectTest.length - 1]
        setQuizSubmission(quizSubmission)
        setLastSubmission({
          ...lastSubmission,
          totalScore: lastSubmission.answerList.length
        })
        setQuestionList(quiz.quizItem)
        setAnswerList(mapAnswerList)
        setSubmissionId(result?.submissionId ?? '')
        setQuizStartInfo(result)
        setTimeout(() => {
          setTab(TAB_ENUM.RESULT)
        }, 0)
      }
      else if (quizStatus === QUIZ_STAGE.NOT_START) {
        console.log('in not start');

        setQuizStartInfo(result)
        setTab(TAB_ENUM.INTRO_QUIZ)
      } else if (quizStatus === QUIZ_STAGE.PENDING) {
        setQuestionList(quiz.quizItem)
        setSubmissionId(result?.submissionId ?? '')
        setQuizStartInfo({
          ...result,
          currentSubmission: lastSubmission,
        })
        setTimeout(() => {
          setTab(TAB_ENUM.START_QUIZ)
        }, 0)
      } else {
        setQuizStartInfo(result)
        setTab(TAB_ENUM.INTRO_QUIZ)
      }
      console.log("🚀 ~ fetchQuizStatus ~ result", result)
    }).catch(err => {
      console.log("🚀 ~ getQuizStatus ~ err:", err)
      toast.error(err?.data?.message || "Failed to fetch quiz status")
    })
  }

  const handleClickStartQuiz = async () => {
    const payload = {
      quizId: preTestId,
      body: {
        course_id: courseId,
        type: isPreTest ? 'pre-test' : 'post-test',
      }
    }
    await startQuiz(payload).unwrap().then((result: any) => {
      const { quizItem } = result.quiz
      const { quizSubmission } = result
      const selectQuiz = isPreTest ? quizSubmission.pre_test : quizSubmission.post_test
      setQuizStartInfo({
        ...result,
        currentSubmission: selectQuiz[selectQuiz.length - 1]
      })
      setQuestionList(quizItem)
      setSubmissionId(result.submissionId)
      setTimeout(() => {
        setTab(TAB_ENUM.START_QUIZ)
      }, 0)
    }).catch(err => {
      console.error("🚀 ~ awaitstartQuiz ~ err:", err)
      toast.error(err?.data?.message || "Failed to start quiz")

    })
  }

  const handleShowCheckAnswer = () => {
    setTab(TAB_ENUM.CHECK_ANSWER)
  }


  const totalQuestion = quizStartInfo?.quiz?.quizItem?.length ?? 0;
  const amountItemPassFromPercent = Math.floor(
    (quizStartInfo?.quiz?.pass_percentage * totalQuestion) / 100
  );

  const quizTitle = isPreTest ? quizData.preTestTitle : quizData.postTestTitle

  return (
    <div className=''>
      {
        isPreTest ? (
          <div className='mt-5 flex justify-center flex-col items-center space-y-3 w-[800px] max-w-[800px]'>
            {
              tab === TAB_ENUM.RESULT ? (
                <>
                  <CourseQuizResult
                    onReQuiz={() => setTab(TAB_ENUM.INTRO_QUIZ)}
                    histoyList={quizSubmission.pre_test ?? []}
                    isPassed={lastSubmission.isPassed}
                    score={lastSubmission.score}
                    totalScore={lastSubmission.totalScore}
                    onCheckAnswer={handleShowCheckAnswer}
                    title={quizTitle}
                    maxSubmit={isPreTest ? quizStartInfo?.quiz?.max_submission_pre_test : quizStartInfo?.quiz?.max_submission_post_test}
                  />
                </>
              ) : null
            }
            {
              tab === TAB_ENUM.CHECK_ANSWER ? (
                <div>
                  <CourseQuizCheck
                    answerList={answerList}
                    questionList={questionList}
                    quizData={quizData}
                    onBack={() => setTab(TAB_ENUM.RESULT)}
                  />
                </div>
              ) : null
            }
            {
              tab === TAB_ENUM.START_QUIZ ? (
                <CourseQuizStart
                  preTestRefetch={preTestRefetch}
                  isPreTest={isPreTest}
                  submissionId={submissionId}
                  courseId={courseId}
                  questionList={questionList}
                  quizData={quizData}
                  quizStartInfo={quizStartInfo}
                  fetchQuizStatus={fetchQuizStatus}
                />
              ) : null
            }
            {
              tab === TAB_ENUM.INTRO_QUIZ ? (
                <>
                  <h1 className='text-xl font-semibold'>{quizStartInfo?.quiz?.name}</h1>
                  <p>แบบทดสอบก่อนเรียน</p>
                  <p>ข้อสอบทั้งหมด {quizStartInfo?.quiz?.quizItem?.length} ข้อ</p>
                  <p>ต้องผ่านด้วยคะแนนมากกว่า {quizStartInfo?.quiz?.pass_percentage}% ({amountItemPassFromPercent}/{totalQuestion})</p>
                  <p>สามารถทำแบบทดสอบนี้ได้ {isPreTest ? quizStartInfo?.quiz?.max_submission_pre_test : quizStartInfo?.quiz?.max_submission_post_test} ครั้ง</p>
                  <p>มีเวลาทำแบบทดสอบทั้งหมด {quizStartInfo?.quiz?.time_limit_minutes} นาที</p>
                  <Button onClick={handleClickStartQuiz} label="1"><VscNotebook className="mr-2 h-5 w-5" />เริ่มทำแบบทดสอบ</Button>
                </>
              ) : null
            }
          </div>
        ) : (
          <div className='mt-5 flex justify-center flex-col items-center space-y-3 w-[800px] max-w-[800px]'>
            {
              tab === TAB_ENUM.RESULT ? (
                <>
                  <CourseQuizResult
                    onReQuiz={() => setTab(TAB_ENUM.INTRO_QUIZ)}
                    histoyList={quizSubmission.post_test ?? []}
                    isPassed={lastSubmission.isPassed}
                    score={lastSubmission.score}
                    totalScore={lastSubmission.totalScore}
                    onCheckAnswer={handleShowCheckAnswer}
                    title={quizTitle}
                    maxSubmit={isPreTest ? quizStartInfo?.quiz?.max_submission_pre_test : quizStartInfo?.quiz?.max_submission_post_test}
                  />
                </>
              ) : null
            }
            {
              tab === TAB_ENUM.CHECK_ANSWER ? (
                <div>
                  <CourseQuizCheck
                    answerList={answerList}
                    questionList={questionList}
                    quizData={quizData}
                    onBack={() => setTab(TAB_ENUM.RESULT)}
                  />
                </div>
              ) : null
            }
            {
              tab === TAB_ENUM.START_QUIZ ? (
                <CourseQuizStart
                  isPreTest={isPreTest}
                  submissionId={submissionId}
                  courseId={courseId}
                  questionList={questionList}
                  quizData={quizData}
                  quizStartInfo={quizStartInfo}
                  fetchQuizStatus={fetchQuizStatus}
                  preTestRefetch={preTestRefetch}
                />
              ) : null
            }
            {
              tab === TAB_ENUM.INTRO_QUIZ ? (
                <>
                  <h1 className='text-xl font-semibold'>{quizStartInfo?.quiz?.name}</h1>
                  <p>แบบทดสอบหลังเรียน</p>
                  <p>ข้อสอบทั้งหมด {quizStartInfo?.quiz?.quizItem?.length} ข้อ</p>
                  <p>ต้องผ่านด้วยคะแนนมากกว่า {quizStartInfo?.quiz?.pass_percentage}% ({amountItemPassFromPercent}/{totalQuestion})</p>
                  <p>สามารถทำแบบทดสอบนี้ได้ {isPreTest ? quizStartInfo?.quiz?.max_submission_pre_test : quizStartInfo?.quiz?.max_submission_post_test} ครั้ง</p>
                  <p>มีเวลาทำแบบทดสอบทั้งหมด {quizStartInfo?.quiz?.time_limit_minutes} นาที</p>
                  <Button onClick={handleClickStartQuiz} label="1"><VscNotebook className="mr-2 h-5 w-5" />เริ่มทำแบบทดสอบ</Button>
                </>
              ) : null
            }
          </div>
        )
      }
    </div>
  )
}

export default CourseQuizTab
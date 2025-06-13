import { useGetCourseContentQuery, useGetCourseDetailsQuery, useGetUserProgressQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import { Button, Progress } from "flowbite-react";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PiBookBookmarkLight } from "react-icons/pi";
import { PiBookOpenText } from "react-icons/pi";
import { FaAward } from "react-icons/fa6";
import CourseQuiz from "../Admin/Course/CourseQuiz";
import CouseQuizTab from "./CourseQuizTab";
import { useGetQuizInfoQuery } from "@/redux/features/quiz/quizApi";
import { useSelector } from "react-redux";
import PdfCart from "../../components/Certificate/pdfgen"

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <Box sx={{ width: '100%', mr: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 20, backgroundColor: '#fef5e7', padding: '5px', marginLeft: '5px' }}>
          <FaAward size={20} className="text-[#faa718]" />
        </Box>
      </Box>
      <Box sx={{ minWidth: 40, display: 'flex', gap: 1, marginTop: '-10px' }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(
            props.value,
          )}%`}</Typography>
        <Typography variant="body2" color="text.secondary">
          completed
        </Typography>

      </Box>
    </Box>
  );
}

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery<any>(id, { refetchOnMountOrArgChange: true });
  const { responseUpdateWatched } = useSelector((state: any) => state.courses)
  const totalWatched = responseUpdateWatched?.total_watch_time || 0
  const quiz = courseData?.course?.quiz || {};
  const preTestId = quiz?.preTestId?._id || quiz.preTestId;
  const { data: preTestData, refetch: preTestRefetch } = useGetQuizInfoQuery<any>(preTestId && { quiz_id: preTestId, course_id: id });
  const [open, setOpen] = useState(false);
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);
  const [isPretest, setIsPretest] = useState(false);
  const [route, setRoute] = useState("Login");
  const data = contentData?.content;
  const {
    data: userProgressData,
    isLoading: userProgressLoading,
    refetch: refetchUserProgress,
  } = useGetUserProgressQuery<any>(id, { refetchOnMountOrArgChange: true });
  const [currentTime, setCurrentTime] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPretestPass, setIsPretestPass] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const percentage = data?.length ? ((userProgressData?.userProgress?.video_compleated_id?.length || 0) / data.length) * 100 : 0;
  useEffect(() => {
    if (data?.length && userProgressData?.userProgress?.video_compleated_id?.length && activeVideo === 0) {
      const lastVideo = userProgressData?.userProgress?.video_compleated_id?.[userProgressData?.userProgress?.video_compleated_id?.length - 1];
      const index = data.findIndex((item) => item._id === lastVideo?.video_id);
      if (index !== data.length - 1) {
        setActiveVideo(index + 1);
      }
    }

    return () => {

    }
  }, [data, userProgressData])
  const ButtonCert = () => {
    // console.log(courseData?.course?.certificate);
    if (!courseData?.course?.certificate) {
      return <></>
    }
    if (courseData?.course?.certificate == 'PostTest' && !preTestData?.result?.post_test_passed) {
      return <></>
    }
    else if (courseData?.course?.certificate == 'Process' && percentage !== 100) {
      return <></>
    }
    else if (courseData?.course?.certificate == 'PostTest or Process') {
      if (!preTestData?.result?.post_test_passed && percentage !== 100) {
        return <></>
      }

    }
    return <>
      <Button
        className="w-full mt-4"
        color="gray"
        onClick={() => {
          setPdfModal(true)
        }}
      >
        <PiBookOpenText className="mr-2 h-5 w-5" />
        Certificate
      </Button>
    </>
  }
  return (
    <>
      {(isLoading && !data) ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-1">
            <Heading
              title={data?.[activeVideo]?.title}
              description="anything"
              keywords={data?.[activeVideo]?.tags}
            />
            <div className="w-full bg-gradient-9 text-black mt-5">
              <div className="flex flex-col-reverse md:flex-row px-5 md:px-10">
                <div className=" text-black max-w-[665px] md:min-w-[300px]">
                  <div>
                    <LinearProgressWithLabel value={percentage} />
                  </div>
                  {
                    quiz?.preTestEnabled && (
                      <div className="mt-5">
                        <Button onClick={() => {
                          setIsOpenQuiz(true)
                          setIsPretest(true)
                          setActiveVideo(-1)
                        }
                        } className="w-full" color="gray">
                          <PiBookBookmarkLight className="mr-2 h-5 w-5" />
                          {quiz?.preTestTitle}
                        </Button>
                      </div>
                    )
                  }
                  <CourseContentList
                    userProgress={userProgressData?.userProgress || {}}
                    setActiveVideo={(value) => {
                      setActiveVideo(value)
                      setIsOpenQuiz(false)
                    }}
                    data={data}
                    activeVideo={activeVideo}
                  />
                  {
                    quiz?.postTestEnabled && (
                      <div className="mt-5">
                        <Button
                          disabled={!preTestData?.result?.pre_test_passed}
                          className="w-full"
                          color="gray"
                          onClick={() => {
                            setIsOpenQuiz(true)
                            setIsPretest(false)
                            setActiveVideo(-1)
                          }}
                        >
                          <PiBookOpenText className="mr-2 h-5 w-5" />
                          {quiz?.postTestTitle}
                        </Button>
                      </div>
                    )
                  }
                  <ButtonCert />

                </div>
                <div className="md:pl-3 pt-3 w-full flex justify-center">
                  {
                    isOpenQuiz ? (
                      <CouseQuizTab
                        courseId={id}
                        isPreTest={isPretest}
                        quizData={quiz}
                        preTestRefetch={preTestRefetch}
                      />
                    )
                      : <>
                        {
                          <CourseContentMedia
                            refetchUserProgress={refetchUserProgress}
                            totalWatched={totalWatched}
                            totalLimitWatch={courseData?.course?.limitWatchedTime}
                            videoList={data}
                            id={id}
                            activeVideo={activeVideo}
                            setActiveVideo={setActiveVideo}
                            user={user}
                            refetch={refetch}
                          />
                        }


                      </>
                  }

                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <PdfCart openModal={pdfModal} onClose={() => { setPdfModal(false) }} data={{
        data: courseData, name: user.name,
        date: userProgressData?.userProgress?.createdAt
      }} />
    </>
  );
};

export default CourseContent;
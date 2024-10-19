import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllEbookQuery } from "@/redux/features/ebooks/ebookApi";
import EbookCard from "../Ebook/EbookCard";

type Props = {};

const Ebooks = (props: Props) => {
  const { data, isLoading } = useGetAllEbookQuery(undefined, {});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.ebooks);
  }, [data]);

  return (
    <div className="bg-gradient-2">
      <div className={`w-[90%] 800px:w-[80%] m-auto pt-10`}>
        <h1  data-aos="fade-down"  className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#1c1c64] font-[900] tracking-tight">
        หนังสือของเรา  
        {/* <span className="text-gradient text-[32px]"></span>{" "} */}
        </h1>
        <br />
        <br />
        <div  data-aos="fade-right"  className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] pb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <EbookCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Ebooks;

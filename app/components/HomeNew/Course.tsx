import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Image from "next/image";


type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="bg-gradient-1 pb-10">
      <div className={`w-[90%] 800px:w-[80%] m-auto pt-10 color-white`}>
      
             {/* <Image src={'/heropro.jpg'} height={100} width={500} alt="" className="object-scale-down rounded-2xl md:w-full flex justify-center lg:w-[10] " />  */}
            <br /><br />
          
        <h1  data-aos="fade-down"  className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#f4f4f7] font-[700] tracking-tight">
          คอร์สเรียนดีๆจากเรา
          {/* <span className="text-gradient"></span>{" "} */}
          <br />
          เราคัดมาให้โดยเฉพาะ
        </h1>
        <br />
        <br />
        <div  data-aos="fade-right"  className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

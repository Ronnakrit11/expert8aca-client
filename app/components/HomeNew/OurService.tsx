import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blogsApi";
import BlogCard from "../Admin/Blog/BlogCard";
import Image from "next/image";
import { FaLine } from "react-icons/fa6";

type Props = {};

const imageList = [
    {
        url: '/ourservice/new1.png'
    },
    {
        url: '/ourservice/new2.png'
    },
    {
        url: '/ourservice/111.png'
    },
    {
        url: '/ourservice/new3.png'
    },
    {
        url: '/ourservice/333.png'
    },
    {
        url: '/ourservice/4444.png'
    },
  
    {
        url: '/ourservice/5.jpeg'
    },
    {
        url: '/ourservice/1212.png'
    },
]

const OurService = (props: Props) => {
    const { data, isLoading } = useGetAllBlogQuery(undefined, {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [blogs, setBlogs] = useState(data?.result || []);

    useEffect(() => {
        setBlogs(data?.result || []);
    }, [data]);


    return (
        <div className="bg-[#f5f7e563]">
            <div className={`w-[90%] 800px:w-[80%] m-auto pt-10 flex justify-center flex-col items-center pb-12`}>
                <h1 data-aos="fade-down" className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                    <span className="text-gradient">บริการของเรา</span>{" "}
                    <br />
                </h1>
                <br />
                <br />
                <div data-aos="fade-right" className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] pb-12 border-0">
                    {
                        imageList.map(ele => {
                            return <Image className="box-shadow-grow " src={ele.url} alt="" height={512} width={432} />
                        })
                    }

                </div>
                <div onClick={() => { window.open('https://lin.ee/yt88ntk') }} data-aos="fade-up" data-aos-delay="500" className="font-Poppins box-shadow-grow flex items-center justify-center h-[40px] w-[150px] md:h-[60px] md:w-[200px] font-size-[12px]  md:font-size-[16px] text-[16px] font-bold leading-[56px] fill-[#FFFFFF] text-[#ffff] bg-[#03c755] hover:bg-[#4cc703] md:text-[24px] cursor-pointer border-solid border-[2px_2px_2px_2px] border-[#ffcf66] rounded-lg px-[20px] md:px-[10px] py-0">
                    <FaLine  />
                    <span className="ml-2">
                        ติดต่อเรา
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OurService;

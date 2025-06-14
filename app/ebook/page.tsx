"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import EbookCard from "../components/Ebook/EbookCard";
import { useGetAllEbookQuery } from "@/redux/features/ebooks/ebookApi";

type Props = {};

const Page = (props: Props) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");
    const { data, isLoading } = useGetAllEbookQuery<any>(undefined, {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setcourses] = useState(data?.ebooks || []);

    useEffect(() => {
        setcourses(data?.ebooks || []);
    }, [data]);

    return (
        <>
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={2}
            />
            <div className="w-full bg-gradient-4 text-white">
                <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
                    <Heading
                        title={"All courses - Elearning"}
                        description={"Elearning is a programming community."}
                        keywords={
                            "programming community, coding skills, expert insights, collaboration, growth"
                        }
                    />
                    <br />
                    {
                        courses && courses.length === 0 && (
                            <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                                No Ebook found!
                            </p>
                        )
                    }
                    <br />
                    <br />
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] pb-12 border-0">
                        {courses &&
                            courses.map((item: any, index: number) => (
                                <EbookCard item={item} key={index} />
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;

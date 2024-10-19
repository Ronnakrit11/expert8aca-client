"use client"
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
// import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import { useGetBlogContentQuery } from "@/redux/features/blog/blogsApi";
import Footer from "../Footer";
// import CourseContentList from "./CourseContentList";

type Props = {
    slug: string;
    blog: any
};

const BlogContent = ({ slug, blog }: Props) => {
    console.log("🚀 ~ file: BlogContent.tsx:18 ~ BlogContent ~ blog:", blog)
    // const { data: blogData, isLoading, refetch } = useGetBlogContentQuery(slug, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState('Login')
    const data = blog

    const [activeVideo, setActiveVideo] = useState(0);

    return (
            <>
                <Header activeItem={3} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
                <div className="w-full grid 800px:grid-cols-10">
                    <Heading
                        title={data?.title}
                        description={data?.description}
                        keywords={data?.keyword}
                    />
                </div>
                <div className="w-full pb-[8rem]">
                <div className="max-w-[700px] mx-auto p-[20px] md:p-0 text-black">
                        <h1 className="text-[32px] pt-10 font-bold">{data?.title}</h1>
                        {/* <h1 className="text-[28px]">{data?.description}</h1> */}
                        <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    </div>
                </div>
                <Footer />
            </>
    );
};

export default BlogContent;

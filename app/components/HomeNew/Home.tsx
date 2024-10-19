"use client";
import React, { useEffect, useState } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AOS from 'aos';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';

import Hero from "./Hero";
import TopCategory from "./TopCategory";
import PeopleReview from "./PeopleReview";
import WhyLearnCourse from "./WhyLearnCourse";
import Courses from "./Course";
import TrustBy from "./TrustBy";
import Ebooks from "./Ebooks";
import FAQ from "../FAQ/FAQ";
import { useTheme } from "next-themes";
import Blogs from "./Blogs";
import OurService from "./OurService";
import Image from "next/image";



function Home({ webInfo }: any) {
    console.log("🚀 ~ file: Home.tsx:24 ~ Home ~ layout:", webInfo)
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const { theme, setTheme } = useTheme();

    const chevronWidth = 40;

    useEffect(() => {
        setTheme('light')
        AOS.init({
            once: true,
            delay: 300
        });
    }, [])


    return (
        <div>

         
           

            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
             <div className="w-[100%] h-auto md:h-[502px] 1000px:flex items-center dark:bg-[#1846a8] ">
                <Image
                    src={'/bannerEX22.png'}
                    width={9000}
                    height={600}
                    alt=''
                    className="object-cover w-full h-full"
                />
            </div>
            {/* <Hero
                banner={webInfo?.banner || {}}
                setOpen={setOpen}
            /> */}
            {/* <TopCategory
                categoty={webInfo.category}
            />
            */}
            
              {/*<PeopleReview />*/}
            
            <Courses />
            <Ebooks/>
            <Blogs/>
            <PeopleReview />
            
            <WhyLearnCourse />
            <FAQ/> 
            {/* <TrustBy /> */}
            
            <Footer />
        </div>
    );
};

export default Home
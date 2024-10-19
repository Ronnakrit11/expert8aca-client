"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllEbookQuery } from "@/redux/features/ebooks/ebookApi";
import EbookCard from "../Ebook/EbookCard";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

type Props = {
  user: any;
};

enum Tab {
  Profile = 1,
  ChangePassword = 2,
  Courses = 3,
  Ebooks = 4,
}

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const [ebooks, setEbooks] = useState([]);

  const { data: ebookList, isLoading: isLoadingEbook } = useGetAllEbookQuery(undefined, {});
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  const searchParams = useSearchParams()
  const activeTab = searchParams?.get('tab')

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(Tab.Profile);
  
  useEffect(()=> {
    switch(activeTab){
      case 'course':
        setActive(Tab.Courses)
        break;
      case 'ebook':
        setActive(Tab.Ebooks)
        break;
      case 'password':
        setActive(Tab.ChangePassword)
        break;
      case 'account':
        setActive(Tab.Profile)
        break;
      default:
        setActive(Tab.Profile)
    }
  },[activeTab])

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse.courseId)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  useEffect(() => {
    if (ebookList) {
      const filteredEbooks = user.ebooks
        .map((userEbook: any) =>
          ebookList.ebooks.find((item: any) => item._id === userEbook._id)
        )
        .filter((ebook: any) => ebook !== undefined);
      setEbooks(filteredEbooks);
    }
  }, [ebookList]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === Tab.Profile && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {active === Tab.ChangePassword && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}

      {active === Tab.Courses && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
              courses.map((item: any, index: number) => {
                const foundUserCourse = user.courses.find(ele => ele.courseId === item._id)
                const date1 = new Date(dayjs(foundUserCourse.expireDate).format('MM/DD/YYYY')).getTime()
                const date2 = new Date(dayjs().format('MM/DD/YYYY')).getTime()
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return <CourseCard item={item} key={index} isProfile={true} expireIn={diffDays} />
              })

            }
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}

      {active === Tab.Ebooks && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {ebooks &&
              ebooks.map((item: any, index: number) => (
                <EbookCard item={item} key={index} />
              ))}

          </div>
          {ebooks.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
              You don&apos;t have any purchased ebooks!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

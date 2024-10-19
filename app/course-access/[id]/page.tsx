'use client'
import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import Header from "@/app/components/Header";
import dayjs from "dayjs";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: any;
}

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')

  const searchParams = useSearchParams();
  const paymentToken = searchParams?.get("ptoken");

  useEffect(() => {
    if (paymentToken) {
      checkPaymentToken()
    }
  }, [])

  const checkPaymentToken = async () => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/create-order-postback?payment_token=${paymentToken}`)
    } catch (err) {
    }
    window.location.href = `/course-access/${id}`
  }

  useEffect(() => {
    if (!paymentToken) {
      if (data) {
        const isPurchased = data.user.courses.find(
          (item: any) => item.courseId === id
        );
        if (!isPurchased) {
          router.replace("/");
        }
      }
    }
  }, [data, error]);

  const foundUserCourse = data?.user?.courses?.find(ele => ele.courseId === id)
  let diffDays = 0
  if(foundUserCourse){
    const expireDate = new Date(dayjs(foundUserCourse.expireDate).format('MM/DD/YYYY')).getTime()
    const currentDate = new Date(dayjs().format('MM/DD/YYYY')).getTime()
    const diffTime = expireDate - currentDate
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }


  return (
    <>
      {
        (paymentToken || isLoading) ? (
          <Loader />
        ) : (
          <div>
          {
            diffDays <= 0 ? <>
              <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
              <div className="w-full text-center min-h-full text-back">
                <span className="text-[24px]"> Course Expired</span>
              </div>

            </>
              :
              <CourseContent id={id} user={data.user} />
          }

        </div>

        )
      }
    </>
  )
}

export default Page
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useGetTokenPaymentMutation } from "@/redux/features/orders/ordersApi";
import ModalPayment from "@/app/utils/ModalPayment";
import SlipPayment from "../Payment/SlipPayment";
import AddToCartButton from "../Cart/AddToCartButton";

type Props = {
  data: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [getToken, { isLoading, isSuccess, error }] = useGetTokenPaymentMutation();


  const submitRef = useRef<HTMLButtonElement | null>(null)
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string | ''>('')
  const [refId, setRefId] = useState<string | ''>('')
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId === data._id);

  useEffect(() => {
    if (user && data._id) {
      getToken(data._id).then((response: any) => {
        setToken(response?.data?.token || '')
        setRefId(response?.data?.refId || '')
      })
    }
  }, [user, data])

  const handleOrder = (e: any) => {
    if (user) {
      if (!token) {
        return window.alert('token payment notfound!')
      }
      if (!refId) {
        return window.alert('refId payment notfound!')
      }

    // submitRef.current?.click()
      setOpen(true)
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  const findCourseInUser = userData?.user?.courses?.find(ele => ele.courseId === data._id)

  let isExpire = false

  if (findCourseInUser?.expireDate) {
    const currentDate = new Date()
    const expireDate = new Date(findCourseInUser.expireDate)
    isExpire = currentDate.getTime() >= expireDate.getTime()
  }


  const returnUrl = `${window?.location?.origin}/course-access/${data._id}?ptoken=${token}`
  const postBackUrl = `${process.env.NEXT_PUBLIC_SERVER_URI}/create-order-postback?payment_token=${token}&`

  return (
    <div>
      <form className="hidden" method="post" action="https://payment.paysolutions.asia/epaylink/payment.aspx">
        <input type="hidden" name="customeremail" defaultValue={userData?.user?.email} value={userData?.user?.email} />
        <input type="hidden" name="productdetail" defaultValue={data.name} value={data.name} />
        <input type="hidden" name="refno" defaultValue={refId} />
        <input type="hidden" name="merchantid" defaultValue={process.env.NEXT_PUBLIC_PAYMENT_MERCHANT_ID} />
        <input type="hidden" name="cc" defaultValue={'00'} />
        <input type="hidden" name="total" defaultValue={data.price} value={data.price} />
        <input type="hidden" name="lang" defaultValue="TH" />
        <input type="hidden" name="returnurl" defaultValue={returnUrl} value={returnUrl} />
        <input type="hidden" name="postbackurl" defaultValue={postBackUrl} value={postBackUrl} />
        <button
          className="hidden"
          ref={submitRef}
          type="submit"
        >
        </button>
      </form>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-white dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-white dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-white dark:text-white">
                {data.purchased} Students
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-white dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-white dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-white dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-white dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-white dark:text-white"
                  />
                </div>
                <p className="pl-2 text-white dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-white dark:text-white">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            {/* course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-white dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-white dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-white dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-white dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-white dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)} •
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-white dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p>{i.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(i.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-white dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "฿"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-white dark:text-white">
                  {data.estimatedPrice}฿
                </h5>

                <h4 className="pl-5 pt-4 text-[22px] text-white dark:text-white">
                  {discountPercentengePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <>
                    {
                      isExpire ? <span
                        className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                      >
                        หมดอายุแล้ว
                      </span>
                        :
                        <Link
                          className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                          href={`/course-access/${data._id}`}
                        >
                          Enter to Course
                        </Link>
                    }
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div
                      className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                      onClick={handleOrder}
                    >
                      Buy Now {data.price}฿
                    </div>
                    <AddToCartButton 
                      courseId={data._id} 
                      className="!w-[180px] my-3 font-Poppins cursor-pointer"
                      courseData={{
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        thumbnail: data.thumbnail
                      }}
                    />
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-white dark:text-white">

              </p>
              <p className="pb-1 text-white dark:text-white">

              </p>
              <p className="pb-1 text-white dark:text-white">

              </p>
              <p className="pb-3 800px:pb-1 text-white dark:text-white">

              </p>
            </div>
          </div>
        </div>
      </div>
      {
        data ? <ModalPayment open={open} setOpen={setOpen}>
          <SlipPayment product={'course'} data={data} />
        </ModalPayment> : null
      }
    </div>
  );
};

export default CourseDetails;

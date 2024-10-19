"use client"
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./EbookDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetEbookDetailQuery } from "@/redux/features/ebooks/ebookApi";
import SimpleBackdrop from "../Loading/SimpleBackdrop";

type Props = {
  id: string;
};

const EbookDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetEbookDetailQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && userData?.user) {
      // const amount = Math.round(data.course.price * 100);
      const amount = Math.round(data.ebook.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, userData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      <div>
        <Heading
          title={'data.course.name' + " - ELearning"}
          description={
            "ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"
          }
          keywords={'data?.course?.tags'}
        />
        <Header
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={2}
        />
        <div className="w-full bg-gradient-4 text-white">
        <CourseDetails
          data={data?.ebook || {}}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          setRoute={setRoute}
          setOpen={setOpen}
        />
        </div>
        <Footer />
        
      </div>
    </>
  );
};

export default EbookDetailsPage;

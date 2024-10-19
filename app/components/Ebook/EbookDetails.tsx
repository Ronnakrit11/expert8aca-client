"use client"
import { styles } from "@/app/styles/style";
import React, { useEffect, useRef, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { BsBook, BsFileEarmarkMinus, BsFilePdf } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { saveAs } from "file-saver";
import { Box, Modal } from "@mui/material";
import SimpleBackdrop from "../Loading/SimpleBackdrop";
import { AiFillEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import ModalPayment from "@/app/utils/ModalPayment";
import SlipPaymentEbook from "../Payment/SlipPaymentEbook";
import { useCreateOrderEbookMutation } from "@/redux/features/orders/ordersApi";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const EbookDetails = ({
  data: ebookInfo,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {

  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const router = useRouter()
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isLoadingBackDrop, setLoadingBackDrop] = useState(false);
  const [openModalDownLoad, setOpenModalDownLoad] = useState(false);
  const [createOrderEbook, { data: orderData, error, isLoading, isError }] = useCreateOrderEbookMutation()

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);


  const dicountPercentenge =
    ((ebookInfo?.estimatedPrice - ebookInfo.price) / ebookInfo?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
  user && user?.ebooks?.find((item: any) => item._id === ebookInfo._id);

  const isFree = ebookInfo?.price === 0;

  const handleOrder = (e: any) => {
    if (user) {
      if(isFree){
        handleCreateOrder()
      }else{
        setOpen(true)
      }
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  const saveFile = () => {
    saveAs(
      `${process.env.NEXT_PUBLIC_ORIGIN_URI}/api/v1/get-ebook/${ebookInfo._id}/download`,
      `${ebookInfo.name}.pdf`
    )
  };

  const handleCreateOrder = async () => {
    createOrderEbook({ ebookId: ebookInfo._id, isFree: true, payment_info: {}}).unwrap().then((res) => {
      if (res) {
        setOpenModalDownLoad(true);
      }
    })

  }

  const handleClickView = () => {
    router.push(`/view-pdf/${ebookInfo._id}`)
  }

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5 relative">
            <h1 className="text-[25px] font-Poppins font-[600]  ">
              {ebookInfo?.name}
            </h1>
            <div className=" mt-10 w-[90%]">
              &nbsp;{ebookInfo?.description}

            </div>

            <div className=" overflow-x-auto mt-10 bottom-0 w-[90%]">
              <table className="w-full text-sm text-left  dark:text-gray-400">
                <thead className="text-center text-xs  uppercase  dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      จำนวนหน้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ขนาดไฟล์
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ประเภทไฟล์
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center flex-col gap-3">
                        <BsBook className="text-xl" />
                        <p>{ebookInfo?.totalPage} หน้า</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center flex-col gap-3">
                        <BsFileEarmarkMinus className="text-xl" />
                        <p> {ebookInfo?.totalSizeMB} MB</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center flex-col gap-3">
                        <BsFilePdf className="text-xl" />
                        <p> {ebookInfo?.fileType || 'PDF'}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              {!!ebookInfo?.thumbnail?.url && (
                <Image
                  src={ebookInfo?.thumbnail?.url}
                  width={400}
                  height={350}
                  alt=""

                />
              )}
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px]  ">
                  {isFree ? "Free" : ebookInfo?.price + "฿"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80  ">
                  {ebookInfo?.estimatedPrice}฿
                </h5>

                <h4 className="pl-5 pt-4 text-[22px]  ">
                  {discountPercentengePrice}% Off
                </h4>
              </div>
              <div className="flex items-center gap-1 ">
                {isPurchased ? (
                  <div className="flex gap-2 800px:w-[35%]">
                    <button
                      onClick={handleClickView}
                      className={`${styles.button} w-full my-3 font-Poppins cursor-pointer bg-[#47d097] hover:bg-[#37a074]`}
                    >
                      <AiFillEye style={{ fontSize: 20 }} />&nbsp;
                      View
                    </button>
                  </div>

                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {ebookInfo?.price}฿
                  </div>
                )}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>    
      {
        ebookInfo ? <ModalPayment open={open} setOpen={setOpen}>
          <SlipPaymentEbook product={'ebook'} data={ebookInfo} />
        </ModalPayment> : null
      }
      <>
        {openModalDownLoad && (
          <Modal
            open={openModalDownLoad}
            onClose={() => setOpenModalDownLoad(false)}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>
                EBook Already Download!
              </h1>
              <div className="flex w-full items-center justify-center mb-6 mt-4 text-center">
                <button
                  onClick={saveFile}
                  className={`${styles.button} !w-[190px] my-3 font-Poppins cursor-pointer bg-[#47d097]`}
                >
                  <HiOutlineDownload style={{ fontSize: 20 }} />&nbsp;
                  Download Now
                </button>

              </div>
            </Box>
          </Modal>
        )}
      </>
      <SimpleBackdrop open={isLoadingBackDrop} setOpen={setLoadingBackDrop} />
    </div>
  );
};

export default EbookDetails;
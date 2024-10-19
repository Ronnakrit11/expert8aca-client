import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./EbookContentMedia";
import Header from "../Header";
import CourseContentList from "./EbookContentList";
import { useGetEbookDetailQuery } from "@/redux/features/ebooks/ebookApi";
import { styles } from "@/app/styles/style";
import { BsBook, BsFileEarmarkMinus, BsFilePdf } from "react-icons/bs";
import Image from "next/image";

type Props = {
  id: string;
  user: any;
};

const EbookContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading, refetch } = useGetEbookDetailQuery(id, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  const data = contentData?.ebook;

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5">
              <div className="w-full flex flex-col-reverse 800px:flex-row">
                <div className="w-full 800px:w-[65%] 800px:pr-5 relative">
                  <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                    {data.name}
                  </h1>
                  <div className="dark:text-white mt-10 w-[90%]">
                    &nbsp;{data.description}

                  </div>

                  <div className=" overflow-x-auto mt-10 bottom-0 w-[90%]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                              <p>{data?.totalPage} หน้า</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center flex-col gap-3">
                              <BsFileEarmarkMinus className="text-xl" />
                              <p> {data?.totalSizeMB} MB</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center flex-col gap-3">
                              <BsFilePdf className="text-xl" />
                              <p> {data.fileType}</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full 800px:w-[35%] relative">
                  <div className="sticky top-[100px] left-0 z-50 w-full">
                    <Image
                      src={data.thumbnail.url}
                      width={400}
                      height={350}
                      alt=""

                    />
                    <div className="flex items-center">
                  
                        <div
                          className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                          // onClick={handleOrder}
                        >
                          Download Now
                        </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EbookContent;

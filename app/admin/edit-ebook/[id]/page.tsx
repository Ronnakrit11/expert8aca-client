"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../utils/Heading";
import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import { Box } from "@mui/material";
import { styles } from "@/app/styles/style";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useCreateEbookMutation, useEditEbookMutation, useGetEbookDetailAdminQuery } from "@/redux/features/ebooks/ebookApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import SimpleBackdrop from "@/app/components/Loading/SimpleBackdrop";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  const { data, error: errorDetail, isLoading: isLoadingDetail, isSuccess: isSuccessDetail, refetch } = useGetEbookDetailAdminQuery(id, { refetchOnMountOrArgChange: true });
  const [editEbook, { isSuccess, error, isLoading }] = useEditEbookMutation(
    {}
  );
  const [ebookInfo, setEbookInfo] = useState({}) as any;
  const [dragging, setDragging] = useState(false);
  const [filePdf, setFilePdf] = useState(null) as any;
  const [filePdfInfo, setFilePdfInfo] = useState(null) as any;
  const [fileImg, setFileImg] = useState(null) as any;

  useEffect(() => {
    if (isSuccessDetail) {
      setEbookInfo(data.ebook)
      refetch()
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, errorDetail, isSuccessDetail])

  const resetState = () => {
    setEbookInfo({})
    setFilePdf(null)
    setFilePdfInfo(null)
    setFileImg(null)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit ebook successfully");
      resetState()
      redirect("/admin/ebook");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      name: ebookInfo.name,
      filename: filePdfInfo ? filePdfInfo.name : ebookInfo.filename,
      description: ebookInfo.description,
      price: +ebookInfo.price,
      totalPage: +ebookInfo.totalPage,
      estimatedPrice: +ebookInfo.estimatedPrice,
      filePdfSize: filePdfInfo ? +(filePdfInfo.size / (1024 * 1024)).toFixed(2) : ebookInfo.totalSizeMB,
      filePdf,
      fileImg,
    };
    editEbook({ id, data });
  };

  const handleFilePDFChange = (e: any) => {
    const file = e.target.files?.[0];
    console.log("🚀 ~ file: page.tsx:28 ~ handleFilePDFChange ~ file:", file);
    if (file) {
      setFilePdfInfo(file);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          // setEbookInfo({ ...ebookInfo, pdfFile: reader.result });
          setFilePdf(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          // setEbookInfo({ ...ebookInfo, thumbnail: reader.result });
          setFileImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // setEbookInfo({ ...ebookInfo, thumbnail: reader.result });
        setFileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <div className="w-full flex min-h-screen">
            <Box className="w-[80%]">
              <div className="w-[80%] m-auto mt-24">
                <form onSubmit={handleSubmit} className={`${styles.label}`}>
                  <div>
                    <label htmlFor="">Name</label>
                    <input
                      type="name"
                      name=""
                      required
                      value={ebookInfo.name}
                      onChange={(e: any) =>
                        setEbookInfo({ ...ebookInfo, name: e.target.value })
                      }
                      id="name"
                      placeholder="MERN stack LMS platform with next 13"
                      className={`
            ${styles.input}`}
                    />
                  </div>
                  <br />
                  <div className="mb-5">
                    <label className={`${styles.label}`}>Description</label>
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={8}
                      placeholder="Write something amazing..."
                      className={`${styles.input} !h-min !py-2`}
                      value={ebookInfo.description}
                      onChange={(e: any) =>
                        setEbookInfo({
                          ...ebookInfo,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <br />
                  <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                      <label className={`${styles.label}`}>Price</label>
                      <input
                        type="number"
                        name=""
                        required
                        value={ebookInfo.price}
                        onChange={(e: any) =>
                          setEbookInfo({ ...ebookInfo, price: e.target.value })
                        }
                        id="price"
                        placeholder="29"
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className={`${styles.label} w-[50%]`}>
                        Estimated Price (optional)
                      </label>
                      <input
                        type="number"
                        name=""
                        value={ebookInfo.estimatedPrice}
                        onChange={(e: any) =>
                          setEbookInfo({
                            ...ebookInfo,
                            estimatedPrice: e.target.value,
                          })
                        }
                        id="price"
                        placeholder="79"
                        className={` ${styles.input}`}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                      <label className={`${styles.label}`}>Total Page</label>
                      <input
                        type="number"
                        name=""
                        required
                        value={ebookInfo.totalPage}
                        onChange={(e: any) =>
                          setEbookInfo({
                            ...ebookInfo,
                            totalPage: e.target.value,
                          })
                        }
                        id="totalPage"
                        placeholder="29"
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className="w-[50%]">
                      {/* <label className={`${styles.label}`}></label> */}

                      {/* <input
                        type="file"
                        name=""
                        required
                        value={ebookInfo.price}
                        onChange={handleFilePDFChange}
                        id="price"
                        placeholder=".pdf"
                        className={`${styles.input}`}
                      /> */}
                    </div>
                  </div>
                  <br />
                  <div className="w-full flex justify-between">
                    <input
                      type="file"
                      accept="application/pdf"
                      id="pdfFile"
                      className="hidden"
                      onChange={handleFilePDFChange}
                    />
                    <label
                      htmlFor="pdfFile"
                      // className={`${styles.input}`}
                      className={` w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                        }`}
                    // onDragOver={handleDragOver}
                    // onDragLeave={handleDragLeave}
                    // onDrop={handleDrop}
                    >
                      {(filePdfInfo || ebookInfo?.filename) ? (
                        <div>
                          <div>{filePdfInfo?.name || ebookInfo?.filename}</div>
                          <div>
                            file size:{" "}
                            {((filePdfInfo?.size / (1024 * 1024)) || ebookInfo?.totalSizeMB).toFixed(2)} MB
                          </div>
                        </div>
                      ) : (
                        <span className="text-black dark:text-white">
                          <PictureAsPdfIcon /> Drag and drop PDF File here or
                          click to browse
                        </span>
                      )}
                    </label>
                  </div>
                  <br />
                  <div className="w-full">
                    <input
                      type="file"
                      accept="image/*"
                      id="file"
                      className="hidden"
                      onChange={handleFileImageChange}
                    />
                    <label
                      htmlFor="file"
                      className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                        }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {ebookInfo?.thumbnail?.url || fileImg ? (
                        <img
                          src={fileImg || ebookInfo?.thumbnail?.url}
                          alt=""
                          className="max-h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-black dark:text-white">
                          <ImageIcon /> Drag and drop your thumbnail here or
                          click to browse
                        </span>
                      )}
                    </label>
                  </div>
                  <br />
                  {/* <div className="w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="file"
                                            className="hidden"
                                            onChange={handleFileImageChange}
                                        />
                                        <label
                                            htmlFor="file"
                                            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                                                }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            {ebookInfo.thumbnail ? (
                                                <img
                                                    src={ebookInfo.thumbnail}
                                                    alt=""
                                                    className="max-h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-black dark:text-white">
                                                    Drag and drop your thumbnail here or click to browse
                                                </span>
                                            )}
                                        </label>
                                    </div> */}
                  <br />
                  <div className="w-full flex items-center justify-end">
                    <input
                      type="submit"
                      value="Save"
                      className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    />
                  </div>
                  <br />
                  <br />
                </form>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <SimpleBackdrop open={isLoading} setOpen={() => { }} />
    </div>
  );
};

export default page;

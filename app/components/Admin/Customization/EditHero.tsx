import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true
  });
  const inputFileElement: any = useRef(null);

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const [imageList, setImageList] = useState([])

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);

      if(data?.layout?.banner?.image?.length){
        setImageList(data?.layout?.banner?.image || [])
      }
    }
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);

          const newImageUrls: any = [];
          newImageUrls.push(URL.createObjectURL(e.target.result))
          setImageList(newImageUrls);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
      imageList,
    });
  };

  const addImages = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrls: any = [...imageList];
      const reader = new FileReader();
      reader.onload = (e: any) => {

        if (reader.readyState === 2) {
          newImageUrls.push({ img_url: URL.createObjectURL(file), file: e.target.result })
          setImageList(newImageUrls);
        };
      }
      reader.readAsDataURL(file);
    }
  }

  const handleDelImage = (idx) => {
    let newImageList = []

    for (let index in imageList) {
      let ele = imageList[index]

      if (idx != index) {
        newImageList.push(ele)
      }

    }

    setImageList(newImageList)

  }

  return (
    <>
      <div className="w-full flex items-center">
        <div className="1000px:w-[80%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <div className="flex gap-2 flex-wrap p-10">
            {
              imageList.map((ele: any, idx) => {
                return <div className="flex flex-col">
                  <img src={ele.img_url || ele.url} alt="not fount" width={"250px"} />
                  <div onClick={() => handleDelImage(idx)} className="w-full text-center text-black bg-gray-200 cursor-pointer flex items-center justify-center py-2 hover:bg-gray-500 hover:text-white"><RiDeleteBin5Line />Delete</div>
                </div>
              })
            }
          </div>
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            ref={inputFileElement}
            onChange={addImages}
            className="hidden"
          />
          <button onClick={() => inputFileElement.current?.click?.()} className="w-[200px] h-[100px] flex justify-center items-center">
            <AiOutlineCamera className="dark:text-white text-black text-[40px] cursor-pointer " />
            <span className="text-black"> Add Slide Images</span>
          </button>
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none"
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`${styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              cursor-pointer !bg-[#42d383]
          !rounded  justify-center text-center mb-[50px]`}
            onClick={handleEdit}
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;

import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import Editor from "../../Editor";
import { useCreateBlogMutation, useEditBlogMutation } from "@/redux/features/blog/blogsApi";
import ImageIcon from "@mui/icons-material/Image";
import toast from "react-hot-toast";
import SimpleBackdrop from "../../Loading/SimpleBackdrop";

type Props = {
  blogData?: any;
  refetch?: any
};
const BlogInformation: FC<Props> = ({
  blogData,
  refetch,
}) => {
  const [dragging, setDragging] = useState(false);
  const [blogInfo, setBlogInfo] = useState<any>({});
  const [createBlog, { isLoading, isSuccess, error }] = useCreateBlogMutation()
  const [editBlog, { isLoading: isLoadingEdit, isSuccess: successEdit, error: errorEdit }] : any = useEditBlogMutation({})


  const [fileImg, setFileImg] = useState(null) as any;

  useEffect(() => {
    if (isSuccess) {
      toast.success('create blog success');
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (successEdit) {
      toast.success('update blog success');
    }
    if (error) {
      if ("data" in errorEdit) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [successEdit])


  useEffect(() => {
    if (blogData) {
      const { result } = blogData
      const newState = {
        content: result.content,
        description: result.description,
        keyword: result.keyword,
        slug: result.slug,
        thumbnail: result.thumbnail,
        title: result.title
      }
      setBlogInfo(newState);
    }
  }, [blogData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(blogData){
     await editBlog({ id: blogData.result._id, data: { ...blogInfo, fileImg } });
    //  await refetch()
    }else{
      createBlog({ ...blogInfo, fileImg })
    }

  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          // setBlogInfo({ ...blogInfo, fileImg: reader.result });
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
        // setBlogInfo({ ...blogInfo, fileImg: reader.result });
        setFileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="title"
            name=""
            required
            value={blogInfo.title}
            onChange={(e: any) =>
              setBlogInfo({ ...blogInfo, title: e.target.value })
            }
            onBlur={(e) => {
              setBlogInfo({ ...blogInfo, slug: blogInfo.title?.replace(/ /gi, '-') })
            }}
            id="title"
            placeholder="MERN stack LMS platform with next 13"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Slug</label>
          <input
            type="slug"
            name=""
            required
            value={blogInfo.slug}
            onChange={(e: any) =>
              setBlogInfo({ ...blogInfo, slug: e.target.value?.replace(' ', '-') })
            }
            id="slug"
            placeholder="lms-platform-with-next-13"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Keyword</label>
          <input
            type="keyword"
            name=""
            required
            value={blogInfo.keyword}
            onChange={(e: any) =>
              setBlogInfo({ ...blogInfo, keyword: e.target.value })
            }
            id="keyword"
            placeholder="MERN, stack LMS, platform , next 13"
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
            rows={2}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={blogInfo.description}
            onChange={(e: any) =>
              setBlogInfo({ ...blogInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* {blogInfo.fileImg ? (
              <img
                src={blogInfo.fileImg}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your OG image here or click to browse
              </span>
            )} */}
            {blogInfo?.thumbnail?.url || fileImg ? (
              <img
                src={fileImg || blogInfo?.thumbnail?.url}
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
        <div className="mb-5">
          <label className={`${styles.label} mb-2`}>Content </label>
          <Editor setPropsContent={(data) => setBlogInfo(prev => ({ ...prev, content: data }))} defaultContent={blogData?.result?.content}/>
        </div>
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
      <SimpleBackdrop open={isLoading || isLoadingEdit} setOpen={() => { }} />
    </div>
  );
};

export default BlogInformation;

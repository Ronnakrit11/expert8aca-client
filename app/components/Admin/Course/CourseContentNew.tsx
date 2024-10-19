import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Checkbox, Label } from 'flowbite-react';
import { IVideo, IVideoData } from "./CreateCourse";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: IVideoData[];
  setCourseContentData: (courseContentData: IVideoData[]) => void;
  handleSubmit: any;
};

const CourseContentNew: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<any>([[false]]);
  const [isDuplicateSection, setIsDuplicateSection] = useState<any>([false]);

  useEffect(() => {
    genCollasped()
  }, [])

  const genCollasped = () => {
    const allCollapsed: any = []
    for (let idx = 0; idx < courseContentData.length; idx++) {
      const currentSection = courseContentData[idx]
      allCollapsed.push([
        ...currentSection.videoList.map(ele => Boolean(ele))
      ])
    }
    setIsCollapsed(allCollapsed);
  }

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (sectionIndex: number, videoIndex: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[sectionIndex][videoIndex] = !updatedCollasped[sectionIndex][videoIndex];
    setIsCollapsed([...updatedCollasped]);
  };

  const addNewContentHandler = (video: IVideo, currentSectionIndex: number) => {
    if (
      video.title === "" ||
      video.description === "" ||
      video.videoUrl === "" ||
      video.videoLength === ""
      // video.links[0].title === "" ||
      // video.links[0].url === "" ||
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let allSection: IVideoData[] = []
      const updatedCollasped = [...isCollapsed];

      for (let sectionIndex = 0; sectionIndex < courseContentData.length; sectionIndex++) {
        const currentSection = courseContentData[sectionIndex];
        if (sectionIndex === currentSectionIndex) {
          let videoList = currentSection.videoList || [];
          videoList.push({
            canPreview: false,
            videoUrl: "",
            title: "",
            description: "",
            videoLength: "",
            links: [
              {
                title: "",
                url: "",
              },
            ],
            suggestion: "",
          });

          allSection.push({
            ...currentSection,
            videoList
          });
          updatedCollasped[sectionIndex][videoList.length - 1] = true
          setIsCollapsed(updatedCollasped);
        }
        else {
          allSection.push(currentSection);
        }
      }


      setCourseContentData([...allSection]);
    }
  };

  const addNewSection = () => {
    const lastVideoList = courseContentData[courseContentData.length - 1].videoList;
    const lastVideoIndex = lastVideoList.length - 1;
    const lastVideo = lastVideoList[lastVideoIndex];
    if (
      lastVideo.title === "" ||
      lastVideo.description === "" ||
      lastVideo.videoUrl === "" ||
      lastVideo.videoLength === ""
      // lasVideo.links[0].title === "" ||
      // lasVideo.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    }
    else {
      const videoSection = `Untitled Section ${courseContentData.length + 1}`;
      const foundVideoSection = courseContentData.find((ele) => ele.videoSection === videoSection)

      if (foundVideoSection) {
        toast.error(`Section '${videoSection}' already exists!`);
        return;
      }

      setCourseContentData([
        ...courseContentData,
        {
          videoSection,
          videoList: [
            {
              canPreview: false,
              videoUrl: "",
              title: "",
              description: "",
              videoLength: "",
              links: [
                {
                  title: "",
                  url: "",
                },
              ],
              suggestion: "",
            },
          ],
        },
      ]);
      setIsCollapsed([...isCollapsed, [true]]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNextStep = () => {
    const lastVideoList = courseContentData[courseContentData.length - 1].videoList;
    const lastVideoIndex = lastVideoList.length - 1;
    const lastVideo = lastVideoList[lastVideoIndex];
    const isDuplicateSectionName = isDuplicateSection.some(ele => ele === true)

    if (
      lastVideo.title === "" ||
      lastVideo.description === "" ||
      lastVideo.videoUrl === "" ||
      lastVideo.videoLength === ""
      // lasVideo.links[0].title === "" ||
      // lasVideo.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    }
    else if (isDuplicateSectionName) {
      toast.error("Please fix duplicate section name first!");
    }
    else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const handleChangeStateVideo = (sectionIndex, videoIndex, event) => {
    const newVideoSection = courseContentData.map((section, index) => {
      if (index === sectionIndex) {
        const newVideoList = section.videoList.map((video, vIndex) => {
          if (vIndex === videoIndex) {
            return { ...video, [event.target.name]: event.target.value || event.target.checked }
          }
          return video;
        })
        return { ...section, videoList: newVideoList }
      }
      return section;
    }
    )
    setCourseContentData(newVideoSection)
  }

  const handleDeleteVideo = (sectionIndex, videoIndex) => {
    if (videoIndex === 0) return;
    const newVideoSection = courseContentData.map((section, index) => {
      if (index === sectionIndex) {
        const newVideoList = section.videoList.filter((video, vIndex) => vIndex !== videoIndex)
        return { ...section, videoList: newVideoList }
      }
      return section;
    })
    setCourseContentData(newVideoSection)
  }

  const handleDeleteSection = (sectionIndex) => {
    if (sectionIndex === 0) return;
    const newVideoSection = courseContentData.filter((section, index) => index !== sectionIndex)
    setCourseContentData(newVideoSection)
    setIsDuplicateSection(isDuplicateSection.filter((ele, idx) => idx !== sectionIndex))
  }

  const handleChangeSourceCodeLink = (sectionIndex, videoIndex, sourceCodeIndex, event) => {
    const updatedData = courseContentData.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        const updatedVideos = section.videoList.map((video, vIndex) => {
          if (vIndex === videoIndex) {
            const updatedLinks = video.links.map((link, linkIndex) => {
              if (linkIndex === sourceCodeIndex) {
                return { ...link, [event.target.name]: event.target.value }
              }
              return link;
            })
            return { ...video, links: updatedLinks }
          }
          return video;
        })
        return { ...section, videoList: updatedVideos }
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  const handleAddLink = (sectionIndex, videoIndex) => {
    const updatedData = courseContentData.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        const updatedVideos = section.videoList.map((video, vIndex) => {
          if (vIndex === videoIndex) {
            return { ...video, links: [...video.links, { title: "", url: "" }] }
          }
          return video;
        })
        return { ...section, videoList: updatedVideos }
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  const handleRemoveLink = (sectionIndex, videoIndex, linkIndex) => {
    const updatedData = courseContentData.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        const updatedVideos = section.videoList.map((video, vIndex) => {
          if (vIndex === videoIndex) {
            const updatedLinks = video.links.filter((link, lIndex) => lIndex !== linkIndex)
            return { ...video, links: updatedLinks }
          }
          return video;
        })
        return { ...section, videoList: updatedVideos }
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  const checkDuplicateSectionName = (sectionIndex, name) => {
    const isDuplicate = courseContentData.some((section, index) => {
      return section.videoSection === name && index !== sectionIndex
    })
    isDuplicateSection[sectionIndex] = isDuplicate || false;
    setIsDuplicateSection([...isDuplicateSection])
    return isDuplicate
  }

  const handleChangeSectionName = (sectionIndex, name) => {
    const updatedData = courseContentData.map((section, index) => {
      if (index === sectionIndex) {
        return { ...section, videoSection: name }
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  const moveSectionUp = (sectionIndex) => {
    if (sectionIndex === 0) return;
    const updatedData = courseContentData.map((section, index) => {
      if (index === sectionIndex) {
        return courseContentData[sectionIndex - 1]
      }
      else if (index === sectionIndex - 1) {
        return courseContentData[sectionIndex]
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  const moveSectionDown = (sectionIndex) => {
    if (sectionIndex === courseContentData.length - 1) return;
    const updatedData = courseContentData.map((section, index) => {
      if (index === sectionIndex) {
        return courseContentData[sectionIndex + 1]
      }
      else if (index === sectionIndex + 1) {
        return courseContentData[sectionIndex]
      }
      return section;
    })
    setCourseContentData(updatedData)
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form noValidate onSubmit={handleSubmit}>
        {
          courseContentData.map((item: any, sectionIndex: number) => {
            const showSectionInput = true
            return <div
              className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                }`}
              key={`courseContent-${sectionIndex}`}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                          } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => handleChangeSectionName(sectionIndex, e.target.value)}
                        onBlur={(e) => {
                          checkDuplicateSectionName(sectionIndex, e.target.value)
                        }}
                      />
                      <AiOutlineDelete
                        className={`dark:text-white text-[25px] mr-2 text-black ${sectionIndex == 0 && 'text-gray-400'} ${sectionIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
                          }`}
                        onClick={() => handleDeleteSection(sectionIndex)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`dark:text-white text-black text-[25px] ${sectionIndex == 0 && 'text-gray-400'} ${sectionIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
                          }`}
                        onClick={() => moveSectionUp(sectionIndex)}
                      >
                        <FaArrowCircleUp />
                      </button>
                      <button
                        className={`dark:text-white text-black text-[25px] ${sectionIndex == courseContentData.length - 1 && 'text-gray-400'} ${sectionIndex < courseContentData.length - 1 ? "cursor-pointer" : "cursor-no-drop"
                          }`}
                        onClick={() => moveSectionDown(sectionIndex)}
                      >
                        <FaArrowCircleDown />
                      </button>
                    </div>
                  </div>
                  {
                    isDuplicateSection[sectionIndex] && (
                      <span className=" text-[red] text-[12px]">duplicate section name!</span>
                    )
                  }
                  <br />
                </>
              )}
              <br />
              {
                item.videoList.map((video: IVideo, videoIndex: number) => {
                  return <div
                    key={`video-${sectionIndex}-${videoIndex}`}
                    className=""
                  >
                    <div className="flex w-full items-center justify-between my-0">
                      {!isCollapsed?.[sectionIndex]?.[videoIndex] ? (
                        <>
                          {video.title ?
                            (
                              <p className="font-Poppins dark:text-white text-black">
                                {videoIndex + 1}. {video.title}
                              </p>
                            )
                            : (
                              <>-</>
                            )
                          }
                        </>
                      ) : (
                        <div>-</div>
                      )}

                      {/* // arrow button for collasped video content */}
                      <div className="flex items-center">
                        <AiOutlineDelete
                          className={`dark:text-white text-[20px] mr-2 text-black ${videoIndex == 0 && 'text-gray-400'} ${videoIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
                            }`}
                          onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}
                        />
                        <MdOutlineKeyboardArrowDown
                          fontSize="large"
                          className="dark:text-white text-black"
                          style={{
                            transform: isCollapsed?.[sectionIndex]?.[videoIndex]
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                          }}
                          onClick={() => handleCollapseToggle(sectionIndex, videoIndex)}
                        />
                      </div>
                    </div>
                    <div className={`${isCollapsed?.[sectionIndex]?.[videoIndex] ? 'block' : 'hidden'} `}>
                      <div className="my-3">
                        <label className={styles.label}>Video Title</label>
                        <input
                          type="text"
                          placeholder="Project Plan..."
                          className={`${styles.input}`}
                          value={video.title}
                          name="title"
                          onChange={(event) => handleChangeStateVideo(sectionIndex, videoIndex, event)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className={styles.label}>Video Url</label>
                        <input
                          type="text"
                          placeholder="sdder"
                          className={`${styles.input}`}
                          value={video.videoUrl}
                          name="videoUrl"
                          onChange={(event) => handleChangeStateVideo(sectionIndex, videoIndex, event)}
                        />
                      </div>
                      {/* <div className="mb-3 mt-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`checkboxCanPreview-${sectionIndex}-${videoIndex}`}
                            defaultChecked={false}
                            value={video.canPreview + '' || false + ''}
                            checked={video.canPreview || false}
                            name="canPreview"
                            onChange={(event) => handleChangeStateVideo(sectionIndex, videoIndex, event)}

                          />
                          <Label htmlFor={`checkboxCanPreview-${sectionIndex}-${videoIndex}`} className="flex">
                            Allow Preview
                          </Label>
                        </div>
                      </div> */}
                      <div className="mb-3">
                        <label className={styles.label}>
                          Video Length (in minutes)
                        </label>
                        <input
                          type="number"
                          placeholder="20"
                          className={`${styles.input}`}
                          value={video.videoLength}
                          name="videoLength"
                          onChange={(event) => handleChangeStateVideo(sectionIndex, videoIndex, event)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className={styles.label}>Video Description</label>
                        <textarea
                          rows={8}
                          cols={30}
                          placeholder="sdder"
                          className={`${styles.input} !h-min py-2`}
                          value={video.description}
                          name="description"
                          onChange={(event) => handleChangeStateVideo(sectionIndex, videoIndex, event)}
                        />
                        <br />
                      </div>
                      {video?.links.map((link: any, linkIndex: number) => (
                        <div className="mb-3 block" key={`link-${sectionIndex}-${videoIndex}-${linkIndex}`}>
                          <div className="w-full flex items-center justify-between">
                            <label className={styles.label}>
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${linkIndex === 0
                                ? "cursor-no-drop text-gray-400"
                                : "cursor-pointer text-black"
                                } dark:text-white text-[20px]`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(sectionIndex, videoIndex, linkIndex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Source Code... (Link title)"
                            className={`${styles.input}`}
                            value={link.title}
                            name="title"
                            onChange={(e) => handleChangeSourceCodeLink(sectionIndex, videoIndex, linkIndex, e)}
                          />
                          <input
                            type="url"
                            placeholder="Source Code Url... (Link URL)"
                            className={`${styles.input} mt-6`}
                            value={link.url}
                            name="url"
                            onChange={(e) => handleChangeSourceCodeLink(sectionIndex, videoIndex, linkIndex, e)}
                          />
                        </div>
                      ))}
                      <div className="inline-block mb-4">
                        <p
                          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                          onClick={() => handleAddLink(sectionIndex, videoIndex)}
                        >
                          <BsLink45Deg className="mr-2" /> Add Link
                        </p>
                      </div>
                    </div>
                    <div className="mt-2" />
                    <hr />
                    <div className="mb-2" />
                    {
                      videoIndex === item.videoList.length - 1 ? <div>
                        <p
                          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                          onClick={(e: any) => addNewContentHandler(video, sectionIndex)}
                        >
                          <AiOutlinePlusCircle className="mr-2" /> Add New Video
                        </p>
                      </div>
                        : null
                    }

                  </div>
                })
              }
            </div>
          })
        }

        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleNextStep()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContentNew;


const data = [
  {
    videoSection: "Untitled Section",

  }
]
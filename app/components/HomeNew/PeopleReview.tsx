import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';

const reviews = [
    {
        name: " คุณชา ",
        avatar: "/avatar-review/avatar1.png",
        profession: "หัวหน้าเเผนก HR",
        comment:
            " ได้ความรู้ในการบริหารบุคคล เเละความรู้ในการใช้จิตวิทยาบริหารบุคคฃ แนะนำได้ดีมาก  อาจารย์สอนตั้งเเต่พื้นฐานไปจนถึงสามารถนำไปใช้ได้จริง "
    },
    {
        name: "คุณพลอย ",
        avatar: "/avatar-review/avatar3.png",
        profession: "ผู้บริหาร",
        comment:
            "อาจารย์สอนดีมาก ๆ เรียนเเล้วสนุก สามารถนำไปใช้ได้จริง "
    },
 
    {
        name: "คุณนัท ",
        avatar: "/avatar-review/avatar5.png",
        profession: "เจ้าของโครงการหมู่บ้านจัดสรร",
        comment:
            "หลังจากเรียน สามารถนำความรู้ที่อาจารย์สอนไปใช้จริงเเล้วได้ผล ลดขั้นตอนได้เยอะมากครับ",
    },

    // {
    //     name: "คุณปีใหม่ เ",
    //     // avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    //     profession: "เจ้าของแบรนด์ Unab",
    //     comment:
    //         "อาจารย์สอนการใช้กลยุทธ์ในการตลาดกับการยิงแอดได้เข้าใจเลยค่ะ เราลืมคิดถึงลูกค้าไปเลย เรียนเสร็จการบ้านเพียบเลย ขอบคุณมากๆค่ะ",
    // },
];


const settingPeopleSay = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    // className: 'notes-slider',
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            },
        },
    ]
}



const PeopleReview = () => {
    return (
        <>
            <div className="bg-gradient-3 w-full p-10 pb-20 font-Poppins">
                <div className="w-full">
                    <p className="text-[#ffffff] text-center font-bold text-[30px] mt-10" data-aos="fade-down" >รีวิวบางส่วน</p>
                    <p className="text-[#ffffff] text-center text-sm mb-16" data-aos="fade-down" >จากนักเรียนของเรา</p>
                </div>
                <div className="w-full flex gap-3 justify-center" data-aos="fade-down" >
                    <div className="max-w-[90%] m-auto">
                        <Slider {...settingPeopleSay}>
                            {
                                reviews.map(({ name, profession, comment , avatar}) => <PeopleReviewCard {...({ name, profession, comment, avatar })} />)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}


function PeopleReviewCard({ name, profession, comment , avatar}: any) {
    return (
        <div className="relative min-h-[270px] md:max-w-[376px] md:min-h-[220px] bg-[#ffffff] rounded-xl p-8 drop-shadow-md ">
            {/* <div className="text-[20px] font-bold text-[#6440FB] mb-8 ">Perfect Job</div> */}
            <div className="text-black font-Poppins">
                {comment}
            </div>
                <div className='absolute bottom-3 w-[70%]'>
                    <hr className="mt-5 w-[100%]" />
                    <div className="flex mt-3 items-center w-[100%]">
                        <div>
                            <Image
                                src={avatar || '/assests/avatar.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="object-contain "
                            />
                        </div>
                        <div className="pl-7">
                            <div className="text-md font-semibold text-black">{name}</div>
                            <div className="text-xs text-black">{profession}</div>
                        </div>
                    </div>
                </div>


        </div>
    )
}


export default PeopleReview
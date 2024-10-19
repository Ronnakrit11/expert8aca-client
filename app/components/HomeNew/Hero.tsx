'use client';
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';

import WaveParalax from './WaveParalax';
import Slider from 'react-slick';

const configSlide = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // className: 'notes-slider',
    autoplay: true,
    autoplaySpeed: 3500,
}

function Hero({ setOpen, banner }: any) {
    const router = useRouter()

    return (
        <div className='relative font-Poppins'>
            <div className="w-full 1000px:flex items-center bg-gradient 1000px:pt-10 ">
                {/* <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:right-8 1500px:left-14"></div> */}
                <div className='w-full 1000px:w-[60%] md:h-[600px] 770px:h-[300px] h-[70vh] flex items-center justify-center md:block'>
                    <div className="justify-center md:justify-start flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left md:min-h-[31vh]">
                        <h2 data-aos="fade-up" data-aos-delay="50" className="font-Poppins dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[50px] font-[600] py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
                            Aree <p className='text-gradient'>Academy</p>
                        </h2>
                        <br />
                        <p data-aos="fade-up" data-aos-delay="100" className="dark:text-[#edfff4] text-[#000000ac] font-Poppins font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] p-[10px] md:p-[0px]">
                            {banner?.subTitle}
                        </p>
                        <br />
                        <br />
                        <div className="flex gap-2 1500px:!w-[55%] 1100px:!w-[78%] flex-wrap font-Poppins">
                            <div onClick={() => setOpen(true)} data-aos="fade-up" data-aos-delay="500" className="box-shadow-grow flex items-center justify-center h-[40px] w-[150px] md:h-[60px] md:w-[200px] font-size-[12px]  md:font-size-[16px] text-[16px] font-bold leading-[56px] fill-[#FFFFFF] text-[#ffff] bg-[#ffcf66] hover:bg-[#ffcf66] hover:border-[#ffcf66] cursor-pointer border-solid border-[2px_2px_2px_2px] border-[#ffcf66] rounded-lg px-[20px] md:px-[50px] py-0">
                                <span>เข้าสู่ระบบ </span>
                            </div>
                            <div onClick={() => { router.push('/courses') }} data-aos="fade-up" data-aos-delay="600" className="flex items-center justify-center  h-[40px] w-[150px]  ml-4 md:h-[60px] md:w-[200px] font-size-[12px]  md:font-size-[16px] text-[16px] font-medium leading-[56px] bg-[#FFFFFF] text-[#ffcf66]  border-solid border-2 border-[#ffcf66] box-shadow-grow hover:text-black cursor-pointer hover:border-[#ffcf66]  rounded-lg text-center px-[20px] md:px-[40px]">
                                ดูคอร์สเรียน
                            </div>
                        </div>
                        <br />
                    </div>
                </div>



                <div data-aos="fade-left" data-aos-delay="500" className="md:block w-full flex pb-12 522px:pb-[150px] md:pb-0 justify-center 1000px:w-[40%]  1000px:min-h-[60vh] 1000px:pt-[0] z-10 relative">
                    <div className='bg-red h-[350px] md:h-[550px] w-[80%] md:w-[550px]'>
                        <Slider {...configSlide}>
                            {
                                banner?.image?.map(({ url: src }) => <ImgCard {...({ src })} />)
                            }
                        </Slider>
                    </div>

                </div>

            </div>
            <WaveParalax />
        </div>

    )
}

function ImgCard({ src }: any) {
    return (
        <div className="relative min-h-[380px] md:max-w-[486px] md:min-h-[330px]  drop-shadow-md ">
            <Image alt='' src={src} height={500} width={500} className='rounded-xl' />
        </div>
    )
}

export default Hero
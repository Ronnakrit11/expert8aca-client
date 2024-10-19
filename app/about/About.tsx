import React from "react";
import { styles } from "../styles/style";
import Image from "next/image";
import { FaLine } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const About = () => {
  return (
    <>
      <div>
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-0 top-56 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-30">
            <div className="h-56 bg-gradient-to-br from-purple-500 to-purple-400 blur-[106px] dark:from-blue-700"></div>
            <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
          </div>
          <div className="mx-auto px-4 pt-32 sm:px-12 sm:pt-40 md:pt-48 lg:pt-56 xl:max-w-6xl xl:px-0">
            <div className='flex flex-col z-10'>
              <p className='text-center text-5xl font-bold text-blue-900 dark:text-white sm:text-6xl lg:text-left lg:text-7xl'>Expert 8</p>
              <p className='text-5xl sm:text-6xl lg:text-left lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Academy</p>
              <p className="mt-12 text-center text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:text-left lg:w-3/4">
                Expert8-Academy 
              </p>
            </div>
           
            <div className='grid grid-cols-2 my-40'>
              <div className="md:w-4/5 lg:w-4/5 p-2">
                <img src='/proo.jpg' className="rounded-3xl" />
              </div>
              <div className='flex flex-col justify-center p-2'>
                <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 dark:text-secondaryLight">อาจารย์ผู้สอน</span>
                <p className='text-3xl font-bold text-gray-800 dark:text-white md:text-4xl xl:text-5xl'>นายรนกฤต เชียรวิชัย</p>
                <p className='text-2xl font-bold text-gray-800 dark:text-white md:text-2xl xl:text-2xl'>Founder Of Expert 8 Sulution Co.,Ltd.</p>

                <p className='mt-8 font-semibold text-gray-600 dark:text-gray-300'>ประวัติการศึกษา ( Education )</p>
                <p className='mb-12 mt-4 text-gray-600 dark:text-gray-300'>ปริญญาตรีคณะวิศวกรรมศาสตร์โยธาเเละการบริหารธุรกิจก่อสร้าง</p>
              </div>
            </div>
          </div>
          <svg aria-hidden="true" className="text-gray-100 dark:text-darker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="currentColor" fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,133.3C672,107,768,117,864,138.7C960,160,1056,192,1152,224C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <section className="relative bg-gray-100 pt-16 dark:bg-darker sm:pt-8 md:py-0">
            <div className="mx-auto px-4 sm:px-12 xl:max-w-5xl xl:px-0">
              <div className="text-center">
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl xl:text-5xl">
                  ประวัติการทำงาน
                  <span className="relative bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text px-2 text-transparent dark:from-secondary dark:to-purple-300">
                    Professional Experience
                  </span>
                </h2>
                <p className="mx-auto mt-6 text-gray-700 dark:text-gray-300 md:w-3/4 lg:w-3/5">
                  A growing team doesn't need to mean growing pains. With best-of-breed features, security, privacy, and the right tool for every step of your journey - Jira Software allows you to scale without friction - regardless of your company size.
                </p>
              </div>
              <div className="relative mt-32 hidden h-40 w-40 items-center justify-center lg:mx-auto lg:flex">
                <div className="it absolute inset-0 flex flex-wrap blur-3xl">
                  <div aria-hidden="true" className="h-1/2 w-1/2 rounded-tl-full bg-sky-700"></div>
                  <div aria-hidden="true" className="h-1/2 w-1/2 rounded-tr-full bg-sky-700"></div>
                  <div aria-hidden="true" className="h-1/2 w-1/2 rounded-bl-full bg-purple-700"></div>
                  <div aria-hidden="true" className="h-1/2 w-1/2 rounded-br-full bg-purple-700"></div>
                </div>
                <div className="flex h-40 w-40 rounded-full border border-gray-900/20 bg-gray-900/10 dark:border-white/20 dark:bg-white/10">
                  <svg className="relative m-auto h-12 w-auto text-white" viewBox="0 0 290 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M184.589 48.5615L259.174 177.176C271.689 198.757 264.34 226.397 242.76 238.912C221.862 251.03 195.284 244.523 182.258 224.504L168.033 245.393C189.368 269.831 225.685 276.557 254.799 259.673C287.846 240.509 299.1 198.183 279.936 165.136L204.374 34.8366C201.937 30.6351 199.126 26.7859 196.008 23.3066L184.589 48.5615Z" fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M184.19 92.696L108.622 222.992C96.1058 244.572 68.4656 251.92 46.8855 239.405C25.3055 226.889 17.9575 199.249 30.4733 177.668L106.042 47.3721C118.558 25.792 146.198 18.444 167.778 30.9599C189.358 43.4757 196.706 71.116 184.19 92.696ZM85.2807 35.3313C104.447 2.28524 146.773 -8.96694 179.819 10.1989C212.865 29.3647 224.117 71.6908 204.951 104.737L129.383 235.033C110.217 268.079 67.8908 279.331 34.8447 260.166C1.79866 241 -9.45348 198.674 9.71234 165.628L85.2807 35.3313Z" fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M108.622 222.992L184.19 92.696C196.706 71.116 189.358 43.4757 167.778 30.9599C146.198 18.444 118.558 25.792 106.042 47.3721L30.4733 177.668C17.9575 199.248 25.3054 226.889 46.8855 239.405C68.4656 251.92 96.1058 244.572 108.622 222.992ZM179.819 10.1989C146.773 -8.96694 104.447 2.28524 85.2807 35.3313L9.71233 165.628C-9.4535 198.674 1.79865 241 34.8447 260.166C67.8907 279.331 110.217 268.079 129.383 235.033L204.951 104.737C224.117 71.6908 212.865 29.3647 179.819 10.1989Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
              <div className="pl-2">
                <div className="relative py-32 before:absolute before:inset-0 before:mx-auto before:h-full before:w-px after:absolute after:inset-0 after:h-32 after:w-px after:bg-gradient-to-t after:from-gray-900/20 after:via-gray-200 after:before:to-gray-900 dark:after:from-white/20 dark:after:via-gray-800 lg:before:bg-gray-200 lg:after:mx-auto lg:after:bg-gradient-to-b lg:dark:before:bg-gray-900">
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2024
                        </span>
                        
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                        ก่อตั้งบริษัท เอ็กซ์เพิร์ทเอท โซลูชั่น จำกัด
                        
                       
                       
                        </h3>
                        <h3 className="mt-0.5 text-l font-semibold text-gray-700 dark:text-white">
                        ด้วยทุนจดทะเบียน 1 ล้านบาท
                       
                       
                        </h3>
                    

                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        ผลิตซอฟเเวร์เเละพัฒนาเว็ปไซต์ครบวงจร
                    
                        </p>
                        <br />
                        <a href="https://expert8-solution.com" className="relative rounded-3xl mx-auto flex h-11 w-max items-center bg-sky-600 justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight">
                      <span className="relative text-base font-semibold text-white dark:text-gray-900">คลิก</span>
                    </a>
                        
                      </div>
                    
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2023
                        </span>
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                        ให้บริการด้าน Marketting เเบบครบวงจร
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        ผลิตสื่อโฆษณาเเละ Optimise ads ทุกเเพลทฟอร์ม
                    
                        </p>
                        <br />
                        <a href="https://expert8academy.info/" className="relative rounded-3xl mx-auto flex h-11 w-max items-center bg-sky-600 justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight">
                      <span className="relative text-base font-semibold text-white dark:text-gray-900">คลิก</span>
                    </a>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2022
                        </span>
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                        สร้างระบบ E-Learning เเบบครบวงจร
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        โดยมีลูกค้าที่ซื้อระบบกว่า 75 คน
                    
                        </p>
                        <br />
                        <a href="https://expert8academy.info/" className="relative rounded-3xl mx-auto flex h-11 w-max items-center bg-sky-600 justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight">
                      <span className="relative text-base font-semibold text-white dark:text-gray-900">คลิก</span>
                    </a>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2021
                        </span>
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                        สร้างระบบ E-Commerce นำเข้าสินค้า ขายสินค้าเบบครบวงจร 
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Deal กับเจ้าของโกดังคนจีนโดยตรง
                        โดยมีลูกค้าที่ซื้อระบบไปไปกว่า 70 คนไม่ต้องสต๊อกสินค้าเอง                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2021
                        </span>
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                        Lead Marketting & Ads Optimize KPAuto Groups 
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        ซึ่งทำให้ขึ้นเป็นยอดขายอันดับ 1 ของ MG Dealer 2 ปีซ้อน

                          
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center gap-10 py-12 pl-6 after:absolute after:inset-0 after:h-full after:w-px after:border-r after:border-dashed after:border-gray-400/70 dark:after:border-gray-700 sm:pl-12 md:flex-row md:py-20 lg:pl-0 lg:after:left-[9.1rem]">
                    <div className="flex w-full flex-col gap-10 md:w-1/2 lg:flex-row lg:items-center">
                      <div className="hidden w-max md:block">
                        <div className="flex h-24 w-24 rounded-full border border-gray-200 bg-white p-4 shadow-xl shadow-gray-600/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto h-6 w-6 text-primary dark:text-blue-300">
                            <path className="text-primaryLight" fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                          </svg>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute top-[4.80rem] -left-2.5 z-[1] my-auto h-max w-max md:inset-y-0 lg:relative lg:ml-2.5 lg:-mr-2.5">
                        <div className="h-5 w-5 rounded-full border-8 border-white bg-sky-500 ring-1 ring-gray-400/70 dark:border-darker dark:bg-white dark:ring-gray-700"></div>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          2021
                        </span>
                        <h3 className="mt-0.5 text-xl font-semibold text-gray-700 dark:text-white">
                          Business Development ของ KPAuto Groups 
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                        ซึ่งเป็น Dealer Top1 ชั้นนำของ Mazda , Mg , Suzuki
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img className="h-56 w-full rounded-2xl object-cover md:h-80" src="https://ampire.tailus.io/images/steps/step3.webp" alt="timeline third step" loading="lazy" width="1165" height="864" />
                    </div>
                  </div>
                </div>
              </div>
              <section className="mt-32 pb-40">
                <div className="container m-auto px-6 text-center md:px-12 lg:px-20">
                  <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
                    <div className="it absolute inset-0 flex flex-wrap blur-3xl opacity-70">
                      <div aria-hidden="true" className="h-1/2 w-1/2 rounded-tl-full bg-sky-700"></div>
                      <div aria-hidden="true" className="h-1/2 w-1/2 rounded-tr-full bg-sky-700"></div>
                      <div aria-hidden="true" className="h-1/2 w-1/2 rounded-bl-full bg-purple-700"></div>
                      <div aria-hidden="true" className="h-1/2 w-1/2 rounded-br-full bg-purple-700"></div>
                    </div>
                    <div className="flex h-40 w-40 rounded-full border border-gray-900/20 bg-gray-900/10 dark:border-white/20 dark:bg-white/10">
                      <svg className="relative m-auto h-12 w-auto text-white" viewBox="0 0 290 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M184.589 48.5615L259.174 177.176C271.689 198.757 264.34 226.397 242.76 238.912C221.862 251.03 195.284 244.523 182.258 224.504L168.033 245.393C189.368 269.831 225.685 276.557 254.799 259.673C287.846 240.509 299.1 198.183 279.936 165.136L204.374 34.8366C201.937 30.6351 199.126 26.7859 196.008 23.3066L184.589 48.5615Z" fill="currentColor"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M184.19 92.696L108.622 222.992C96.1058 244.572 68.4656 251.92 46.8855 239.405C25.3055 226.889 17.9575 199.249 30.4733 177.668L106.042 47.3721C118.558 25.792 146.198 18.444 167.778 30.9599C189.358 43.4757 196.706 71.116 184.19 92.696ZM85.2807 35.3313C104.447 2.28524 146.773 -8.96694 179.819 10.1989C212.865 29.3647 224.117 71.6908 204.951 104.737L129.383 235.033C110.217 268.079 67.8908 279.331 34.8447 260.166C1.79866 241 -9.45348 198.674 9.71234 165.628L85.2807 35.3313Z" fill="currentColor"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M108.622 222.992L184.19 92.696C196.706 71.116 189.358 43.4757 167.778 30.9599C146.198 18.444 118.558 25.792 106.042 47.3721L30.4733 177.668C17.9575 199.248 25.3054 226.889 46.8855 239.405C68.4656 251.92 96.1058 244.572 108.622 222.992ZM179.819 10.1989C146.773 -8.96694 104.447 2.28524 85.2807 35.3313L9.71233 165.628C-9.4535 198.674 1.79865 241 34.8447 260.166C67.8907 279.331 110.217 268.079 129.383 235.033L204.951 104.737C224.117 71.6908 212.865 29.3647 179.819 10.1989Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative -mt-12">
                  <div className="relative -mx-4 mt-16 flex snap-x snap-mandatory justify-between gap-6 overflow-x-auto border-y border-gray-100 px-4 py-8 dark:border-gray-800 sm:-mx-12 sm:px-12 lg:mx-0 lg:px-0">
              <div className="snap-center text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-12 w-12 rounded-xl border border-primary/20 bg-white shadow-md shadow-primary/10 dark:border-gray-700 dark:bg-gray-800 sm:mr-auto sm:ml-0">
                  <FaLine className="h-12 w-12 text-green-700" />
                </div>
                <h2 className="mx-auto w-max text-lg font-semibold text-gray-700 dark:text-white sm:ml-0 sm:w-auto">Line</h2>
                <p className="mx-auto mt-1 w-max text-gray-500 sm:ml-0 sm:w-auto">Some text here</p>
              </div>
              <div className="snap-center text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-12 w-12 rounded-xl border border-primary/20 bg-white shadow-md shadow-primary/10 dark:border-gray-700 dark:bg-gray-800 sm:mr-auto sm:ml-0">
                  <FaSquareFacebook className="h-12 w-12 text-sky-700" />
                </div>
                <h2 className="mx-auto w-max text-lg font-semibold text-gray-700 dark:text-white sm:ml-0 sm:w-auto">Facebook</h2>
                <p className="mx-auto mt-1 w-max text-gray-500 sm:ml-0 sm:w-auto">Some text here</p>
              </div>
              <div className="snap-center text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-12 w-12 rounded-xl border border-primary/20 bg-white shadow-md shadow-primary/10 dark:border-gray-700 dark:bg-gray-800 sm:mr-auto sm:ml-0">
                  <MdEmail className="h-12 w-12 text-red-700" />
                </div>
                <h2 className="mx-auto w-max text-lg font-semibold text-gray-700 dark:text-white sm:ml-0 sm:w-auto">Email</h2>
                <p className="mx-auto mt-1 w-max text-gray-500 sm:ml-0 sm:w-auto">Some text here</p>
              </div>
            </div>
            <br />
            <br />
                    <h2 className="mb-8 text-4xl font-bold text-blue-900 dark:text-white md:text-6xl">
                      ร่วมงานกับ
                      <span className="relative">
                        <svg className="absolute inset-x-0 -bottom-1 w-full opacity-50" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 260 15.6">
                          <path className="st0" d="M206.8 7.3l-.1.3c.1-.2.2-.3.1-.3zM234.7 10h-.1c-.2.4-.1.3.1 0zM54.8 4.2l-.6-.4c.2.4.4.5.6.4zM17.1 5.1zM34.5 9.6l.1.3c0-.2 0-.3-.1-.3zM22.4 10.8c-.3-.1-.7-.1-1-.1.2.1.7.1 1 .1zM17.5 5c-.1.1-.2.1-.4.2.2-.1.3-.2.4-.2zM52.7 9.8l.5.9c-.1-.3-.3-.6-.5-.9zM19.5 11.6c-.2-.2-.4-.2-.6-.3 0 .2.3.3.6.3zM120.9 11.4c-.1.1-.2.2-.2.3.3-.1.3-.2.2-.3zM80.9 10.4h-.1s.1.1.2.1l-.1-.1zM92.6 10.4l-.2.2c.2-.1.2-.1.2-.2zM72.1 11.3c-.1.1-.3.2-.4.3l.4-.3z"></path>
                          <path className="st0" d="M260 6c-1-.6-4.7-1.2-5.8.3-.2-.1.1-.3.2-.4-.9.2-2.2.1-3.6 0s-2.9-.2-4.2 0c-1 1.5-3.9-.6-4.8 1.4l.5-.4c.9.5-1.2 1.4-1.5 1.9-.8-1.2-.1-1-1-2l1.1.4-.3-1c-3.1 2.8-6.2-.9-8.2 1.1.1-.1.1-.3.2-.4-1.4-.5-2.3.8-3.3 1.2-.1-.5.6-.9 1.1-1.3-2.4-.3-6.4 1.2-9 .4-.9.7.4.9-.6 1.5-.8-.2-1.4-.7-.4-1.1-2.3-1.2-7.6 1-11.1-.2-1.8.8-.7 1.1-3.5 1.6.7-.5-.7-1.7 1-1.7l.2-.5c-2.8-.1-6.6-.3-8.1 1.2-.1-1.1-.5-.2-1.6-.8-.4.1 0 .2.2.2-1 .9-1.6-.1-2.3.1l.3-.2-2 .7c-.3-.2-.8-.4-.9-.7v.8c-1.1 0-.5-1-1.9-.8l.3.6c-.9-.4-2.2.4-2.4-.5 0-.2.1-.1.4-.1-1.3-1.2-3.5.3-5.1-.3l.4 1.3c-1.6.4-1-.3-.9-.7-1.1 0-1.3-.4-2.7-.6-.7.3-.4.5-.6.8l-1.5-.4 1-.7c-2.3 1.8-5.6-.4-7.2 1.2-.8-.4.8-.7.3-1-2.6-.9-6 1-8.2 0-3.6-1-7.8-.4-11.8-1.1l.1.3-2.9-.4c-.8.7-2.7.3-4 1.1.1-.3-.1-.7.2-.9-1.2.1-2.6.4-3.3-.1l.4-.3c-2.7-.3-6.4-.5-7.9.1-.9 0-.9-.6-1.1-1-1.6-.1-2.6.2-3.9.7-.3-.2-.7-.3-1-.6l-.6.8c-.6-.1-.1-.7-.6-.9-2.5.9-5.3-.1-7-.1l.2.4c-.7.3-2.1-.3-1.2-.7-3.4-.6-5.1 1.2-9.6.8-.6-1.5-4.1.3-4.8-1.4-1.9.4-3.2-.3-4.5.6 0-.2-.2-.2.1-.3-.8-.6-3.3-.2-5.3.2l-.1-.5c-.9 1.2-4.2.9-4.9 2-.2-.2.4-.5.7-.7-1-1.1-1.8.5-3.1.2.1-.3-.3-.6 0-.8-4.4-1.2-10.6.7-16.3-.1-1.6 0 .6 1.2-1.5 1.1-.6-.6 1-1.1-.3-1.4-.9.7-1.3.5-2.6.5.2-.4 0-.6.9-.9-.7-.5-3.1.9-4.5 0 .1.3-.2.5-.5.7-2.1 1-4.9-.9-5.1-.4 0 0-.7.2-.1.3-.8 0-1.9-.2-1.7-.7-.4.3-.8.8-1.4.8l.3-.6c-.4.1-.8.5-1.1.6l.6.4c-.9-.5-2.6.8-2.6-.4h.3l-1.7-.5c-.7.5-1.3 1-2.5.9-.5-1.3-2.9-.2-4.3-.3l.1-.4c-1.1.6-4 .4-3.5.6-1.1 0-2.6-.2-2-.6-.8.1-2.7.1-3.2.9l-1.8-1c-1 1.6-3.6-.5-3.6 1.2-1-.2-.8-.6-1.5-.9-1.4.9-2.8.8-4.2.7v-.2c-1.4-.1-3.1.8-5.1 1l-.5-1.2c-1 .2-1.3 1.2-2.3 1-.2-.2 0-.3.2-.3-1 .3-2.3.1-3.1-.2-1.5 1-2.7.7-3.9 1.8-1.3-1 1.7-.6.6-1.6-2.2-.4-4.4.4-6.7 1.1-.2-.2 0-.4.1-.7 0 0-1.2.9-2.2 1.8C.9 8.3 0 9.4.5 10c-.5.9-1.2 1.4.9 2 .6-.5 2.5-1.3 2.9-.4l.1-.9c2.6-.6.4 1.8 3.6 1.6l-.7-.3c.6-.1 1.1-.7 1.8-.5.2.2-.2.4-.5.6.9-.5 1.7-.9 2.6-1.4.1.5.1.8-.4 1.2 2.5-.2-.6-1.6 2.4-1.4.6.4-.2.6-.5.9 1.4.7 2.3-.1 3.8-.6.1.8-.9.7.3 1.2-.3-.4-.5-1.1.5-1.2-.4.8.7.4 1.6.5-.2-.3-.1-.6.2-.8.4-.1.8.1 1.4.1l-1.1-.7c1.5-.8 2.4.3 3.6.6-.1.1-.3.3-.5.3 1.2.3 2.5.9 4.1.1l-.3.1c2.9-.9-1-1.3 2.4-2.2 1.1.1-.4 2.6 2.1 1.6-1.3-.6 1.6-1.7 3.1-2L32.4 10c.6 0 1.6-.5 2-.3l-.1-.3c-.2-1.3 1.9.1 3-.7-1.3 1.8-1.4 1.5-1.6 3.2 1-1 2.2-1.9 4.1-1.8l-1.5 1.4c2.5.2 5.5-1.9 7.6-3-.5 1 .3 1.4-.6 2.2l2.4-.3-.7 1.1c1-1.2 2.1-.4 1.9-1.9-.3.2-.2.4-.7.3.1-.4.5-1.4 1.7-1.3.9.3-.5.6-.2 1 .8-.6.9.3 1.7-.1l-.8-.6c.6-.9 1.4-.1 2.2-.5-1 .4-.7.9-.3 1.4l-.1-.1c.8-.1 1.6-.7 2-.2l-.5 1.2.9-.9c.3.1.6.6 0 .8 2.8.7-.1-2.5 3.6-1.5 0 .5-.4.8-1.4.5-.2.7.1 1.1 1.1 1.4v.1c1.9 0 4.4 0 5.6-.8.4.3 0 .6-.4.9 2.1.4 2.8-.7 5 .1l-1-.4c1.4-.6 4-.8 5.3.1l-.4.3c1.3-.7 3.5.6 4 0-.6-.4 0-.6-.8-1l3.4-.7.2 1.2 1.8-.4c-.4-.5 2.4.4 2.5-.7 1 .4-.4.9-.8 1.4 1-.3 1.1.2 2.1-.5l1 1.1 2.6-.7c-.1.1 0 .2-.1.3 1.2-.9 3.1.6 4.6-.9-.1.1-.1.1-.1.2.9-.8 2.9-.2 3.7 0 1.4-.2.6-1 .6-1.4 3.9.4 2.7.3 6-.9 2 1.4-2.4 2.1.1 3 .4-.6 2.1-1.1 4.1-1.3 1.8.5 4.8.9 6.5 1.9l-.2-.9 2.6-.4-1.5 1.2c.4-.3 1.7-.8 2.6-1.2 2.7-.7 1.4 1.9 3.5.7.1.1.1.2.2.3.7-.6 2.4-.3 4.4-.5l-.7 1.1-1.3-.3c.7 1.1 2.1-.1 3.4 0 1.3-.3.7-1.3 1.4-1.6.5.1 1.2-.2 1.6.1 1.1.4.1 1.3-.3 1.8 1-1.1 1.4-.9 3.6-1.3.1.5-.1.8-.4.9.5-.1.9-.3 1.2-.8l.7.7c2.5 1 2.6-2 5.6-1.5-.8.6 2.6 0 3.5.7-1.1.1.4 1.6-.2 2.3 2.4.5 1-1.3 3-1.4l-.9 1.3c1.9-.5.5-.7 2.4-1.1-.5.4.8.4-.3.8 2.5.2 1.9.1 4.1.3l.2-1.3c.7-.1 1 .5 1.2.7-.3 0-.8-.1-.7.1.8 1.2 1.4-.6 2.4.5-.2-.4-.5-1 .4-1.1-.3.8 1.4.8 1.4 1.2-.6-.6 2-.2 2.1-1 1 .7-.4.6-.4 1.1.9-1 3.7 0 4.6-.6 0 .1.1.1.1.2 1.2-.6 3-.7 5.3-1.5l-.8.7c2.2.4 1.4-1.5 3.3-1.5-.4 1.1 3.1 0 2.2 1.2 1.1-.6 2.3-.8 3.1-1.7 1 .6-2.1 1.4-.6 1.8l1.6-.5.3.6c.1-.4 1.5-.4 1.4-.8.2.7.9 1.2.8 1.8 1-.2 2.4.5 3.3-.1l.1.3c1-1.3 3.1-.2 3.6-1.5l.6.7c1.5-.1 1.3-1.5 2-1.8.6 0 1.4-.2 2 0-2 .8 1 1.1 1.4 1.6.8 0 3.1 0 3.7-.7-1 .7-.4 1.2-2.1 1.3.9 1.3 2.6-.2 4.5-.1v.6c2.7-.4 2.8-1.5 4-2.5.3.8.1 1-.7 1.7 1.8.5 4.7-.1 6.7 0 .6.5.2.9-.5 1.1 2.1-.6 4.7.1 6-1.2-.5.5.9.3 1.6.6 0-.3.1-.6.2-.6 1.3-.6 4.1-1.1 5.6-.7l-.5.4c1.7.1 3-.5 4.3-.9 1.3-.4 2.6-.8 4.5-.4.7.3-.7 1.1.7 1 .7-.5.4-1.5 2.2-1.3l-.1.9 1.2-.9c-.7-.7-2.6-.4-1.3-1.2 1.6.8 1.3-.9 3.3 0-.4.1-1 .8-1.3 1.2 2 .4 3.4.1 4.8-.1 1.4-.3 2.8-.6 4.9-.2 2-.8 4.6-1.2 5.9-1.9 0 .9 0 1.7-.8 2.4 1.8 0 2.4-2.1 3.7-.9.7-1.3 4.7-1.2 5-3l2-.8z"></path>
                          <path className="st0" d="M58.1 11.1c-1 0-1.9 0-2.3.2.2.2 2.3.6 2.3-.2zM208.2 13.3c-.1 0-.3.1-.4.1.1 0 .3 0 .4-.1zM216.3 12.9c-.1-.1-.2-.2-.4-.3 0 .3.1.5.4.3zM132.6 11.5zM178.5 13.7c.7-.4 1-.7 1-1-.4.1-.7.3-1 1zM163 12.6c-.1.1-.2.1-.3.2.3-.1.3-.2.3-.2zM130.2 12c.7-.4 1.6-.3 2.4-.5-.7.2-1.9-.3-2.4.5zM226.1 11.4l-.7.6.8-.4zM218.6 12c-.3-.1-1.7.3-1.3.6.4-.3.9-.5 1.3-.6zM189.6 11.4l-.3.6.7-.5z"></path>
                        </svg>
                        <span className="relative px-2 text-sky-800 dark:text-indigo-200">Expert8Solution</span>
                      </span>
                    </h2>
                    <p className="mb-12 mt-6 text-gray-600 dark:text-gray-300 md:mx-auto md:w-5/6 lg:w-1/2">Saepe nulla ab nobis itaque corporis fuga illo doloribus sequi esse aspernatur impedit nihil quisquam, voluptates placeat architecto adipisci id cum enim.</p>
                    <a href="contact.html" className="relative rounded-3xl mx-auto flex h-11 w-max items-center bg-sky-600 justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight">
                      <span className="relative text-base font-semibold text-white dark:text-gray-900">คลิก</span>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

      </div>
    </>

  );
};

export default About;

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='bg-[#1b253d]'>
      <div className="border border-[#ffffff0e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-white dark:text-white">Social Links</h3>
            <ul className="space-y-4">
             
              <li>
                <Link
                  href="https://www.facebook.com/LouisZz"
                  className="text-base text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Facebook
                </Link>
              </li>
           
            </ul>
          </div>
          <div className='flex'>
            <div>
              <h3 className="text-[20px] font-[600] text-white dark:text-white pb-3">Contact Info</h3>
              <p className="text-base text-white dark:text-gray-300 dark:hover:text-white pb-2">
                Tel. : 099-456-9591
              </p>

              <p className="text-base text-white dark:text-gray-300 dark:hover:text-white pb-2">
                Email :  sales@expert8-solution.com
              </p>

              <p className="text-base text-white dark:text-gray-300 dark:hover:text-white  pb-2">
                Line Id : nookmayz
              </p>
            </div>
          </div>
          <div>
          <div className='bg-white max-w-[160px] p-2'>
              <Image
                src={'/lineqr.jpeg'}
                height={200}
                width={200}
                alt=''
              />
            </div>
          </div>
        </div>
        <br />
        <p className="text-center text-white dark:text-white">
          Copyright © 2023 Expert8-Solution | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  )
}

export default Footer
import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "หน้าเเรก",
    url: "/",
  },
  {
    name: "คอร์สเรียน",
    url: "/courses",
  },
  {
    name: "อีบุ๊ค",
    url: "/ebook",
  },
  {
    name: "บล๊อค",
    url: "/blog",
  },
  {
    name: "เกี่ยวกับ",
    url: "/about",
  },
  
  {
    name: "คำถามที่เจอบ่อย",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${activeItem === index
                  ? "text-[#008AFC] font-bold"
                  : "dark:text-white text-black"
                  } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >ELearning</span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={`${i.url}`} passHref key={index}>
                <span
                  className={`${activeItem === index
                    ? "text-[#008AFC] font-bold"
                    : "dark:text-white text-black"
                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
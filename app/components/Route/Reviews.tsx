import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "คุณ'เอญ่า",
    //avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Busniness",
    comment:
    " ขอบคุณความรู้วันนี้ที่ได้รับจากครูเป็นประสบการณ์ใหม่ที่บอกได้เลยว่ามันสุดยอดมากๆ เชื่อมั่นว่าที่ไหนไม่มีให้นอกจากที่นี่ที่เดียวเท่านั้น ขอบคุณความรักการเเบ่งปันที่ไม่มีกั๊ก ได้วยตลอดเวลาการเรียนสนุกมากๆ "},
  {
    name: "คุณ'kanokwan",
    //avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Real asset | Quarter ltd.",
    comment:
    "วันนี้ได้รับความรู้เเละเทคนิคต่างๆจากครูเยอะมาก ได้นำความรู้ไปหารายได้เพิ่มจากช่องทางต่างๆ การสอนที่มีประสิทธิภาพ ขนาดเราไม่มีความรู้มาเลยยังสามารถเข้าใจ  เเละนำไปประยุกต์ใช้ได้ ขอบคุณครูเเละทีมงานมากๆที่คอยช่วยเหลือ เเละคอยตอบข้อสงสัยตลอดเวลา อยากเเนะนำให้คนที่สนใจที่ยังลังเลอยู่ให้สมัครเรียนไปเลยค่ะ"}, 
  {
    name: "คุณ'kiky",
    //avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "real asset buisiness ",
    comment:
    "อย่างเเรกเลยต้องขอบคุณครูมากสำหรับความรู้ในวันนี้ สำหรับคอร์สอบรมในวันนี้ถือว่าคุ้มมากๆ จนรู้สึกว่าเวลาผ่านไปรวดเร็วมาก ความรู้ที่ได้รับเป็นความรู้ราคาเเพงมากซึ่งมั่นใจได้เลยว่าถ้าศึกษาเองไม่มีทางเข้าใจได้ในระยะเวลาอันสั้น"},
  {
    name: "คุณ'Sairung",
   // avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "real asset business",
    comment:
    "ขอบคุณครูมากๆ สำหรับความรู้ในวันนี้ มาจากเเหล่งต่างๆ การวิเคราะห์ที่สามารถทำกำไรได้ง่าย พร้อมทั้ง mindset สำหรับการเป็นเทรดเดอร์",
},
  {
    name: "Kru'kung",
   //avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "real asset business",
    comment:
    "ขอบคุณครูนิดที่ได้รู้จักกับอาชีพหนึ่งซึ่งไม่มีความรู้อะไรเลย เป็นอะไรที่ถ่ายทอดจากใจเต็มเเม็ก ขอบคุณมากๆค่ะ",
},
  {
    name: "K Mayfc",
   // avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "real asset business",
    comment:
    "ขอบคุณครูเเละทีมงานมากค่ะ ข้อมูลดี จะรีบนำข้อมูลไปใช้ให้เกิดประโยชน์สูงสุดค่ะ",
},
];

const Reviews = (props: Props) => {
  return (
  <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
      <div className="800px:w-[50%] w-full">
        <Image
        src={require("../../../public/assests/business-img.png")}
        alt="business"
        width={700}
        height={700}
        />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            ฟังประสบการณ์ที่นักเรียนของเราพูดถึงครูเน็ืทว่ามีอะไรบ้าง
          </p>
        </div>
        <br />
        <br />
       </div>
       <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
            reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
        </div>
  </div>
  );
};

export default Reviews;

"use client";
import React, { useState } from "react";
import QuizDetailContainner from "../components/QuizDetailContainner";

export type ItemType = {
  question: string,
  description: string;
  image?: string | null;
  image_link?: string | null,
  preview?: string | null,
  choices: {
    choice: string;
    answer: string;
    image: string | null;
  }[];
  answer: string;

}

const initialItems: ItemType[] = [
  // {
  //   question: "ถ้าต้องการย้อนการเปลี่ยนแปลง commit ก่อนหน้า โดยไม่เปลี่ยนแปลงประวัติการ commit จะใช้คำสั่งอะไร",
  //   description: "vdfvdf",
  //   image: null,
  //   choices: [
  //     { choice: "A", answer: "git revert", image: null },
  //     { choice: "B", answer: "git forward", image: null },
  //     { choice: "C", answer: "git rollback", image: null },
  //     { choice: "D", answer: "git reflog", image: null },
  //   ],
  //   answer: "D",
  // },
];

interface IopenModal {
  isOpen: boolean;
  data?: ItemType;
  currentIndex?: number

}

const page = () => {
  return (
    <div>
      <QuizDetailContainner quizId={undefined} />
    </div>
  );
};

export default page;

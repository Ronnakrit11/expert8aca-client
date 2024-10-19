"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React, { FC, useEffect } from "react";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full  flex justify-center pt-20">
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <div className="mt-[40px]">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </AdminProtected>
      {/* <div className="mt-[40px]">
        <div>{children}</div>
      </div> */}
    </div>
  );
}
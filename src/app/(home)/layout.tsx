"use client";
import React, { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/components/Contexts/SidebarContext";
import { cn } from "@/lib/utils";
import SyncComponent from "@/components/common/SyncComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useContext(SidebarContext);
  return (
    <>
      <SyncComponent />
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="relative flex flex-col">
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <!-- ===== Header End ===== --> */}
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div
          className={cn(
            "flex-1 transform overflow-y-auto overflow-x-hidden duration-300 ease-linear lg:pl-0",
            {
              "lg:pl-52.5": sidebarOpen,
            },
          )}
        >
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

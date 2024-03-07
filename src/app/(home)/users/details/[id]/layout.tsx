import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserForm from "@/components/Users/form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb
        previousPage={{
          name: "Users list",
          link: "./users/list",
        }}
        pageName={"Details"}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {children}
      </div>
    </div>
  );
}

import React from "react";
import Header from "@/components/OpenCurse/Header";
import Footer from "@/components/OpenCurse/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <Header />
      <div className="mx-auto my-10 flex w-full max-w-screen-xl flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}

import { Metadata } from "next";
import { SidebarNav } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="mx-auto max-w-screen-lg p-4 md:p-6 2xl:p-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <div className="flex items-center gap-5.5">
              <Link href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/SIA-logo.svg"}
                  alt="Logo"
                  width={60}
                  height={60}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/SIA-logo-dark.svg"}
                  alt="Logo"
                  width={60}
                  height={60}
                />
              </Link>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            </div>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Metadata } from "next";
import { Providers } from "@/components/Providers/Provicers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "SIA App",
    template: "%s | SIA App",
  },
  description: "Web page for managing the whole academic data of a university.",
  // openGraph: {
  //   title: 'SIA App',
  //   description:
  //     'Web page for managing the whole academic data of a university.',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        suppressHydrationWarning={true}
        className="min-h-screen dark:bg-boxdark-2 dark:text-bodydark"
      >
        <div className="min-h-screen">
          <Providers>{children}</Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

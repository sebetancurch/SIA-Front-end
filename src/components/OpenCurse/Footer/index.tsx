import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-4">
        <div className="flex max-w-2xl flex-col items-start gap-1">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <div className="flex items-center gap-4">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/SIA-logo.svg"}
                  alt="Logo"
                  width={70}
                  height={70}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/SIA-logo-dark.svg"}
                  alt="Logo"
                  width={70}
                  height={70}
                />
              </div>
            </Link>
            <h1 className="text-2xl font-medium text-black dark:text-white">
              OPEN COURSE
            </h1>
          </div>
          <span className="text-md font-normal">
            Open course is an open learning repository, for institutions to
            upload their academic resources for the public, including video
            lectures, notes, exams, tasks and so on.
          </span>
          <span>© 2024 by institution</span>
        </div>
        <div>
          <ul className="flex flex-row gap-4">
            <li>
              <Link href="https://www.instagram.com/">
                <FaInstagram size={30} />
              </Link>
            </li>
            <li>
              <Link href="https://web.facebook.com/">
                <FaFacebook size={30} />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/">
                <RiTwitterXFill size={30} />
              </Link>
            </li>

            <li>
              <Link href="https://www.youtube.com/">
                <FaYoutube size={30} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

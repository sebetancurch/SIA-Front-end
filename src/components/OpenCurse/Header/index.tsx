import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="mx-auto flex max-w-screen-xl flex-grow items-center justify-between py-2">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/open-course"
            className="flex items-center gap-2 sm:gap-4"
          >
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

            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-2xl font-medium text-black dark:text-white">
                OPEN COURSE
              </h1>
            </div>
          </Link>
          <ul className="flex items-center gap-2 font-semibold 2xsm:gap-4">
            <li>
              <Link href="about">About OC</Link>
            </li>
            <li>
              <Link href="contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";
import { LoginIcon } from "@/components/SvgIcons/SvgIcons";
import LogInForm from "@/components/LogIn/LogIn";

const SignIn: React.FC = () => {
  return (
    <div className="mx-auto h-screen max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-wrap items-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <div className="mb-4 inline-block">
                <div className="flex items-center gap-4">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/SIA-logo.svg"}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                  <Image
                    className="dark:hidden"
                    src={"/images/logo/SIA-logo-dark.svg"}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                  <h4 className="text-7xl font-semibold text-black dark:text-white">
                    SIA
                  </h4>
                </div>
              </div>

              <p className="2xl:px-20">
                Welcome to your academic management system!!, log in to your
                existing account or contact an administrator to get one.
              </p>

              <span className="mt-15 inline-block">{LoginIcon}</span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to SIA
              </h2>
              <LogInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

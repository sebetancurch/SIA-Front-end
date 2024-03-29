import React from "react";
import LogInForm from "@/components/LogIn/LogIn";
import ActivateAccountForm from "@/components/ActivateAccount/ActivateAccountForm";

export default function ActivateAccount({
  searchParams,
}: {
  searchParams: { [token: string]: string | string[] | undefined };
}) {
  if (!searchParams.token) {
    throw new Error("Token not present in the path.");
  }

  return (
    <div className="mx-auto flex h-screen max-w-screen-2xl items-center justify-center p-4 md:p-6 2xl:p-10">
      <div className="flex flex-wrap items-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Create a password
            </h2>
            <ActivateAccountForm token={searchParams.token as string} />
          </div>
        </div>
      </div>
    </div>
  );
}

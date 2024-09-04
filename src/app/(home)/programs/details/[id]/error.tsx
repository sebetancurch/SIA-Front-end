"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-gray-100 flex h-full flex-col items-center justify-center p-10">
      <div className="flex flex-col items-center gap-6.5">
        <h1 className="text-gray-700 text-7xl font-extrabold">
          Program does not exist!! :(
        </h1>
        <p className="text-gray-600 mb-6 text-2xl font-medium">
          {error.message || "Something went wrong"}
        </p>
        <Link
          href="/"
          className="rounded-md bg-indigo-500 px-4 py-2 font-medium text-white transition-all duration-200 ease-in-out hover:bg-indigo-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

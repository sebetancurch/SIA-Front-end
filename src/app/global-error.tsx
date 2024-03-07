"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6.5">
        <h1 className="text-gray-700 text-7xl font-extrabold">
          An error has occurred!! :(
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

import { NotFoundIcon } from "@/components/SvgIcons/SvgIcons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen bg-white shadow-default dark:bg-boxdark">
      <div className="mx-auto flex h-full max-w-[410px] flex-col justify-center text-center">
        <NotFoundIcon />
        <h1>Sorry the page cant be found</h1>
        <h3>
          The page you were looking appears to have been moved, deleted or does
          not exist
        </h3>
        <div className="my-4 flex w-full justify-center">
          <Link
            href="/"
            className="rounded-md bg-indigo-500 p-2 font-medium text-white transition-all duration-200 ease-in-out hover:bg-indigo-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

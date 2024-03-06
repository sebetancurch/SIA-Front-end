import { NotFoundIcon } from "@/components/SvgIcons/SvgIcons";

export default function NotFound() {
  return (
    <div className="h-screen bg-white shadow-default dark:bg-boxdark">
      <div className="mx-auto flex h-full max-w-[410px] flex-col justify-center text-center">
        <NotFoundIcon />
        <h1>Sorry the page cant be found</h1>
        <h3>
          The page you were looking appearsto have been moved, deleted or does
          not exist
        </h3>
      </div>
    </div>
  );
}

import { NotFoundIcon } from "@/components/SvgIcons/SvgIcons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[410px] text-center">
      <NotFoundIcon />
      <h1>Sorry the page cant be found</h1>
      <h3>
        The page you were looking appearsto have been moved, deleted or does not
        exist
      </h3>
    </div>
  );
}

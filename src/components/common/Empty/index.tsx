import { EmptyListIllustration } from "@/components/SvgIcons/SvgIcons";

export const EmptyList = ({ info }: { info: string }) => {
  return (
    <div className="mx-auto flex flex-col items-center py-5">
      <EmptyListIllustration width={500} height={500} />
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {info}
      </h2>
    </div>
  );
};

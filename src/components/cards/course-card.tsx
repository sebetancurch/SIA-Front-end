import { Subject } from "@/types/subject";
import Link from "next/link";

export const CourseCard = ({ subject }: { subject: Subject }) => {
  return (
    <Link
      className="max-w-lg rounded-md transition delay-150 ease-in-out hover:scale-125"
      href={"./" + subject.id}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col justify-start">
          <h1>{subject.name}</h1>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

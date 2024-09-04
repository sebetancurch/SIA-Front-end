import { ListResponse } from "@/types/list-request";
import { Response } from "@/types/response";
import { Course } from "@/types/course";
import { getCourses } from "@/services/course";
import CourseForm from "@/app/(home)/courses/details/[id]/form";

const getCourse = async (
  id: string,
): Promise<Response<ListResponse<Course>>> => {
  return await getCourses({
    direction: "ASC",
    page: 0,
    size: 1,
    sort: "id",
    filters: [
      {
        attribute: "id",
        value: +id,
      },
    ],
  });
};

const CourseDetails = async (props: { params: { id: string } }) => {
  const { id } = props.params;

  const courseResponse = await getCourse(id);

  if (!courseResponse.success) {
    throw new Error(courseResponse.message);
  }

  return <CourseForm course={courseResponse.content?.content[0] as Course} />;
};

export default CourseDetails;

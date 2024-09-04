import FacultyForm from "@/app/(home)/faculties/details/[id]/form";
import { getFaculties } from "@/services/faculty";
import { Faculty } from "@/types/faculty";
import { ListResponse } from "@/types/list-request";
import { Response } from "@/types/response";

const getFaculty = async (
  id: string,
): Promise<Response<ListResponse<Faculty>>> => {
  return await getFaculties({
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

const FacultyDetails = async (props: { params: { id: string } }) => {
  const { id } = props.params;

  const facultyResponse = await getFaculty(id);

  if (!facultyResponse.success) {
    throw new Error(facultyResponse.message);
  }

  return (
    <FacultyForm faculty={facultyResponse.content?.content[0] as Faculty} />
  );
};

export default FacultyDetails;

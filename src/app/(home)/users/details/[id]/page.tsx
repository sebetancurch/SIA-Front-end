import UserForm from "@/app/(home)/users/details/[id]/form";
import { getUsers } from "@/services/user";
import FacultyForm from "@/app/(home)/faculties/details/[id]/form";
import { Faculty } from "@/types/faculty";
import { User } from "@/types/user";

const UserDetails = async (props: { params: { id: string } }) => {
  const { id } = props.params;

  const userResponse = await getUsers({
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

  if (!userResponse.success) {
    throw new Error(userResponse.message);
  }

  return <UserForm user={userResponse.content?.content[0] as User} />;
};

export default UserDetails;

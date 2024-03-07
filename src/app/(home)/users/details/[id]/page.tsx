import UserForm from "@/components/Users/form";
import { getUsers } from "@/services/user";
import { router } from "next/client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { cookies } from "next/headers";
import { getSessionToken } from "@/actions";

const UserDetails = async (props: { params: { id: string } }) => {
  const { id } = props.params;
  const user = await getUsers({
    direction: "ASC",
    page: 0,
    size: 1,
    sort: "id",
    filters: [
      {
        attribute: "id",
        value: id,
      },
    ],
  });

  return <UserForm user={user?.content[0]} />;
};

export default UserDetails;

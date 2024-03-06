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

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb
        previousPage={{
          name: "Users list",
          link: "./users/list",
        }}
        pageName={"Details"}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <UserForm user={user?.content[0]} />
      </div>
    </div>
  );
};

export default UserDetails;

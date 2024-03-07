"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ListRequest, ListResponse } from "@/types/list-request";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EmptyList } from "@/components/common/Empty";
import { getUsers } from "@/services/user";
import { PaginationElement } from "@/components/common/Pagination";
import CreationDialog from "@/components/Users/creation";
import Filters, { SentFilterObject } from "@/components/common/Filters";
import {
  defaultFilterValues,
  filterSchema,
  filterSelections,
} from "@/app/(home)/users/list/filterFields";
import { translateRole } from "@/actions/Translators";

export default function UsersTablePage() {
  const [request, setRequest] = useState<ListRequest>({
    page: 0,
    size: 10,
    direction: "ASC",
    sort: "id",
    filters: [],
  });
  const [response, setResponse] = useState<ListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { page, sort, direction, size } = request;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      return await getUsers(request);
    };
    fetchData().then((response: any) => {
      setResponse(response);
      setIsLoading(false);
    });
  }, [request]);

  const handlePage = (pageNumber: number) => {
    setRequest({
      ...request,
      page: pageNumber,
    });
  };

  function handleFiltering(filters: SentFilterObject[]) {
    setRequest({ ...request, filters });
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
        <CreationDialog />
      </div>

      <div className="flex justify-between px-4 pb-6 md:px-6 xl:px-7.5">
        <Filters
          schema={filterSchema}
          filterSelections={filterSelections}
          handleFiltering={handleFiltering}
          defaultValues={defaultFilterValues}
        />
      </div>

      <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Program</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {!isLoading ? (
        response?.content && response?.content.length > 0 ? (
          <>
            {response?.content.map((user) => (
              <Link
                className="hover:bg- grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark dark:hover:bg-meta-4 sm:grid-cols-5 md:px-6 2xl:px-7.5"
                key={user.id}
                href={"/users/details/" + user.id}
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {translateRole(user.role)}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  {user.program}
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p
                    className={cn("text-sm", {
                      "text-green-600": user.active,
                      "text-red-600": !user.active,
                    })}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <EmptyList info={"Users not found"} />
        )
      ) : (
        <Loader />
      )}
      <PaginationElement
        page={page}
        totalPages={response?.totalPages as number}
        handlePage={handlePage}
        className={cn("py-5", {
          hidden:
            !response?.content ||
            response.content.length < 1 ||
            response.totalPages < 2,
        })}
      />
    </div>
  );
}

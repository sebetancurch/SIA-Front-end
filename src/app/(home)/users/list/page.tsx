"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ListRequest, ListResponse } from "@/types/list-request";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EmptyList } from "@/components/common/Empty";
import { getUsers } from "@/services/user";
import { PaginationElement } from "@/components/common/Pagination";
import Filters, { SentFilterObject } from "@/components/common/Filters";
import {
  defaultFilterValues,
  filterSchema,
  filterSelections,
} from "@/app/(home)/users/list/filterFields";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { translateRole, translateState } from "@/actions/Translators";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaPlus } from "react-icons/fa";
import UserForm from "@/components/Users/form";

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
  const [pagination, setPagination] = useState("10");
  const { page, sort, direction, size } = request;

  useEffect(() => {
    setIsLoading(true);
    getUsers(request)
      .then((response: any) => {
        setResponse(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [request]);

  useEffect(() => {
    setRequest({ ...request, size: +pagination });
  }, [pagination]);

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
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <FaPlus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create User</SheetTitle>
              <SheetDescription>
                Be aware that the email is unique and is not registered yet in
                the app.
              </SheetDescription>
            </SheetHeader>
            <UserForm />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex justify-between px-4 pb-6 md:px-6 xl:px-7.5">
        <Filters
          schema={filterSchema}
          filterSelections={filterSelections}
          defaultValues={defaultFilterValues}
          handleFiltering={handleFiltering}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Select pagination: {pagination}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Elements per page</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={pagination}
              onValueChange={setPagination}
            >
              <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 lg:grid-cols-5 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 flex items-center justify-center lg:col-span-1 lg:justify-start">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-1 hidden items-center lg:flex">
          <p className="font-medium">email</p>
        </div>
        <div className="col-span-1 hidden items-center lg:flex">
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
                className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 hover:bg-meta-2 dark:border-strokedark dark:hover:bg-meta-4 md:px-6 lg:grid-cols-5 2xl:px-7.5"
                key={user.id}
                href={"/users/details/" + user.id}
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
                <div className="col-span-2 flex items-center justify-center lg:col-span-1 lg:justify-start">
                  <p className="text-sm text-black dark:text-white">
                    {translateRole(user.role)}
                  </p>
                </div>
                <div className="col-span-1 hidden items-center lg:flex">
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div className="col-span-1 hidden items-center lg:flex">
                  {user.program}
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p
                    className={cn("text-sm", {
                      "text-green-600": user.state === "ACTIVE",
                      "text-red-600": user.state === "INACTIVE",
                      "text-yellow-600": user.state === "PENDING",
                    })}
                  >
                    {translateState(user.state as string)}
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

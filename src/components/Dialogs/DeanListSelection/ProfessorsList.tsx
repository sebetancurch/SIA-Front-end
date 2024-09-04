"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ListRequest, ListResponse } from "@/types/list-request";
import { cn } from "@/lib/utils";
import { EmptyList } from "@/components/common/Empty";
import { getProfessorsForDean, getUsers } from "@/services/user";
import { PaginationElement } from "@/components/common/Pagination";
import Filters, { SentFilterObject } from "@/components/common/Filters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { translateState } from "@/actions/translators";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { toast } from "@/components/ui/use-toast";
import {
  defaultFilterValues,
  filterSchema,
  filterSelections,
} from "@/components/Dialogs/DeanListSelection/filterFields";

export default function ProfessorsList({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser?: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
}) {
  const [request, setRequest] = useState<ListRequest>({
    page: 0,
    size: 10,
    sort: "id",
    direction: "ASC",
    filters: [],
  });
  const [response, setResponse] = useState<ListResponse<User>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState("10");
  const { page, sort, direction, size } = request;

  useEffect(() => {
    setIsLoading(true);
    getProfessorsForDean(request)
      .then((response: any) => {
        setResponse(response.content);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
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

  function select(user: User) {
    setSelectedUser(user);
  }

  return (
    <div className="bg-white dark:bg-boxdark">
      <div className="flex justify-between px-4 py-2 pb-6 md:px-6 xl:px-7.5">
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

      <div className="grid grid-cols-4 border-t border-stroke px-4 py-3 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Name</p>
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
              <div
                className={cn(
                  "grid cursor-pointer grid-cols-4 border-t border-stroke px-4 py-3 hover:bg-meta-2 dark:border-strokedark dark:hover:bg-meta-4 md:px-6 2xl:px-7.5",
                  { "bg-meta-2 dark:bg-meta-4": selectedUser?.id === user.id },
                )}
                key={user.id}
                onClick={() => select(user)}
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
                <div className="col-span-1 items-center lg:flex">
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div className="col-span-1 items-center lg:flex">
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
              </div>
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

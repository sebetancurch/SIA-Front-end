import React, { useEffect, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "@/types/navigation";
import useStore from "@/store/LoggedUserStore";
import { Skeleton } from "@/components/ui/skeleton";

function groupByCategory(objects: Navigation[]): {
  [key: string]: Navigation[];
} {
  return objects.reduce(
    (result, obj) => {
      const category = obj.category;
      result[category] = result[category] || [];
      result[category].push(obj);
      return result;
    },
    {} as { [key: string]: Navigation[] },
  );
}

export const NavList = () => {
  const navigationData = useStore((state) => state.navigationData);
  const fetchNavigationData = useStore((state) => state.fetchUserData);

  const pathname = usePathname();

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    if (!navigationData) {
      fetchNavigationData();
    }
  }, [navigationData, fetchNavigationData]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  if (!navigationData) {
    return (
      <ul className="h-full">
        <Skeleton className="my-4 h-7 w-30" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-30" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
        <Skeleton className="my-4 h-7 w-40" />
      </ul>
    );
  }

  const groupCategory = groupByCategory(navigationData);
  const elements = [];

  for (const category in groupCategory) {
    if (groupCategory.hasOwnProperty(category)) {
      elements.push(
        <div key={category}>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
            {category}
          </h3>
          <ul className="mb-6 flex flex-col gap-1.5">
            {groupCategory[category].map((item) => {
              return item.isGroup ? (
                <SidebarLinkGroup
                  activeCondition={pathname.includes(item.link)}
                  key={item.link}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 dark:hover:text-white ${
                            pathname.includes(item.link) &&
                            "text-primary dark:bg-meta-4 dark:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          {item.icon}
                          {item.name}
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            {item.groupItems?.map((link) => {
                              return (
                                <li key={link.link}>
                                  <Link
                                    href={link.link}
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-primary dark:hover:text-white ${
                                      pathname === link.link && "text-white"
                                    }`}
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : (
                <li key={item.link}>
                  <Link
                    href={item.link || "/"}
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 dark:hover:text-white ${
                      item.link &&
                      pathname === item.link &&
                      "text-primary dark:bg-meta-4 dark:text-white"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>,
      );
    }
  }

  return <>{elements}</>;
};

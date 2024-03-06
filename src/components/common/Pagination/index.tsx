import { EmptyListIllustration } from "@/components/SvgIcons/SvgIcons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export const PaginationElement = ({
  page,
  totalPages,
  handlePage,
  className,
}: {
  page: number;
  totalPages: number;
  handlePage(page: number): void;
  className?: string;
}) => {
  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem
          className={cn({
            hidden: page < 1,
          })}
        >
          <PaginationPrevious
            onClick={() => {
              handlePage(page - 1);
            }}
          />
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page < 2,
          })}
        >
          <PaginationLink
            onClick={() => {
              handlePage(0);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page < 2,
          })}
        >
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page < 1,
          })}
        >
          <PaginationLink
            onClick={() => {
              handlePage(page - 1);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page === totalPages - 1,
          })}
        >
          <PaginationLink
            onClick={() => {
              handlePage(page + 1);
            }}
          >
            {page + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page > totalPages - 3,
          })}
        >
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: totalPages === undefined || page > totalPages - 3,
          })}
        >
          <PaginationLink
            onClick={() => {
              handlePage(totalPages - 1);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={cn({
            hidden: page === totalPages - 1,
          })}
        >
          <PaginationNext
            onClick={() => {
              handlePage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

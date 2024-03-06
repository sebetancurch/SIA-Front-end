import { User } from "@/types/user";

export interface ListRequest {
  page: number;
  size: number;
  sort: string;
  direction: string;
  filters?: {
    attribute: string;
    value: string;
  }[];
}

export interface ListResponse {
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

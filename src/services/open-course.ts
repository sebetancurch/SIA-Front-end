"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { Program } from "@/types/program";
import { Subject } from "@/types/subject";
import axiosInstance from "@/lib/axios";

export async function getCourses(
  request: ListRequest,
): Promise<ListResponse<Subject>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.faculties.list,
      request,
    )
    return data;
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

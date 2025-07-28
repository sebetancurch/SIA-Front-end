"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { Subject } from "@/types/subject";
import { Response } from "@/types/response";
import axiosInstance from "@/lib/axios";

export async function getSubjects(
  request: ListRequest,
): Promise<Response<ListResponse<Subject>>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.subjects.list, request);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function createSubject(
  faculty: Subject,
): Promise<Response<Subject>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.subjects.update,
      faculty,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function updateSubject(
  faculty: Subject,
  id: number,
): Promise<Response<Subject>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.subjects.update + "/" + id,
      faculty,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

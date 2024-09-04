"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { getSessionToken } from "@/actions/login-actions";
import { Faculty } from "@/types/faculty";
import { Response } from "@/types/response";
import axiosInstance from "@/lib/axios";

export async function getFaculties(
  request: ListRequest,
): Promise<Response<ListResponse<Faculty>>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.faculties.list,
      request,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function createFaculty(
  faculty: Faculty,
): Promise<Response<Faculty>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.faculties.update,
      faculty,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function updateFaculty(
  faculty: Faculty,
  id: number,
): Promise<Response<Faculty>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.faculties.update + "/" + id,
      faculty,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

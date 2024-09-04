"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { Course } from "@/types/course";
import { Response } from "@/types/response";
import axiosInstance from "@/lib/axios";

export async function getCourses(
  request: ListRequest,
): Promise<Response<ListResponse<Course>>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.courses.list, request);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function createCourse(course: Course): Promise<Response<Course>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.courses.update, course);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function updateCourse(
  course: Course,
  id: number,
): Promise<Response<Course>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.courses.update + "/" + id,
      course,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

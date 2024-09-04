"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { getSessionToken } from "@/actions/login-actions";
import { Program } from "@/types/program";
import { Response } from "@/types/response";
import axiosInstance from "@/lib/axios";

export async function getPrograms(
  request: ListRequest,
): Promise<Response<ListResponse<Program>>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.programs.list, request);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function createProgram(
  program: Program,
): Promise<Response<Program>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.programs.update,
      program,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function updateProgram(
  program: Program,
  id: number,
): Promise<Response<Program>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.programs.update + "/" + id,
      program,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

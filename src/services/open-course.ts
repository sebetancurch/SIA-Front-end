"use server";

import { azureUrls } from "./urls";
import { ListRequest, ListResponse } from "@/types/list-request";
import { getSessionToken } from "@/actions/login-actions";
import { Program } from "@/types/program";
import { Subject } from "@/types/subject";

export async function getCourses(
  request: ListRequest,
): Promise<ListResponse<Subject>> {
  try {
    const accessToken = await getSessionToken();
    const response = await fetch(azureUrls.users.list, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken as string,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

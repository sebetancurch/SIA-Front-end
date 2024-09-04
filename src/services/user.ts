"use server";

import { azureUrls } from "./urls";
import { User } from "@/types/user";
import { ListRequest, ListResponse } from "@/types/list-request";
import { getSessionToken } from "@/actions/login-actions";
import { LoginResponse, Response } from "@/types/response";
import axiosInstance from "@/lib/axios";

export async function validateUser(user: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.users.login, user);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function getUserDataByToken(): Promise<Response<LoginResponse>> {
  try {
    const accessToken = await getSessionToken();
    const { data } = await axiosInstance.get(
      azureUrls.users.getUserDataByToken + "?token=" + accessToken,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function getUsers(
  request: ListRequest,
): Promise<Response<ListResponse<User>>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.users.list, request);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function getProfessorsForDean(
  request: ListRequest,
): Promise<Response<ListResponse<User>>> {
  try {
    const { data } = await axiosInstance.post(
      azureUrls.users.deanList,
      request,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function createUser(user: User): Promise<Response<User>> {
  console.log(user);
  try {
    const { data } = await axiosInstance.post(azureUrls.users.create, user);
    return data;
  } catch (e) {
    console.error(e);
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function updateUser(
  user: User,
  id: number,
): Promise<Response<User>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.users.update + "/" + id,
      user,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function activateUser(
  passwordBody: { password: string; confirmPassword: string },
  token: string,
): Promise<Response<void>> {
  try {
    const { data } = await axiosInstance.patch(
      azureUrls.users.activate + "?token=" + token,
      passwordBody,
    );
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

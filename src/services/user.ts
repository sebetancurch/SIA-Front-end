"use server";

import { azureUrls } from "./urls";
import { User } from "@/types/user";
import { ListRequest, ListResponse } from "@/types/list-request";
import { LoginResponse, Response } from "@/types/response";
import axiosInstance from "@/lib/axios";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";

export async function login(user: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse>> {
  try {
    const { data } = await axiosInstance.post(azureUrls.users.login, user);
    if (data.success) {
      await cookies().set("accessToken", data.content?.accessToken, {
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function logout() {
  cookies().delete("accessToken");
  cookies().set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  redirect("/login");
}

export async function getUserDataByToken(): Promise<Response<LoginResponse>> {
  try {
    const { data } = await axiosInstance.get(
      azureUrls.users.getUserDataByToken,
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
    console.log(data);
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

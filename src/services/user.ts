"use server";

import { azureUrls } from "./urls";
import { Session, User } from "@/types/user";
import { ListRequest } from "@/types/list-request";
import { getSessionToken } from "@/actions";
import { compileNonPath } from "next/dist/shared/lib/router/utils/prepare-destination";

export async function validateUser(user: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const encodedUser = new TextEncoder().encode(JSON.stringify(user));
    const response = await fetch(azureUrls.users.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: encodedUser,
    });

    const loggedUser = await response.json();
    if (loggedUser.success) {
      const token = response.headers.get("Authorization");
      return {
        user: { ...loggedUser.user },
        session: token,
      };
    } else {
      return loggedUser;
    }
  } catch (e) {
    return "An unexpected error has occurred";
  }
}

export async function getUsers(request: ListRequest): Promise<any> {
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
    return await response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

export async function getUserByToken(token: string): Promise<any> {
  try {
    const accessToken = await getSessionToken();
    const response = await fetch(azureUrls.users.list, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken as string,
      },
    });
    return await response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

export async function createUser(user: User): Promise<any> {
  try {
    const accessToken = await getSessionToken();
    const response = await fetch(azureUrls.users.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken as string,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

export async function updateUser(user: User, id: number): Promise<any> {
  try {
    const accessToken = await getSessionToken();
    const response = await fetch(azureUrls.users.update + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken as string,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

export async function activateUser(
  data: { password: string; confirmPassword: string },
  token: string,
): Promise<any> {
  try {
    const response = await fetch(azureUrls.users.activate + "?token=" + token, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    throw new Error("An unexpected error has occurred");
  }
}

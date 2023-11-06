import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";
import { User } from "../types/user.type";


export async function getPublicContent(): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.get("http://localhost:3333/users/me", {
      headers: authHeader(),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

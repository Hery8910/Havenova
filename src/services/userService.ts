import api from "./api";
import { RegisterResponse } from "../types/User";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  address: string,
  phone: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>("/api/users/register", {
      name,
      email,
      password,
      address,
      phone,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong on the register, please try again.");
  }
};
export const loginUser = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/api/users/login", { email, password });
  return response.data;
};

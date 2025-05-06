import api from "./api";
import { RegisterResponse } from "../types/User";
import { ServiceRequestItem } from "../types/services";

interface UpdateUserPayload {
  email: string;
  name: string;
  address: string;
  phone: string;
  requests?: ServiceRequestItem[]; // 👈 ahora es opcional
}

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
  const response = await api.post<RegisterResponse>("/api/users/login", {
    email,
    password,
  });
  return response.data;
};
export const updateUser = async (payload: UpdateUserPayload): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/api/users/update-user", payload);
  return response.data;
};
export const logoutUser = async (): Promise<void> => {
  await api.post("/api/users/logout");
};

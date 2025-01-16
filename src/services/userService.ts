import api from "./api"; 
import { User } from "../types/User"; 

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  address: string,
  phone: string
): Promise<User> => {
  try {
    const response = await api.post<User>("/api/users/register", {
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
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/api/users/login", { email, password });
  return response.data;
};
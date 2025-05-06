import { ServiceRequestItem } from "./services";

// src/types/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  isVerified: boolean;
  phone: string;
  role: string;
  requests: ServiceRequestItem[];
}
export interface UserError {
  message: string;
}
export interface RegisterResponse {
  message: string;
  field: string;
  error: string;
  user: User;
}
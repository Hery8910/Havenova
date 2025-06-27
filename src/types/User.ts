import { ServiceOrder } from "./services";

// src/types/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  profileImage: string;
  phone: string;
  isVerified: boolean;
  role: string;
  createdAt: Date;
  isFromBackend?: boolean;
  requests: ServiceOrder[];
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

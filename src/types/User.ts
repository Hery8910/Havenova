// src/types/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  isVerified: boolean;
  phone: string;
  role: boolean;
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
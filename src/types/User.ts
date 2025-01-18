// src/types/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: boolean;
}
export interface UserError {
  message: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
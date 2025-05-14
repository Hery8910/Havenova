import { FurnitureAssemblyData } from "../types/services";

// validators.ts
export const isNameValid = (name: string): boolean =>
  /^[A-Z][a-zA-Z- äöü' ]{1,49}$/.test(name.trim());

export const isEmailValid = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneValid = (phone: string): boolean =>
  /^(\+49|0)\d{8,12}$/.test(phone);

export const isPasswordValid = (password: string): boolean =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

export const isAddressValid = (address: string): boolean =>
  /^[a-zA-Z0-9\s,'-.#]{5,49}$/.test(address.trim());

export const isServiceAddressValid = (serviceAddress: string): boolean =>
  /^[a-zA-Z0-9\s,'-.#]{5,49}$/.test(serviceAddress.trim());

export const validateField = (name: string, value: string): string => {
  if (name === "name" && !isNameValid(value)) {
    return "The name must begin with a capital letter and contain only letters, spaces, hyphens, or apostrophes.";
  } else if (name === "email" && !isEmailValid(value)) {
    return "The email is not valid";
  } else if (name === "phone" && !isPhoneValid(value)) {
    return "The phone number is not valid";
  } else if (name === "password" && !isPasswordValid(value)) {
    return "The password must be at least 8 characters, one uppercase letter, one number, and one special character.";
  } else if (name === "address" && !isAddressValid(value)) {
    return "The address can only contain letters, numbers, spaces, commas, and hyphens.";
  }
  return "";
};

export const validateFurnitureForm = (
  formData: FurnitureAssemblyData
): string | null => {
  // Dynamic checks based on 'input' flags
  if(!formData.width) return null
  if (formData.width === "" || Number(formData.width) <= 0) {
    return "Please enter a valid width.";
  }
  if(!formData.height) return null

  if (formData.height === "" || Number(formData.height) <= 0) {
    return "Please enter a valid height.";
  }
  if(!formData.depth) return null

  if (formData.depth === "" || Number(formData.depth) <= 0) {
    return "Please enter a valid depth.";
  }

  return null; // ✅ All checks passed
};

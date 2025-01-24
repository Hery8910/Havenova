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

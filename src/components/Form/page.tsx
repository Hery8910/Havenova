// components/forms/UserContactForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { validateField } from "../../utils/validators";
import styles from "./page.module.css";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  serviceAddress: string;
}

interface Props {
  onChange: (data: FormData) => void;
  initialData?: Partial<FormData>;
  showErrors?: boolean;
  showserviceAddress?: boolean;
}

export default function UserContactForm({
  onChange,
  initialData = {},
  showErrors = true,
  showserviceAddress = false,
}: Props) {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    serviceAddress: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [sameAdress, setSameAdress] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        serviceAddress: user.serviceAddress || "",
      }));
    }
  }, [user]);



  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        isValid = false;
        newErrors[fieldName] = error;
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="name"
        required
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="email"
        required
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      <div className={styles.div}>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <button
          className={styles.show}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <ImEye /> : <ImEyeBlocked />}
        </button>
      </div>
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      <input
        className={styles.input}
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="address"
        required
      />
      {errors.address && <p className={styles.error}>{errors.address}</p>}
      {showserviceAddress && (
        <div>
          <p>Use the same address as above?</p>
          <button onClick={() => setSameAdress(true)}>
            <input
              className={styles.input}
              type="text"
              name="serviceAddress"
              placeholder="Service Address"
              value={sameAdress ? formData.address : formData.serviceAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="address"
              required
            />
            Yes, use my saved address
          </button>
          {errors.serviceAddress && (
            <p className={styles.error}>{errors.serviceAddress}</p>
          )}
        </div>
      )}

      <input
        className={styles.input}
        type="tel"
        name="phone"
        placeholder="Phone +49 123456789"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="phone"
        required
      />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}
    </>
  );
}

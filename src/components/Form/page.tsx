// components/forms/UserContactForm.tsx

"use client";
import {  useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { validateField } from "../../utils/validators";
import styles from "./page.module.css";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

interface FormData {
    name: string;
    email: string;
    password: string;
    address: string;
    profileImage: string;
    phone: string;
}

interface Props {
  onChange: (data: FormData) => void;
  value: FormData;
}

export default function UserContactForm({ value, onChange }: Props) {

  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    profileImage: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    const error = validateField(name, inputValue);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    // Llama a onChange con el objeto actualizado (delegas todo el manejo de estado al padre)
    onChange({ ...value, [name]: inputValue });

    // Opcional: validación inmediata
    const error = validateField(name, inputValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <>
    <input
      className={styles.input}
      type="text"
      name="name"
      placeholder="Name"
      value={value.name || ""}
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
      value={value.email || ""}
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
        value={value.password || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <button
        className={styles.show}
        type="button"
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
      value={value.address || ""}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="address"
      required
    />
    {errors.address && <p className={styles.error}>{errors.address}</p>}

    <input
      className={styles.input}
      type="tel"
      name="phone"
      placeholder="Phone +49 123456789"
      value={value.phone || ""}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="phone"
      required
    />
    {errors.phone && <p className={styles.error}>{errors.phone}</p>}
  </>
  );
}

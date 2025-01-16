"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "../../services/api";
import styles from "./page.module.css";

import Image from "next/image";
import { isPasswordValid } from "../../utils/validators";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      setError("The password is not valid.");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/users/reset-password", { token, password });
      setMessage("Password updated successfully.");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error updating password.");
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
      <Image
          src="/svg/logo-desktop.svg"
          priority={true}
          alt="Havenova logo"
          width={2400}
          height={400}
          className={`${styles.desktop} ${styles.image}`}
        />
        <Image
          src="/svg/logo-mobile.svg"
          priority={true}
          alt="Havenova logo"
          width={450}
          height={450}
          className={`${styles.mobile} ${styles.image}`}
        />
        <h1>Reset your Password</h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlur}
          required
        />

        {error && <p>{error}</p>}
        <button className={styles.button} type="submit">
          Reset Password
        </button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
};

export default ResetPassword;

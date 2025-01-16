"use client";
import { useState } from "react";
import api from "../../services/api";
import styles from "./page.module.css";
import Image from "next/image";
import {
  isEmailValid,
} from "../../utils/validators";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError("The email address is not valid.");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      await api.post("/api/users/forgot-password", { email });
      setMessage("Password reset email sent.");
      setError("")
    } catch (error: any)  {
      setMessage("");
      setError(error.response?.data?.message || "Error sending email.");
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
        <h1>Forgot Password?</h1>
        <p className={styles.header_p}>
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          required
        />
          {error && <p>{error}</p>}
        <button className={styles.button} type="submit">
          Send Reset Link
        </button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
};

export default ForgotPassword;

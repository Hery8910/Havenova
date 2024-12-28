"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";
import styles from './page.module.css'

const VerifyEmail = () => {
  const { user, refreshUser } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("Please check your email. We send you a verification email to secure your data.");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get("/api/users/verify-email", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setMessage("Correo verificado con éxito.");
          setTimeout(() => router.push("/"), 2000); 
        }
      } catch (error: any) {
        setMessage(error.response?.data?.message || "Please check your email. We send you a verification email to secure your data.");
        setError(true);
      }
    };

    setTimeout(() => verifyEmail(), 3000);
  }, []);

  const handleRefresh = async () => {
    setMessage("Verifying your email...(Loading)");
    try {
      await refreshUser(); 
      setMessage("Email successfully verified. Redirecting...(Loading)");
      setTimeout(() => router.push("/"), 2000); 
    } catch (error) {
      setMessage("There was an issue verifying your email.");
    }
  };
  

  return (
    <main className={styles.main}>
      <section className={styles.section}>
      <h1 className={styles.h1}>Email Verification</h1>
      <p className={styles.p}>{message}</p>
      {!user && (
        <button className={styles.button} onClick={handleRefresh}>
          Email Verified
        </button>
      )}
      </section>
    </main>
  );
};

export default VerifyEmail;

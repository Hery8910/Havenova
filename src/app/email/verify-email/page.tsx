"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";

import styles from "./page.module.css";
import Button from "../../../components/Button/page";
import Image from "next/image";
import Cookies from "js-cookie";

const VerifyEmail = () => {
  const { user, setUser, refreshUser } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
    const token = Cookies.get("authToken");

      try {
        if (token) {
          refreshUser(); 
        }
        if (!user?.isVerified) return
        setMessage("Email successfully verified. Redirecting...");
        setTimeout(() => router.push("/"), 3000);
      } catch (error: any) {
        setError(error.response?.data?.message || "Verification failed.");
      }
    };

    verifyUser();
  }, [router, setUser]);

  const handleResendEmail = async () => {
    const email = user?.email;
    try {
      const response = await api.post("/api/users/resend-verification", {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resending verification email.");
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.h1}>Email Verification</h1>
        <div className={styles.div}>
          <p className={styles.p}>{message}</p>

          <Image
            src="/svg/loading.svg"
            alt="Loading animation"
            width={70}
            height={70}
          />
        </div>
        {error && (
          <Button onClick={handleResendEmail}>Resend Verification Email</Button>
        )}
      </section>
    </main>
  );
};

export default VerifyEmail;

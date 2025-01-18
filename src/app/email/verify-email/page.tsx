"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";

import styles from "./page.module.css";
import Button from "../../../components/Button/page";
import Image from "next/image";

const Verification = () => {
  const searchParams = useSearchParams();
  const {  setUser } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          setError("No token provided.");
          return;
        }

        const response = await api.get(`/api/users/verify-email?token=${token}`, {
          withCredentials: true, 
        });

        const user = response.data;
        if (user.isVerified) {
          setUser(user); 
          setMessage("Email successfully verified. Redirecting...");
          setTimeout(() => router.push("/"), 3000); 
        } else {
          setError("Email not verified. Please try again.");
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "Verification failed.");
      }
    };

    verifyUser();
  }, [router, searchParams, setUser]);

  const handleResendEmail = async () => {
    try {
      const response = await api.get("/api/users/resend-verification");
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
            <Button onClick={handleResendEmail}>
              Resend Verification Email
            </Button>
          )}
      </section>
    </main>
  );
};
const VerifyEmail = ()=> {

  return (
    <Suspense>
      <Verification/>
    </Suspense>

  )
}

export default VerifyEmail;

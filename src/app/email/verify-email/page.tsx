"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";

import styles from "./page.module.css";
import Button from "../../../components/Button/page";
import Image from "next/image";

const VerifyEmail = () => {
  const {  setUser } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");

    if (statusParam) {
      setStatus(statusParam);
      setMessage(messageParam || "Verification complete.");
    }
  }, [searchParams]);

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
        {status === "error" && (
          <Button onClick={handleResendEmail}>Resend Verification Email</Button>
        )}
        {status === "success" && (
          <Button onClick={() => router.push("/")}>Go to Dashboard</Button>
        )}
      </section>
    </main>
  );
};

export default VerifyEmail;

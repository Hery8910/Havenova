"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import api from "../../../services/api";

import styles from "./page.module.css";

const VerifyEmail = () => {
  const { user, setUser, refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState<string>(
    "We send you an verification email, please check your Mail."
  );

  useEffect(() => {
    const verifyUser = async () => {
      try {
        refreshUser();
        if (!user?.isVerified) return;
        setMessage("Email successfully verified. Redirecting...");
        setTimeout(() => router.push("/"), 3000);
      } catch (error: any) {
        console.error("Unexpected error:", error);
      }
    };

    verifyUser();
  }, [router, setUser, refreshUser, user?.isVerified]);

  const handleResendEmail = async () => {
    const userEmail = user?.email || email;
    try {
      const response = await api.post("/api/users/resend-verification", {
        userEmail,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resending verification email.");
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.div}>
        <h1 className={styles.h1}>Email Verification</h1>
          <p className={styles.p}>{message}</p>
        </div>

        <form className={styles.form} onSubmit={handleResendEmail}>
          <label>If you have not received any email, please try again.</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Resend verification email.
          </button>
        </form>
      </section>
    </main>
  );
};

export default VerifyEmail;

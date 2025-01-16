"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

import styles from "./page.module.css";
import Button from "../../../components/Button/page";
import Image from "next/image";

const VerifyEmail = () => {
  const { user, refreshUser } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const handleRefresh = async () => {
    if (redirecting) return;
    setRedirecting(true);
    try {
      await refreshUser();
      setMessage("Email successfully verified. Redirecting...");
      console.log(user);
      setTimeout(() => router.push("/"), 3000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Please check your email. We sent you a verification email to secure your data."
      );
      setRedirecting(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.h1}>Email Verification</h1>
        <div className={styles.div}>
          <p className={styles.p}>{message}</p>

          <Image
            src="/svg/loading.svg"
            alt="Loading animation"
            style={redirecting ? { opacity: 1 } : { opacity: 0 }}
            width={70}
            height={70}
          />
        </div>
        {!user && (
          <Button onClick={handleRefresh} children={"Verify Account"} />
        )}
      </section>
    </main>
  );
};

export default VerifyEmail;

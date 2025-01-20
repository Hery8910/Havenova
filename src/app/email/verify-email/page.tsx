"use client";
import { useRouter} from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";

import styles from "./page.module.css";
import Button from "../../../components/Button/page";
import Image from "next/image";
import Cookies from "js-cookie";

const Verification = () => {
  const {  setUser } = useUser();
  const router = useRouter();
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = Cookies.get("authToken"); 

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
  }, [router, setUser]);

  const handleResendEmail = async () => {
    try {
      const response = await api.get("/api/users/resend-verification");
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resending verification email.");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>

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
    </Suspense>

  );
};
const VerifyEmail = ()=> {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Verification />
    </Suspense>

  )
}

export default VerifyEmail;

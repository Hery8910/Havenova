"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import { loginUser } from "../../services/userService";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  phone: string;
}
const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    ""
  );

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      setUser({
        _id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        isVerified: response.user.isVerified,
        role: response.user.role,
        address: response.user.address,
        phone: response.user.phone,
      });
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const { message, field } = error.response.data;
        console.error(`Login failed: ${message}`);
        if (field === "email") {
          setError("Invalid email provided");
        } else if (field === "password") {
          setError("Incorrect password");
        } else if (
          message === "Please verify your account before logging in."
        ) {
          setError("Please verify your account before logging in.");
        }
      } else {
        console.error("Unexpected error:", error);
      }
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
      </header>
      <section
        className={styles.section}>
        {error === "Please verify your account before logging in." && (
          <article className={styles.error_article}>
           
            <div className={styles.error_div}>
            <Image
              src="/svg/attention.svg"
              priority={true}
              alt="Havenova logo"
              width={200}
              height={200}
              className={styles.article_image}
            />
            <p className={styles.article_p}>{error}</p>
            <p className={styles.article_p}>
              We send you a verification email, please check your email.
            </p>
            <Link className={styles.link} href="/email/verify-email">
              Resend verification email
            </Link>
            </div>
          </article>
        )}
        <aside className={styles.aside}>
          <div className={styles.div}>
            <h1 className={styles.h1}>Welcome Back</h1>
            <p className={styles.header_p}>
              Log in to your account to manage your requests and explore your
              benefits.
            </p>
          </div>
          <article className={styles.article}>
            <p className={styles.p}>
              <Link href="/forgot-password">Forgot your password?</Link>
            </p>
            <p className={styles.p}>
              Don&apos;t have an account?{" "}
              <Link href="/register">Sign up here.</Link>
            </p>
          </article>
        </aside>

        <form className={styles.form} onSubmit={handleLogin}>
          <button className={styles.button} style={{ padding: "0 .5rem" }}>
            Continue with Google{" "}
            <Image
              src="/svg/google-logo.svg"
              alt="Google logo"
              width={35}
              height={35}
            />
          </button>
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error === "Invalid email provided" && (
            <p className={styles.error_p}>{error}</p>
          )}

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error === "Incorrect password" && (
            <p className={styles.error_p}>{error}</p>
          )}
          <button className={styles.button} type="submit">
            Log In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;

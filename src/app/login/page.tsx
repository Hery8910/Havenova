"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import { loginUser } from "../../services/userService";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
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
        <h1 className={styles.h1}>Welcome Back</h1>
        <p className={styles.header_p}>
          Log in to your account to manage your requests and explore your
          benefits.
        </p>
      </header>
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
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Log In
        </button>
      <article className={styles.article}>
        <p className={styles.p}>Forgot your password?</p>
        <p className={styles.p}>Don&apos;t have an account? <Link href="/register">Sign up here.</Link></p>
      </article>
      </form>
    </main>
  );
};

export default Login;

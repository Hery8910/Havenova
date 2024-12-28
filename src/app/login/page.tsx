"use client";
import { useState } from "react";
import styles from "./page.module.css";
import api from "../../services/api";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        { email, password }
      );
      console.log("Login exitoso:", response.data);
    } catch (error) {
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <Image
          className={styles.image}
          priority={true}
          src="/images/login.webp"
          alt="Minimalist flat design illustration of a worker in a blue uniform painting a wall with a roller."
          width={500}
          height={500}
        />
      </aside>
      <section className={styles.section}>
        <header className={styles.header}>
          <Image
            src="/logo-blue.svg"
            alt="Minimalist flat design illustration of a worker in a blue uniform painting a wall with a roller."
            width={200}
            height={200}
          />
          <h1 className={styles.h1}>Welcome Back!</h1>
          <p className={styles.p}>
            Log in to your account to manage your requests and explore your
            benefits.
          </p>
        </header>
        <form className={styles.form} action="handleLogin">
          <button
           className={styles.button}
           style={{padding: '0 .5rem'}}
           >
            Continue with Google{" "}
            <Image
              src="/google-logo.svg"
              alt="Minimalist flat design illustration of a worker in a blue uniform painting a wall with a roller."
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
          <button className={styles.button} onClick={handleLogin}>
            Log In
          </button>
        </form>
        <article className={styles.article}>
          <p className={styles.p}>Forgot your password?</p>
          <p className={styles.p}>Don't have an account? Sign up here.</p>
        </article>
      </section>
    </main>
  );
};

export default Login;

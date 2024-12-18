"use client";
import { useState } from "react";
import api from "../../services/api";
import styles from "./page.module.css";
import Image from "next/image";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const passwordsMatch = formData.password === formData.repeatPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await api.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone

      });
      setMessage("Usuario registrado con éxito. Verifica tu correo electrónico.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar el usuario");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Image
            className={styles.image}
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
          <form className={styles.form}  onSubmit={handleSubmit}>
            <button className={styles.button} style={{ padding: "0 .5rem" }}>
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
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repeat Password"
              value={formData.repeatPassword}
            onChange={handleChange}
            required
            />
            <input
              className={styles.input}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.button}>
              Log In
            </button>
          </form>
          <article className={styles.article}>
            <p className={styles.p}>Forgot your password?</p>
            <p className={styles.p}>Don't have an account? Sign up here.</p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Register;

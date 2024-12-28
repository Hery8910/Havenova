"use client";
import { useState } from "react";
import { registerUser } from "../../services/userService";
import { useRouter } from "next/navigation";
import { User } from "../../types/User";
import styles from "./page.module.css";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  address: string;
  phone: string;
}

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isEmailValid = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isPhoneValid = (phone: string): boolean => {
    const regex = /^\+49\d{10,12}$/;
    return regex.test(phone);
  };

  const isPasswordValid = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const passwordsMatch = (
    password: string,
    repeatPassword: string
  ): boolean => {
    return password === repeatPassword;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email" && !isEmailValid(value)) {
      error = "El correo electrónico no es válido";
    } else if (name === "phone" && !isPhoneValid(value)) {
      error = "El número de teléfono no es válido";
    } else if (name === "password" && !isPasswordValid(value)) {
      error =
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage("El nombre es obligatorio");
      return;
    }

    if (!isEmailValid(formData.email)) {
      setMessage("El correo electrónico no es válido");
      return;
    }

    if (!isPhoneValid(formData.phone)) {
      setMessage("El número de teléfono no es válido");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setMessage(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial."
      );
      return;
    }

    if (!passwordsMatch(formData.password, formData.repeatPassword)) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const user: User = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.address,
        formData.phone
      );
      setMessage(`Usuario registrado: ${formData.name}. Verifica tu correo.`);
      setTimeout(() => {
        router.push("/email/verify-email");
      }, 1500);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <>
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
          <form className={styles.form} onSubmit={handleSubmit}>
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
              onBlur={handleBlur}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repeat Password"
              value={formData.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
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
              placeholder="Phone +49123456789"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
          <article className={styles.article}>
            <p className={styles.p}>Forgot your password?</p>
            <p className={styles.p}>Don't have an account? Sign up here.</p>
          </article>
        {message && <p>{message}</p>}
        </section>
      </main>
    </>
  );
};

export default Register;

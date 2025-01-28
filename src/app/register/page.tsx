"use client";
import { useState } from "react";
import { registerUser } from "../../services/userService";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useUser } from "../contexts/UserContext";
import { validateField } from "../../utils/validators";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const Register = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(
    ""
  );
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        isValid = false;
        newErrors[fieldName] = error;
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.address,
        formData.phone
      );

     
      setMessage(response.message);
      setTimeout(() => {
        router.push("/email/verify-email");
      }, 3000);
    } catch (error: any) {
      setMessage(error.message);
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
      <section className={styles.section}>
        <aside className={styles.aside}>
          <div className={styles.div}>
            <h1 className={styles.h1}>Welcome</h1>
            {message ? (
              <p className={styles.header_p}>{message}</p>
            ) : (
              <p className={styles.header_p}>
                Create an account to manage your requests and explore your
                benefits.
              </p>
            )}
          </div>
          <article className={styles.article}>
            <p className={styles.p}>
              You have an account already?{" "}
              <Link className={styles.link} href="/login">
                Go to Login
              </Link>
            </p>
          </article>
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={handleBlur}
            autoComplete="name"

            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={handleBlur}
            autoComplete="email"

            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <div className={styles.div}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onBlur={handleBlur}
              required
            />
            <button
              className={styles.show}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <ImEye /> : <ImEyeBlocked />}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <input
            className={styles.input}
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            onBlur={handleBlur}
            autoComplete="address"
            required
          />
          {errors.address && <p className={styles.error}>{errors.address}</p>}
          <input
            className={styles.input}
            type="tel"
            name="phone"
            placeholder="Phone +49 123456789"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={handleBlur}
            autoComplete="phone"
            required
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          <button type="submit" className={styles.button}>
            Register
          </button>
          {message && <p className={styles.error}>{message}</p>}
        </form>
      </section>
    </main>
  );
};

export default Register;

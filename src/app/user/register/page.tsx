'use client'
import { useState, useEffect } from "react";
import { getUserFromStorage } from "../../../utils/guestUserStorage"; // ajusta la ruta
import { registerUser } from "../../../services/userService";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import UserContactForm from "../../../components/Form/page";

interface FormData {
  user: {
    name: string;
    email: string;
    password: string;
    address: string;
    profileImage: string;
    phone: string;
  };
}

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    user: {
      name: "",
      email: "",
      password: "",
      address: "",
      profileImage: "",
      phone: "",
    },
  });
  const [message, setMessage] = useState("");

  // --- Recuperar usuario del storage al montar ---
  useEffect(() => {
    const guestUser = getUserFromStorage();
    if (guestUser) {
      setFormData({
        user: {
          name: guestUser.name || "",
          email: guestUser.email || "",
          password: "",
          address: guestUser.address || "",
          profileImage: guestUser.profileImage || "",
          phone: guestUser.phone || "",
        },
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(
        formData.user.name,
        formData.user.email,
        formData.user.password,
        formData.user.address,
        formData.user.profileImage,
        formData.user.phone
      );

      setMessage(response.message);
      setTimeout(() => {
        router.push("/user/email/verify-email");
      }, 3000);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <aside className={styles.aside}>
          <div className={styles.aside_div}>
            <h1 className={styles.h1}>Welcome</h1>
            <p className={styles.header_p}>
              Create an account to manage your requests and explore your
              benefits.
            </p>
          </div>
          <article className={styles.article}>
            <p className={styles.header_p}>
              You have an account already?
              <br />
              <Link className={styles.link} href="/user/login">
                Go to Login
              </Link>
            </p>
          </article>
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
          <button className={styles.button} style={{ padding: "0 .5rem" }}>
            Continue with Google{" "}
            <Image
              src="/svg/google.svg"
              alt="Google logo"
              width={35}
              height={35}
            />
          </button>
          <UserContactForm
            value={formData.user} // <-- asegúrate de pasar los valores actuales
             onChange={(updatedUser) => setFormData({ user: updatedUser })}
          />
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

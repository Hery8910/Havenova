"use client";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { validateField } from "../../utils/validators";
import { updateUser } from "../../services/userService";

interface FormData {
  name: string;
  address: string;
  phone: string;
}

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user, refreshUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (!user) {
    return <p>Loading...</p>;
  }
  const toggleEdit = () => setEdit((prev) => !prev);

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
      const response = await updateUser(
        user?.email,
        formData.name,
        formData.address,
        formData.phone
      );

      setMessage(response.message);
      setTimeout(() => setMessage(""), 3000);

      setEdit(false);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <main className={styles.main}>
      {edit && (
        <aside className={`${styles.aside} ${edit ? styles.show : ""}`}>
          <button className={styles.close_button} onClick={toggleEdit}>
            X
          </button>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder={user?.name}
              value={formData.name || user?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onBlur={handleBlur}
              autoComplete="name"
              required
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <input
              className={styles.input}
              type="text"
              name="address"
              placeholder={user?.address}
              value={formData.address || user?.address}
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
              placeholder={user?.phone}
              value={formData.phone || user?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              onBlur={handleBlur}
              autoComplete="phone"
              required
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            {message && <p className={styles.error}>{message}</p>}

            <button type="submit" className={styles.submit_button}>
              Save Changes
            </button>
          </form>
        </aside>
      )}

      <header className={styles.header}>
        <h1 className={styles.h1}>
          <RxAvatar /> Profile
        </h1>
        <p className={styles.header_p}>Here you can manage you account</p>
        {message && <p className={styles.error}>{message}</p>}
      </header>
      <section className={styles.section}>
        <article className={styles.user_article}>
          <div className={styles.user_div}>
            <p className={styles.article_p}>
              <span className={styles.span}>Name:</span> Heriberto Santana
            </p>

            <p className={styles.article_p}>
              <span className={styles.span}>Address:</span> Sarah- Kirsch-str. 5
              , 12629
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Phone:</span> +49 1777312606
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Email:</span>{" "}
              contact@heribertosantana.com
            </p>
          </div>
          <button className={styles.button} onClick={toggleEdit}>
            Edit <RiEdit2Fill />
          </button>
        </article>
        <article className={styles.services_article}>
          <h2 className={styles.h2}>Services</h2>
          <p className={styles.article_p}>
            Aqui van las solicitudes de trabajo
          </p>
        </article>
        {/* <div className={styles.div}>
          <Image
            className={styles.image}
            src="/svg/profile.svg"
            alt="Loading animation"
            width={450}
            height={450}
          />
        </div> */}
      </section>
    </main>
  );
};

export default Profile;

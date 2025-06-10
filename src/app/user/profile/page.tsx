"use client";
import { useUser } from "../../../contexts/UserContext";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { validateField } from "../../../utils/validators";
import { updateUser } from "../../../services/userService";

interface FormData {
  name: string;
  address: string;
  phone: string;
  profileImage: string;
}

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user, refreshUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [message, setMessage] = useState("");

  // Inicializa los datos del formulario al cargar el usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

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
      const value = formData[fieldName];
      if (validateField(fieldName, value)) {
        newErrors[fieldName] = validateField(fieldName, value);
        isValid = false;
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim()) {
      const error = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors in the form.");
      return;
    }
    const updatedData = {
      email: user.email, // el email nunca cambia
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      profileImage: formData.profileImage,
    };
    try {
      const response = await updateUser(updatedData);

      setMessage(response.message);
      setTimeout(() => setMessage(""), 3000);
      setEdit(false);
      refreshUser(); // <- refresca el usuario tras actualizar
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
            <div className={styles.avatar_edit}>
              <Image
                src={formData.profileImage || "/avatars/avatar-1.svg"}
                alt="Profile"
                width={80}
                height={80}
                className={styles.avatar}
              />
              {/* Aquí podrías agregar un input para cambiar o subir nueva foto */}
            </div>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <input
              className={styles.input}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="address"
            />
            {errors.address && <p className={styles.error}>{errors.address}</p>}

            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="Phone +49 123456789"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="phone"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}

            {/* Puedes agregar el input para cambiar imagen aquí */}
            {/* 
            <input
              type="text"
              name="profileImage"
              placeholder="URL imagen perfil"
              value={formData.profileImage}
              onChange={handleChange}
            />
            */}

            {message && <p className={styles.error}>{message}</p>}

            <button type="submit" className={styles.submit_button}>
              Save Changes
            </button>
          </form>
        </aside>
      )}

      <header className={styles.header}>
        <div className={styles.avatar_header}>
          <Image
            src={user.profileImage || "/avatars/avatar-1.svg"}
            alt="Profile"
            width={80}
            height={80}
            className={styles.avatar}
          />
        </div>
        <h1 className={styles.h1}>{user.name}</h1>
        <p className={styles.header_p}>Here you can manage your account</p>
        {message && <p className={styles.error}>{message}</p>}
      </header>
      <section className={styles.section}>
        <article className={`${styles.user_article} card`}>
          <div className={styles.user_div}>
            <p className={styles.article_p}>
              <span className={styles.span}>Name:</span> {user.name}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Address:</span> {user.address}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Phone:</span> {user.phone}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Email:</span> {user.email}
            </p>
            <span>
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button className={styles.button} onClick={toggleEdit}>
            Edit <RiEdit2Fill />
          </button>
        </article>
        <article className={`${styles.user_article} card`}>
          <h2 className={styles.h2}>Services</h2>
          <p className={styles.article_p}>
            Aquí van las solicitudes de trabajo
          </p>
        </article>
      </section>
    </main>
  );
};

export default Profile;

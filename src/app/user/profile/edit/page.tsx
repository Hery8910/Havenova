"use client";

import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { validateField } from "../../../../utils/validators";
import { updateUser } from "../../../../services/userService";
import styles from "./page.module.css";
import Image from "next/image";
import AvatarSelector from "../../../../components/user/avatarSelector/page";
import ImageUpload from "../../../../components/imageUpload/page";
import { TbPointFilled } from "react-icons/tb";
import Input from "../../../../components/blog/input/page";

interface FormData {
  name: string;
  address: string;
  phone: string;
  profileImage: string;
}

export default function Edit() {
  const { user, refreshUser } = useUser();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    profileImage: "",
  });

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

  const handleAvatarSelect = (src: string) => {
    if (typeof src === "string") {
      setFormData((prev) => ({ ...prev, profileImage: src }));
    } else {
      console.log("User uploaded file:", src);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, profileImage: url }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors in the form.");
      return;
    }
    const updatedData = {
      email: user.email,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      profileImage: formData.profileImage,
    };
    try {
      const response = await updateUser(updatedData);

      setMessage(response.message);
      setTimeout(() => setMessage(""), 3000);
      refreshUser();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <article className={styles.header_article}>
          <h3 className={styles.h1}>Edit Profile</h3>
          <p className={styles.header_p}>Edit your profile information.</p>
        </article>
      </header>
      <article className={styles.article}>
        <Image
          src={formData.profileImage}
          alt="Profile"
          width={80}
          height={80}
          className={styles.image}
        />
        <aside className={styles.article_aside}>
          <h3>{user.name}</h3>
          <p className={styles.article_p}>
            Member since: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p
            className={styles.article_p}
            style={
              !user.isVerified ? { color: "#fa4903" } : { color: "#00ad34" }
            }
          >
            {user.isVerified ? "Verified" : "You need to verfied your account"}
            <TbPointFilled />
          </p>
        </aside>
      </article>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="Name">
            Name
          </label>
          <Input
            heading="paragraph"
            value={formData.name}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                name: value,
              }))
            }
            onBlur={(value) =>
              setErrors((errs) => ({
                ...errs,
                name: validateField("name", value),
              }))
            }
            height="20px"
            placeholder="Your name"
          />

          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="Address">
            Address
          </label>
          <Input
            heading="paragraph"
            value={formData.address}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                address: value,
              }))
            }
            onBlur={(value) =>
              setErrors((errs) => ({
                ...errs,
                address: validateField("address", value),
              }))
            }
            height="20px"
            placeholder="Address"
          />

          {errors.address && <p className={styles.error}>{errors.address}</p>}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="Phone Number">
            Phone Number
          </label>
          <Input
            heading="paragraph"
            value={formData.phone}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                phone: value,
              }))
            }
            onBlur={(value) =>
              setErrors((errs) => ({
                ...errs,
                phone: validateField("phone", value),
              }))
            }
            height="20px"
            placeholder="Phone +49 123456789"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="Profile Image">
            Profile Image
          </label>
          <Image
            src={formData.profileImage}
            alt="Profile"
            width={50}
            height={50}
            className={styles.image}
          />
          <AvatarSelector
            current={formData.profileImage}
            onSelect={handleAvatarSelect}
            onUpload={handleImageUpload}
          />
        </div>
        {message && <p className={styles.error}>{message}</p>}
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </section>
  );
}

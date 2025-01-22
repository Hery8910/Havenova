"use client";
import Cookies from "js-cookie";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Profile = () => {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      refreshUser(); // Llama al backend para obtener los datos del usuario
    }
  }, [refreshUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <main className={styles.main}>
        <h1>Profile Page</h1>
        <section className={styles.section}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>

          <div className={styles.div}>
            <Image
              src="/svg/profile.svg"
              alt="Loading animation"
              width={450}
              height={450}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;

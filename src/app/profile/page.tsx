"use client";
import Cookies from "js-cookie";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Profile = () => {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    refreshUser(); 
  }, [refreshUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
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
  );
};

export default Profile;

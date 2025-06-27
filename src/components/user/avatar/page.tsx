"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

import { useUser } from "../../../contexts/UserContext";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const Avatar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLink = () => {
    router.push("/user/profile");
  };

  // ✅ Previene render hasta estar en cliente
  if (!hasMounted || !user || !user.profileImage) return <p>Loading...</p>;
  
  if (!user.isFromBackend || user.role === "guest") {
    return (
      <section className={styles.section}>
        <button
          onClick={handleClick}
          className={`${styles.button} ${isMobile ? styles.mobile : ""}`}
          aria-label="Toggle menu"
        >
          <Image
            className={styles.image}
            src={user.profileImage}
            alt="Profile Image"
            width={40}
            height={40}
          />
          {!isMobile && <p>Register</p>}
        </button>
        {menuOpen && (
          <ul className={styles.ul}>
            <li onClick={handleClick} className={styles.li}>
              <Link className={styles.link} href="/user/register">
                <p>Register</p> <IoIosArrowForward />
              </Link>
            </li>
            <li onClick={handleClick} className={styles.li}>
              <Link className={styles.link} href="/user/login">
                <p>Login</p> <IoIosArrowForward />
              </Link>
            </li>
          </ul>
        )}
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <button
        onClick={handleLink}
        className={`${styles.button} ${isMobile ? styles.mobile : ""}`}
        aria-label="Go to profile"
      >
        <Image
          className={styles.image}
          src={user.profileImage}
          alt="Profile Image"
          width={40}
          height={40}
        />
        {!isMobile &&  <p>{user.name}</p>}
      </button>
    </section>
  );
};

export default Avatar;

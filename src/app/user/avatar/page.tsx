"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
// import { useUser } from "../../../components/contexts/UserContext";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface User {
  name: string;

}
const Avatar = () => {
  const router = useRouter();
//   const { user, setUser } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = {
    name: "Heriberto",
  }

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
    router.push('/user/profile');
  };

  if (!user) {
    return (
      <section className={styles.section}>
        <button
          onClick={handleClick}
          className={`${styles.button}
          ${isMobile ? styles.mobile : null}
          `}
          aria-label="Toggle menu"
        >
          <Image
            src="/svg/user.svg"
            priority={true}
            alt="User icon"
            width={30}
            height={30}
            className={styles.image}
          />
          {!isMobile && <p>Register</p>}
        </button>
        {menuOpen && (
          <ul
            className={styles.ul}
          >
            <li 
            onClick={handleClick}
            className={styles.li}>
              <Link className={styles.link} href="/user/register">
               <p>Register</p>  <IoIosArrowForward />
              </Link>
            </li>
            <li 
            onClick={handleClick}
            className={styles.li}>
              <Link className={styles.link} href="/user/login">
               <p>Login</p>  <IoIosArrowForward />
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
          className={`${styles.button}
          ${isMobile ? styles.mobile : null}
          `}
          aria-label="Toggle menu"
        >
          <Image
            src="/svg/user.svg"
            priority={true}
            alt="User icon"
            width={30}
            height={30}
            className={styles.image}
          />
          {!isMobile && <p>{user.name}</p>}
        </button>
      </section>
  );
};

export default Avatar;

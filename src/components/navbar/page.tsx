"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useUser } from "../../components/contexts/UserContext";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };
  const handleMouseEnter = () => {
    setMenuOpen(true);
  };
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}`}>
        <header className={styles.header}>
          <Link className={styles.logo} href="/">
            <Image
              src="/svg/logo-mobile.svg"
              priority={true}
              alt="Havenova logo"
              width={250}
              height={100}
              className={styles.image}
            />
          </Link>
          <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={styles.icon}
            aria-label="Toggle menu"
          >
            <IoMenu />
          </button>
        </header>
      </div>
      <main
        onMouseLeave={handleMouseLeave}
        className={`${styles.main}
        ${menuOpen ? styles.open : styles.close}
        `}
      >
        <section className={styles.section}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/service/furniture-assembly">Furniture Assembly</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service/kitchen-assembly">Kitchen Assembly</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service/home-service">Home Service</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service/general-cleaning">General Cleaning</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service/kitchen-cleaning">Kitchen Cleaning</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service/windows-cleaning">Windows Cleaning</Link>
            </li>
          </ul>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.li}>
              <Link href="/contact">Contact</Link>
            </li>
            <li className={styles.li}>
              <Link href="/q&a">Q&A</Link>
            </li>
            <li className={styles.li}>
              <Link href="/reviews">Reviews</Link>
            </li>
            <li className={styles.li}>
              <Link href="/Blog">Blog</Link>
            </li>
            <li className={styles.li}>
              <Link href="/service">Our Services</Link>
            </li>
          </ul>
          {!user ? (
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Link href="/user/register">Register</Link>
              </li>
              <li>
                <Link className={styles.li} href="/user/login">
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Link href="/user/profile">Profile</Link>
              </li>
            </ul>
          )}
        </section>
      </main>
    </nav>
  );
}

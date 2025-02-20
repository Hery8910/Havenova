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
      <div
        className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}${
          menuOpen ? styles.wrapper_open : ""
        }`}
      >
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
        <Image
          src="/svg/menu.svg"
          priority={true}
          alt="Berlin illustration"
          width={800}
          height={350}
          className={styles.image}
        />
        <section className={styles.section}>
          <ul className={styles.ul}>
            <li>
              <Link className={styles.link} href="/services/furniture-assembly">
                Furniture Assembly
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/services/kitchen-assembly">
                Kitchen Assembly
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/services/home-service">
                Home Service
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/services/house-cleaning">
                House Cleaning
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/services/kitchen-cleaning">
                Kitchen Cleaning
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/services/windows-cleaning">
                Windows Cleaning
              </Link>
            </li>
          </ul>
          <ul className={styles.ul}>
            <li>
              <Link className={styles.link} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/q&a">
                Q&A
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/reviews">
                Reviews
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/Blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/service">
                Our Services
              </Link>
            </li>
          </ul>
          {!user ? (
            <ul className={styles.ul}>
              <li>
                <Link className={styles.link} href="/user/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/user/login">
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={styles.ul}>
              <li>
                <Link className={styles.link} href="/user/profile">
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </section>
      </main>
    </nav>
  );
}

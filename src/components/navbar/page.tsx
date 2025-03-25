"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useUser } from "../../components/contexts/UserContext";
import Avatar from "../../app/user/avatar/page";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

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

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div
        className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}`}
      >
        <header className={styles.header}>
          <Link className={styles.logo} href="/">
            <picture>
              <source
                className={styles.logo}
                media="(min-width:800px)"
                srcSet="/svg/logo-black.svg"
              />

              <Image
                className={styles.logo}
                src="/svg/logo-black-mobile.svg"
                alt="Havenova Logo"
                width={40}
                height={40}
              />
            </picture>
          </Link>
          <div className={styles.header_div}>
            <Avatar />
            <button
              onClick={handleClick}
              className={styles.icon}
              aria-label="Toggle menu"
            >
              <HiMenuAlt3 />
            </button>
          </div>
        </header>
      </div>
      <main
        onMouseLeave={handleMouseLeave}
        className={`${styles.main}
        ${menuOpen ? styles.open : styles.close}
        `}
      >
        <div>
          <section className={styles.section}>
        {!isMobile && (
          <Image
            src="/svg/menu.svg"
            priority={true}
            alt="Berlin illustration"
            width={400}
            height={250}
            className={styles.main_image}
          />
        )}
            <ul className={styles.ul}>
              <h3 className={styles.h3}>Services</h3>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/furniture-assembly.svg"
                  priority={true}
                  alt="Icon Furniture Assembly"
                  width={25}
                  height={25}
                />
                <Link
                  className={styles.link}
                  href="/services/furniture-assembly"
                >
                  Furniture Assembly
                </Link>
              </li>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/kitchen-assembly.svg"
                  priority={true}
                  alt="Icon Kitchen Assembly"
                  width={25}
                  height={25}
                />
                <Link className={styles.link} href="/services/kitchen-assembly">
                  Kitchen Assembly
                </Link>
              </li>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/home-service.svg"
                  priority={true}
                  alt="Icon home service"
                  width={25}
                  height={25}
                />
                <Link className={styles.link} href="/services/home-service">
                  Home Service
                </Link>
              </li>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/house-cleaning.svg"
                  priority={true}
                  alt="Icon House Cleaning"
                  width={25}
                  height={25}
                />
                <Link className={styles.link} href="/services/house-cleaning">
                  House Cleaning
                </Link>
              </li>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/kitchen-cleaning.svg"
                  priority={true}
                  alt="Icon Kitchen Cleaning"
                  width={25}
                  height={25}
                />
                <Link className={styles.link} href="/services/kitchen-cleaning">
                  Kitchen Cleaning
                </Link>
              </li>
              <li className={styles.li}>
                <Image
                  className={styles.image}
                  src="/svg/windows-cleaning.svg"
                  priority={true}
                  alt="Icon Windows Cleaning"
                  width={25}
                  height={25}
                />
                <Link className={styles.link} href="/services/windows-cleaning">
                  Windows Cleaning
                </Link>
              </li>
            </ul>
            <ul className={styles.ul}>
              <h3 className={styles.h3}>Havenova</h3>
              <li className={styles.li}>
                <Link className={styles.link} href="/about">
                  About
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} href="/contact">
                  Contact
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} href="/q&a">
                  Q&A
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} href="/reviews">
                  Reviews
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} href="/Blog">
                  Blog
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} href="/service">
                  Our Services
                </Link>
              </li>
            </ul>
            {!user ? (
              <ul className={styles.ul}>
                <h3 className={styles.h3}>Profile</h3>
                <li className={styles.li}>
                  <MdAccountCircle />
                  <Link className={styles.link} href="/user/register">
                    Register
                  </Link>
                </li>
                <li className={styles.li}>
                  <IoIosLogIn />
                  <Link className={styles.link} href="/user/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <MdAccountCircle />
                  <Link className={styles.link} href="/user/profile">
                    Profile
                  </Link>
                </li>
              </ul>
            )}
          </section>
        </div>
      </main>
    </nav>
  );
}

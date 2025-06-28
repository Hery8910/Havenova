"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import { useUser } from "../../contexts/UserContext";
import Avatar from "../user/avatar/page";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import ThemeToggler from "../themeToggler/page";
import LanguageSwitcher from "../languageSwitcher/page";

export interface NavItem {
  section: "services" | "havenova" | "profile";
  label: string;
  href: string;
  image?: string;
  alt?: string;
  icon?: React.ReactNode;
  auth?: "guest" | "user";
}

const navItems: NavItem[] = [
  // Sección de Services
  {
    section: "services",
    label: "Furniture Assembly",
    href: "/services/furniture-assembly",
    image: "/svg/furniture-assembly.svg",
    alt: "Icon Furniture Assembly",
  },
  {
    section: "services",
    label: "Kitchen Assembly",
    href: "/services/kitchen-assembly",
    image: "/svg/kitchen-assembly.svg",
    alt: "Icon Kitchen Assembly",
  },
  {
    section: "services",
    label: "Home Service",
    href: "/services/home-service",
    image: "/svg/home-service.svg",
    alt: "Icon home service",
  },
  {
    section: "services",
    label: "House Cleaning",
    href: "/services/house-cleaning",
    image: "/svg/house-cleaning.svg",
    alt: "Icon House Cleaning",
  },
  {
    section: "services",
    label: "Kitchen Cleaning",
    href: "/services/kitchen-cleaning",
    image: "/svg/kitchen-cleaning.svg",
    alt: "Icon Kitchen Cleaning",
  },
  {
    section: "services",
    label: "Windows Cleaning",
    href: "/services/windows-cleaning",
    image: "/svg/windows-cleaning.svg",
    alt: "Icon Windows Cleaning",
  },
  // Sección de Havenova
  { section: "havenova", label: "About", href: "/about" },
  { section: "havenova", label: "Contact", href: "/contact" },
  { section: "havenova", label: "Q&A", href: "/q&a" },
  { section: "havenova", label: "Reviews", href: "/reviews" },
  { section: "havenova", label: "Blog", href: "/blogs" },
  { section: "havenova", label: "Our Services", href: "/services" },
  {
    section: "profile",
    label: "Register",
    href: "/user/register",
    image: "/svg/signin.svg",
    alt: "Sign in Icon",
    auth: "guest",
  },
  {
    section: "profile",
    label: "Login",
    href: "/user/login",
    image: "/svg/user.svg",
    alt: "User Icon",
    auth: "guest",
  },
  // Sección de Profile para usuarios autenticados
  {
    section: "profile",
    label: "Profile",
    href: "/user/profile",
    image: "/svg/user.svg",
    alt: "User Icon",
    auth: "user",
  },
];

export default function Navbar({}) {
  const { user } = useUser();
  const router = useRouter();
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
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };
  const serviceItems = navItems.filter((item) => item.section === "services");
  const havenovaItems = navItems.filter((item) => item.section === "havenova");

  // Se filtran los items de profile en función del estado de autenticación
  const profileItems = navItems.filter(
    (item) =>
      item.section === "profile" &&
      (!item.auth || (user ? item.auth === "user" : item.auth === "guest"))
  );

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}`}>
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
          <LanguageSwitcher />
          <div className={styles.header_div}>
             <ThemeToggler />
            <Avatar />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
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
        className={`${styles.main} ${menuOpen ? styles.open : styles.close}`}
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
              <li
                className={styles.li}
                key="title"
                onClick={() => {
                  router.push('/services');
                  setMenuOpen(false);
                }}
              >
                <h3 className={styles.h3}>Services</h3>
              </li>
              {serviceItems.map((link) => (
                <li
                  className={styles.li}
                  key={link.label}
                  onClick={() => {
                    router.push(`${link.href}`);
                    setMenuOpen(false);
                  }}
                >
                 {link.image && (
                    <Image
                      className={styles.image}
                      src={link.image}
                      priority={true}
                      alt={link.alt || link.label}
                      width={25}
                      height={25}
                    />
                  )}
                  <h4>{link.label}</h4>
                </li>
              ))}
            </ul>
            <ul className={styles.ul}>
            <li
                className={styles.li}
                key="title"
                onClick={() => {
                  router.push('/');
                  setMenuOpen(false);
                }}
              >
                <h3 className={styles.h3}>Havenova</h3>
              </li>
              {havenovaItems.map((link) => (
                <li 
                className={styles.li} 
                key={link.label}
                onClick={() => {
                  router.push(`${link.href}`);
                  setMenuOpen(false);
                }}
                >
                  <h4>
                    {link.label}
                  </h4>
                </li>
              ))}
            </ul>
            <ul className={styles.ul}>
              <h3 className={styles.h3}>Profile</h3>
              {profileItems.map((link) => (
                <li className={styles.li} key={link.label}>
                   {link.image && (
                    <Image
                      className={styles.image}
                      src={link.image}
                      priority={true}
                      alt={link.alt || link.label}
                      width={25}
                      height={25}
                    />
                  )}
                  <h4>
                    {link.label}
                  </h4>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </nav>
  );
}

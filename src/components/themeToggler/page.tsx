"use client";
import { useEffect, useState } from "react";
import { useClient } from "../../contexts/ClientContext";
import { applyBrandingToDOM } from "../../utils/applyBrandingToDOM";
import styles from "./page.module.css";
import { AiOutlineSun } from "react-icons/ai";
import { BsMoonStars } from "react-icons/bs";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<string>("light");
  const { client } = useClient();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial =
      saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initial);
    setTheme(initial);
    if (client?.branding?.[initial]) {
      applyBrandingToDOM(client.branding[initial], client.typography);
    }
  }, [client?.branding, client?.typography]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    if (client?.branding?.[newTheme]) {
      applyBrandingToDOM(client.branding[newTheme], client.typography);
    }
  };

  return (
     <button
      className={`${styles.toggleButton} ${theme === "dark" ? styles.dark : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className={styles.iconsWrapper}>
        <span className={styles.moon}><BsMoonStars /></span>
        <span className={styles.sun}><AiOutlineSun /></span>
      </div>
    </button>
  );
};

export default ThemeToggler;

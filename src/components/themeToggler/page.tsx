"use client";
import { useEffect, useState } from "react";
import { useClient } from "../../contexts/ClientContext";
import { applyBrandingToDOM } from "../../utils/applyBrandingToDOM";
import styles from "./page.module.css";
import { AiOutlineSun } from "react-icons/ai";
import { BsMoonStars } from "react-icons/bs";
import { useUser } from "../../contexts/UserContext";

const ThemeToggler = () => {
  const { user, updateUserTheme } = useUser();
  const { client } = useClient();

  // Usar el theme global del usuario, no local
  const theme = user?.theme || "light";

  useEffect(() => {
    // Cada vez que cambia el theme, actualiza el DOM y branding
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (client?.branding?.[theme]) {
      applyBrandingToDOM(client.branding[theme], client.typography);
    }
  }, [theme, client?.branding, client?.typography]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateUserTheme(newTheme as "light" | "dark");
    // NO SETEES el useState local ni el DOM aquí, eso se hará en el useEffect de arriba al actualizar el contexto
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

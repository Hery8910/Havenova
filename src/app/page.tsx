'use client'
import styles from "./page.module.css";
import Navbar from "../components/navbar/page";
import { useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      refreshUser(); // Llama al backend para obtener los datos del usuario
    }
  }, [refreshUser]);

  return (
    <>
      <nav className={styles.nav}>
        <Navbar />
      </nav>
      <header className={styles.header}>
        <h1>Bienvenido a Nuestro Servicio</h1>
        <p className={styles.p}>Explora nuestros servicios:</p>
      </header>
      <div>
        {user && (
          <>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.address}</p>
          </>
        )}
      </div>
      <main className={styles.main}></main>
    </>
  );
}

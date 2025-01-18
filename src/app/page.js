'use client'
import styles from "./page.module.css";
import Navbar from "../components/navbar/page";
import { useUser } from "../app/contexts/UserContext";

export default function Home() {
  const { user } = useUser();

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

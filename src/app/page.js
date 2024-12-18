import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "../components/navbar/page";

export default function Home() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <h1>Bienvenido a Nuestro Servicio</h1>
        <p className={styles.p}>Explora nuestros servicios:</p>
      </header>
      <main></main>
    </>
  );
}

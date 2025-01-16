import styles from "./page.module.css";
import Navbar from "../components/navbar/page";

export default function Home() {
  
  return (
    <>
      <nav className={styles.nav}>
        <Navbar />
      </nav>
      <header className={styles.header}>
        <h1>Bienvenido a Nuestro Servicio</h1>
        <p className={styles.p}>Explora nuestros servicios:</p>
      </header>
      <main className={styles.main}></main>
    </>
  );
}

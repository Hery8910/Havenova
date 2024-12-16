import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
    <h1>Bienvenido a Nuestro Servicio</h1>
    <p>Explora nuestros servicios:</p>
    <ul>
      <li>
        <Link href="/service/furniture-assembly">Furniture Assembly</Link>
      </li>
      <li>
        <Link href="/service/general-cleaning">General Cleaning</Link>
      </li>
      <li>
        <Link href="/service/home-service">Home Service</Link>
      </li>
      <li>
        <Link href="/service/kitchen-assembly">Kitchen Assembly</Link>
      </li>
      <li>
        <Link href="/service/kitchen-cleaning">Kitchen Cleaning</Link>
      </li>
      <li>
        <Link href="/service/windows-cleaning">Windows Cleaning</Link>
      </li>
    </ul>
  </div>
  );
}

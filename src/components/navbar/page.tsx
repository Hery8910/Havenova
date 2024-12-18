import styles from "./page.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
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
      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}

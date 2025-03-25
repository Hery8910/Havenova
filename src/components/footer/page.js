import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <picture>
            <source
              className={styles.logo}
              media="(min-width:768px)"
              srcSet="/svg/logo-white-vertical.svg"
            />

            <Image
              className={styles.logo}
              src="/svg/logo-white.svg"
              alt="Havenova Logo"
              width={300}
              height={100}
            />
          </picture>
        </Link>
        <ul className={styles.header_ul}>
          <h3 className={styles.h3}>Info</h3>
          <li className={styles.li}>
            <FaMapMarkerAlt />
            <p>Stollberger Str.43, 12627 Berlin</p>
          </li>
          <li className={styles.li}>
            <MdEmail />
            <p>contact@havenova.de</p>
          </li>
          <li className={styles.li}>
            <BsTelephoneFill />
            <p>+49 176 7091 7803</p>
          </li>
          <li className={styles.li}>
            <p>Mo-Fr</p>
            <p>08:00-17:00 Uhr</p>
          </li>
          <li className={styles.li}>
            <p>Sa</p>
            <p>08:00-14:00 Uhr</p>
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        <ul className={styles.ul}>
          <h3 className={styles.h3}>Services</h3>
          <li className={styles.li}>
            <Link href="/service/furniture-assembly">Furniture Assembly</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service/kitchen-assembly">Kitchen Assembly</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service/home-service">Home Service</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service/general-cleaning">General Cleaning</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service/kitchen-cleaning">Kitchen Cleaning</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service/windows-cleaning">Windows Cleaning</Link>
          </li>
        </ul>
        <ul className={styles.ul}>
          <h3 className={styles.h3}>Havenova</h3>
          <li className={styles.li}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.li}>
            <Link href="/contact">Contact</Link>
          </li>
          <li className={styles.li}>
            <Link href="/q&a">Q&A</Link>
          </li>
          <li className={styles.li}>
            <Link href="/reviews">Reviews</Link>
          </li>
          <li className={styles.li}>
            <Link href="/Blog">Blog</Link>
          </li>
          <li className={styles.li}>
            <Link href="/service">Our Services</Link>
          </li>
        </ul>
        <ul className={styles.ul}>
          <h3 className={styles.h3}>Legal</h3>
          <li className={styles.li}>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
          </li>
          <li className={styles.li}>
            <Link href="/legal/cookie-policy">Cookie Policy</Link>
          </li>
          <li className={styles.li}>
            <Link href="/legal/therm-of-service">Therm of Service</Link>
          </li>
        </ul>
      </main>
    </footer>
  );
};

export default Footer;

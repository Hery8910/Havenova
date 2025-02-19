import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Link className={styles.logo} href="/">
            <Image
              src="/svg/logo-footer.svg"
              priority={true}
              alt="Havenova logo"
              width={100}
              height={100}
              className={styles.image}
            />
          </Link>
          <article className={styles.article}>
            <h2 className={styles.h2}>Info</h2>
            <div className={styles.div}>
              <FaMapMarkerAlt />
              <p>Stollberger Str.43, 12627 Berlin</p>
            </div>
            <div className={styles.div}>
              <MdEmail />
              <p>contact@havenova.de</p>
            </div>
            <div className={styles.div}>
              <BsTelephoneFill />
              <p>+49 176 7091 7803</p>
            </div>
            <div className={styles.div}>
              <p>Mo-Fr</p>
              <p>08:00-17:00 Uhr</p>
            </div>
            <div className={styles.div}>
              <p>Sa</p>
              <p>08:00-14:00 Uhr</p>
            </div>
          </article>
        </aside>

        <ul className={styles.ul}>
          <h2 className={styles.h2}>Havenova</h2>
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
          <h2 className={styles.h2}>Services</h2>
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
          <h2 className={styles.h2}>Legal</h2>
          <li className={styles.li}>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
          </li>
          <li className={styles.li} >
            <Link href="/legal/cookie-policy">
              Cookie Policy
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/legal/therm-of-service">
              Therm of Service
            </Link>
          </li>
        </ul>
      </main>
    </footer>
  );
};

export default Footer;

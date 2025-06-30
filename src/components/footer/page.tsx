"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { useI18n } from "../../contexts/I18nContext";

interface ContactItem {
  label: string;
  data: string;
  image: string;
}

interface HavenovaItem {
  label: string;
  href: string;
}
interface ServicesItem {
  label: string;
  href: string;
}
interface LegalItem {
  label: string;
  href: string;
}
interface SocialItem {
  label: string;
  href: string;
}
interface FooterProps {
  contact: ContactItem[];
  havenova: HavenovaItem[];
  services: ServicesItem[];
  legal: LegalItem[];
  social: SocialItem[];
}

const Footer = () => {
  const router = useRouter();
  const { texts } = useI18n();
  const footer: FooterProps = texts.footer;

  // const navItems: NavItem[] = [
  //   // Sección de Services
  //   {
  //     section: "services",
  //     label: "Furniture Assembly",
  //     href: "/services/furniture-assembly",
  //     image: "/svg/furniture-assembly.svg",
  //     alt: "Icon Furniture Assembly",
  //   },
  //   {
  //     section: "services",
  //     label: "Kitchen Assembly",
  //     href: "/services/kitchen-assembly",
  //     image: "/svg/kitchen-assembly.svg",
  //     alt: "Icon Kitchen Assembly",
  //   },
  //   {
  //     section: "services",
  //     label: "Home Service",
  //     href: "/services/home-service",
  //     image: "/svg/home-service.svg",
  //     alt: "Icon home service",
  //   },
  //   {
  //     section: "services",
  //     label: "House Cleaning",
  //     href: "/services/house-cleaning",
  //     image: "/svg/house-cleaning.svg",
  //     alt: "Icon House Cleaning",
  //   },
  //   {
  //     section: "services",
  //     label: "Kitchen Cleaning",
  //     href: "/services/kitchen-cleaning",
  //     image: "/svg/kitchen-cleaning.svg",
  //     alt: "Icon Kitchen Cleaning",
  //   },
  //   {
  //     section: "services",
  //     label: "Windows Cleaning",
  //     href: "/services/windows-cleaning",
  //     image: "/svg/windows-cleaning.svg",
  //     alt: "Icon Windows Cleaning",
  //   },
  //   // Sección de Havenova
  //   { section: "havenova", label: "About", href: "/about" },
  //   { section: "havenova", label: "Contact", href: "/contact" },
  //   { section: "havenova", label: "Q&A", href: "/q&a" },
  //   { section: "havenova", label: "Reviews", href: "/reviews" },
  //   { section: "havenova", label: "Blog", href: "/blog" },
  //   { section: "havenova", label: "Our Services", href: "/service" },
  //   // Sección de Profile para usuarios no autenticados
  //   {
  //     section: "legal",
  //     label: "Register",
  //     href: "/user/register",
  //   },
  //   {
  //     section: "legal",
  //     label: "Login",
  //     href: "/user/login",
  //   },
  //   // Sección de Profile para usuarios autenticados
  //   {
  //     section: "legal",
  //     label: "Profile",
  //     href: "/user/profile",
  //   },
  // ];

  return (
    <footer className={styles.footer}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image
            className={styles.logo}
            src="/svg/logo-white.svg"
            alt="Havenova Logo"
            width={300}
            height={100}
          />
        </Link>
        <ul className={styles.ul}>
          {footer.contact.map((elem, index) => (
            <li key={index} className={styles.li}>
              {elem.image ? (
                <Image
                  className={styles.image}
                  src={elem.image}
                  alt="Icon"
                  width={25}
                  height={25}
                />
              ) : (
                <p>{elem.label}</p>
              )}

              <p>{elem.data}</p>
            </li>
          ))}
        </ul>

        {/* <ul className={styles.header_ul}>
          <li>
            <h3 className={styles.h3}>Info</h3>
          </li>
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
        </ul> */}
      </header>
      <main className={styles.main}>
        <ul className={styles.ul}>
          {footer.havenova.map((elem, index) => (
            <li key={index} className={styles.li}>
              <Link href={elem.href}>{elem.label}</Link>
            </li>
          ))}
        </ul>
        {/* <ul className={styles.ul}>
          <li>
            <h3 className={styles.h3}>Services</h3>
          </li>
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
        </ul> */}
        <ul className={styles.ul}>
          {footer.services.map((elem, index) => (
            <li key={index} className={styles.li}>
              <Link href={elem.href}>{elem.label}</Link>
            </li>
          ))}
        </ul>
        {/* <ul className={styles.ul}>
          <li>
            <h3 className={styles.h3}>Havenova</h3>
          </li>
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
        </ul> */}
        <ul className={styles.ul}>
          {footer.legal.map((elem, index) => (
            <li key={index} className={styles.li}>
              <Link href={elem.href}>{elem.label}</Link>
            </li>
          ))}
        </ul>
        {/* <ul className={styles.ul}>
          <li>
            <h3 className={styles.h3}>Legal</h3>
          </li>
          <li className={styles.li}>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
          </li>
          <li className={styles.li}>
            <Link href="/legal/cookie-policy">Cookie Policy</Link>
          </li>
          <li className={styles.li}>
            <Link href="/legal/therm-of-service">Therm of Service</Link>
          </li>
        </ul> */}
      </main>
    </footer>
  );
};

export default Footer;

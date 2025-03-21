import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const Hero = ({ title, description, image, cta, href }) => {
  return (
    <section className={`${styles.section} section`}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <p className={styles.p}>{description}</p>
        <Link href={href} className="button">
            {cta} <IoIosArrowForward />
        </Link>
      </header>
      <aside className={styles.aside}>
        <Image
          className={styles.image}
          src={image.src}
          priority={true}
          alt={image.alt}
          width={550}
          height={550}
        />
      </aside>
    </section>
  );
};

export default Hero;

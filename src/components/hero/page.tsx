import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

interface HeroProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  cta: string;
  href: string;
  extraClass?: string; // ⬅️ clase extra opcional
}

const Hero: React.FC<{ hero: HeroProps }> = ({ hero }) => {
  return (
    <section className={hero.extraClass ? styles[hero.extraClass] : styles.section}>
    <header className={hero.extraClass ? styles[`${hero.extraClass}_header`] : styles.header}>
      <h1 className={hero.extraClass ? styles[`${hero.extraClass}_h1`] : styles.h1}>{hero.title}</h1>
      <p className={styles.p}>{hero.description}</p>
      {hero.cta && (
        <Link href={hero.href} className="button">
          {hero.cta} <IoIosArrowForward />
        </Link>
      )}
    </header>

    <aside className={hero.extraClass ? styles[`${hero.extraClass}_aside`] : styles.aside}>
      <Image
        className={hero.extraClass ? styles[`${hero.extraClass}_image`] : styles.image}
        src={hero.image.src}
        priority
        alt={hero.image.alt}
        width={550}
        height={550}
      />
    </aside>
  </section>
  );
};

export default Hero;

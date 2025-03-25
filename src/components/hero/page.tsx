import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

interface HeroProps {
 hero: { 
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  cta: string;
  href: string;}
}
interface Hero {
  hero: HeroProps
}



const Hero = ({ hero }: HeroProps) => {
  return (
    <section className={`${styles.section} section`}>
      <header className={styles.header}>
        <h1>{hero.title}</h1>
        <p className={styles.p}>{hero.description}</p>
        {hero.cta && <Link href={hero.href} className="button">
          {hero.cta} <IoIosArrowForward />
        </Link>}
      </header>
      <aside className={styles.aside}>
        <Image
          className={styles.image}
          src={hero.image.src}
          priority={true}
          alt={hero.image.alt}
          width={550}
          height={550}
        />
      </aside>
    </section>
  );
};

export default Hero;

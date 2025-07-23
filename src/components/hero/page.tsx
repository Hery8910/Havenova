import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { useI18n } from "../../contexts/I18nContext";

export interface HeroData {
  headline1: string;
  headline2: string;
  subtitle: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
}
const Hero: React.FC = () => {
  const { texts } = useI18n();
  const hero: HeroData | undefined = texts?.pages?.home?.hero;

    if (!hero) {
    return (
      <section className={styles.section}>
        <div className={styles.skeleton} style={{ width: "100%", height: 504, background: "#eee" }} />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <Image
        className={styles.image}
        src={hero.image.src}
        priority
        alt={hero.image.alt}
        width={1500}
        height={800}
      />
      <header className={styles.header}>
        <h1 className={styles.h1}>{hero.headline1}</h1>
        <h2 className={styles.h2}>{hero.headline2}</h2>
        <h4 className={styles.h4}>{hero.subtitle}</h4>
        <Link href={hero.cta.href} className="button">
          {hero.cta.label}
        </Link>
      </header>
    </section>
  );
};

export default Hero;

import Link from 'next/link';
import styles from './page.module.css';

export interface HomeHeroProps {
  headline1: string;
  headline2: string;
  subtitle: string;
  cta: { label: string; href: string };
  image: {
    lg: { src: string; alt: string };
    md: { src: string };
    sm: { src: string };
  };
}

const HomeHero: React.FC<HomeHeroProps> = ({ headline1, headline2, subtitle, cta, image }) => {
  return (
    <section className={styles.section}>
      <picture>
        <source srcSet={image.sm.src} media="(max-width: 480px)" type="image/webp" />
        <source srcSet={image.md.src} media="(max-width: 1024px)" type="image/webp" />
        <img
          src={image.lg.src}
          alt={image.lg.alt}
          className={styles.backgroundImage}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <div className={styles.div}>
            <h1 className={styles.h1}>{headline1}</h1>
            <h1 className={styles.h1}>{headline2}</h1>
          </div>
          <p className={styles.p}>&</p>
        </aside>
        <p className={styles.description}>{subtitle}</p>
        <Link href={cta.href} className="button">
          {cta.label}
        </Link>
      </main>
    </section>
  );
};

export default HomeHero;

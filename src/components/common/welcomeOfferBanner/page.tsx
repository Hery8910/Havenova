import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export interface OfferBannerContent {
  header: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: {
    lg: { src: string; alt: string };
    md: { src: string };
  };
}

const WelcomeOfferBanner: React.FC<OfferBannerContent> = ({ header, description, cta, image }) => {
  return (
    <section className={styles.section}>
      <picture>
        <source srcSet={image.md.src} media="(max-width: 1024px)" type="image/webp" />
        <img
          src={image.lg.src}
          alt={image.lg.alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <main className={styles.main}>
        <h2>{header}</h2>
        <p className={styles.p}>{description}</p>
        <Link href={cta.href} className="button">
          {cta.label}
        </Link>
      </main>
    </section>
  );
};

export default WelcomeOfferBanner;

// src/components/WorkFlow.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export interface HowItWorksStep {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface HowItWorksData {
  title: string;
  subtitle: string;
  description: string;
  steps: HowItWorksStep[];
  cta: {
    label: string;
    href: string;
  };
}

const HowItWorks: React.FC<HowItWorksData> = ({ title, subtitle, description, steps, cta }) => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </header>
      <ul className={styles.ul}>
        {steps.map((step) => (
          <li className={styles.li} key={step.title}>
            <Image
              className={styles.image}
              src={step.image.src}
              alt={step.image.alt}
              width={350}
              height={200}
              loading="lazy"
              decoding="async"
            />
            <article className={`${styles.article} card`}>
              <h4 className={styles.h4}>{step.title}</h4>
              <p>{step.description}</p>
            </article>
          </li>
        ))}
      </ul>
      <p className={styles.p}>{description}</p>
      <Link href={cta.href} className="button">
        {cta.label}
      </Link>
    </section>
  );
};

export default HowItWorks;

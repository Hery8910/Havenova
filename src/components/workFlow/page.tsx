// src/components/WorkFlow.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { useI18n } from '../../contexts/I18nContext';

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

const WorkFlow: React.FC = () => {
  const { texts } = useI18n();
  const howItWorks: HowItWorksData | undefined = texts?.pages?.home?.howItWorks;

  if (!howItWorks) {
    return (
      <section className={styles.section}>
        <div
          className={styles.skeleton}
          style={{ width: '100%', height: 504, background: '#eee' }}
        />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>{howItWorks.title}</h2>
      <h3 className={styles.h3}>{howItWorks.subtitle}</h3>
      <ul className={styles.ul}>
        {howItWorks.steps.map((step) => (
          <li className={styles.li} key={step.title}>
            <Image
              className={styles.image}
              src={step.image.src}
              alt={step.image.alt}
              width={450}
              height={300}
            />
            <article className={`${styles.article} card`}>
              <h4 className={styles.h4}>{step.title}</h4>
              <p>{step.description}</p>
            </article>
          </li>
        ))}
      </ul>
      <p className={styles.p}>{howItWorks.description}</p>
      <Link href={howItWorks.cta.href} className="button">
        {howItWorks.cta.label}
      </Link>
    </section>
  );
};

export default WorkFlow;

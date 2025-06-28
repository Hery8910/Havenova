// src/components/WorkFlow.tsx
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useI18n } from "../../contexts/I18nContext";

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
  const howItWorks: HowItWorksData = texts.home.howItWorks;

  return (
    <section className={styles.section}>
      <main className={styles.main}>
        <h2>{howItWorks.title}</h2>
        <h3>{howItWorks.subtitle}</h3>
        <p>{howItWorks.description}</p>
        <ul className={styles.steps}>
          {howItWorks.steps.map((step, idx) => (
            <li className={styles.step} key={step.title}>
              <Image
                src={step.image.src}
                alt={step.image.alt}
                width={120}
                height={120}
                className={styles.stepImage}
              />
              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href={howItWorks.cta.href} className={styles.cta}>
          {howItWorks.cta.label}
        </Link>
      </main>
    </section>
  );
};

export default WorkFlow;

"use client";
import styles from "./page.module.css";
import { useI18n } from "../../contexts/I18nContext";

import Image from "next/image";

export interface BenefitsItems {
  title: string;
  description: string;
}

export interface BenefitsData {
  title: string;
  items: BenefitsItems[];
  image: {src: string, alt: string}
}

const Benefits: React.FC = () => {
  const { texts } = useI18n();
  const benefits: BenefitsData | undefined = texts?.pages?.home?.benefits;

     if (!benefits) {
    return (
      <section className={styles.section}>
        <div className={styles.skeleton} style={{ width: "100%", height: 504, background: "#eee" }} />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{benefits.title}</h2>
      </header>
      <main className={styles.main}>
        <ul className={styles.ul}>
          {benefits.items.map(
            (item: { title: string; description: string }, idx: number) => {
              return (
                <li 
                 className={styles.li}
                key={idx}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              );
            }
          )}
        </ul>
        <Image
          className={styles.image}
          src={benefits.image.src}
          priority
          alt={benefits.image.alt}
          width={650}
          height={450}
        />
        <div className={styles.div}></div>
      </main>
    </section>
  );
};

export default Benefits;

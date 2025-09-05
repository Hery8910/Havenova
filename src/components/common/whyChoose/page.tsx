'use client';
import styles from './page.module.css';
import { useI18n } from '../../../contexts/I18nContext';

import Image from 'next/image';
import { useUser } from '../../../contexts/UserContext';
import { useEffect, useState } from 'react';

export interface WhyChooseItems {
  title: string;
  image: { src: string; alt: string };
}

export interface WhyChoose {
  title: string;
  description: string;
  points: WhyChooseItems[];
}

const WhyChoose: React.FC = () => {
  const { texts } = useI18n();
  const whyChoose: WhyChoose = texts?.components?.whyChoose;

  if (!whyChoose) {
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
      <header className={styles.header}>
        <h2>{whyChoose.title}</h2>
        <p>{whyChoose.description}</p>
      </header>
      <ul className={styles.ul}>
        {whyChoose.points.map((point) => {
          return (
            <li className={styles.li} key={point.title}>
              <Image
                className={styles.li_image}
                src={point.image.src}
                priority={true}
                alt={point.image.alt}
                width={70}
                height={70}
              />
              <p className={styles.li_p}>{point.title}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default WhyChoose;

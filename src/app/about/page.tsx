'use client';
import React from 'react';
import styles from './page.module.css';
import { AboutPageTexts } from '../../types/pages/about';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '../../contexts/I18nContext';
import Values from '../../components/common/values/page';
import WhyChoose from '../../components/common/whyChoose/page';
import Service from '../../components/common/servicePreview/page';
import Reviews from '../../components/common/testimonials/testimonialsPreview/page';

interface Props {
  texts: AboutPageTexts;
}

const AboutPage: React.FC<Props> = () => {
  const { texts } = useI18n();
  const { hero, story, finalCta }: AboutPageTexts = texts.pages.about;

  return (
    <main className={styles.container}>
      {/* AboutHero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>{hero.headline1}</h1>
          <h3>{hero.headline2}</h3>
          <p>
            <strong>{hero.subtitle}</strong>
          </p>
        </div>
      </section>

      {/* AboutStory */}
      <section className={styles.story}>
        <h3 className={styles.h3}>{story.title}</h3>
        {story.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </section>

      {/* Values */}
      <Values />

      {/* AboutDifferentiators */}
      <WhyChoose />

      {/* Servicios */}
      <Service />

      {/* Testimonios */}
      <Reviews />

      {/* Blog */}
    </main>
  );
};

export default AboutPage;

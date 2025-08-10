'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useI18n } from "../../contexts/I18nContext";

export interface ReviewsItems {
  text: string;
  author: string;
  profileImage: {
    src: string;
    alt: string;
  };
  starImage: {
    src: string;
    alt: string;
  };
}
export interface ReviewsData {
  title: string;
  subTitle: string;
  description: string;
  items: ReviewsItems[];
  cta: { label: string; href: string };
}

const Reviews = () => {
  const { texts } = useI18n();
  
  const testimonials: ReviewsData = texts?.pages?.home?.testimonials;
       if (!testimonials) {
    return (
      <section className={styles.section}>
        <div className={styles.skeleton} style={{ width: "100%", height: 504, background: "#eee" }} />
      </section>
    );
  }
  

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{testimonials.title}</h2>
        <h2 className={styles.h2}>{testimonials.subTitle}</h2>
        <p className={styles.p}>{testimonials.description}</p>
        <Link href={testimonials.cta.href} className='button'>
          {testimonials.cta.label}
        </Link>
      </header>

      <ul className={styles.ul}>
        {testimonials.items.map((item, idx) => (
          <li className={styles.li} key={idx}>
            <div className={`${styles.div} card`}>
              <Image
                className={styles.image}
                src={item.starImage.src}
                alt={item.starImage.alt}
                width={150}
                height={50}
              />
              <p>{item.text}</p>
            </div>
            <div className={`${styles.profil} card`}>
              <Image
                className={styles.profileImage}
                src={item.profileImage.src}
                alt={item.profileImage.alt}
                width={50}
                height={50}
              />
              <h4>{item.author}</h4>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;

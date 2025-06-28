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
  const testimonials: ReviewsData = texts.home.testimonials;
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.h2}>{testimonials.title}</h2>
        <h2 className={styles.h2}>{testimonials.subTitle}</h2>
        <p>{testimonials.description}</p>
            <Link href={testimonials.cta.href} className={styles.cta}>
          {testimonials.cta.label}
        </Link>
      </header>

      <ul className={styles.steps}>
        {testimonials.items.map((item, idx) => (
          <li className={styles.step} key={idx}>
            <div>
              <Image
                src={item.profileImage.src}
                alt={item.profileImage.alt}
                width={120}
                height={120}
                className={styles.stepImage}
              />
              <p></p>
            </div>
            <div>
              <Image
                src={item.starImage.src}
                alt={item.starImage.alt}
                width={120}
                height={120}
                className={styles.stepImage}
              />
              <p></p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;

import styles from "./page.module.css";
import { useI18n } from "../../contexts/I18nContext";
import Image from "next/image";

export interface ServicesItems {
  title: string;
  image: {
    src: string;
    alt: string;
  };
}
export interface ServicesData {
  title: string;
  items: ServicesItems[];
  cta: { label: string; href: string };
}

const Services = () => {
  const { texts } = useI18n();
const services: ServicesData = texts.home.services;
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.h2}>{services.title}</h2>
      </header>

   <ul className={styles.steps}>
          {services.items.map((item, idx) => (
            <li className={styles.step} key={idx}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={120}
                height={120}
                className={styles.stepImage}
              />
              <div>
                <h4>{item.title}</h4>
              </div>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default Services;

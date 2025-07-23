import styles from "./page.module.css";
import { useI18n } from "../../contexts/I18nContext";
import Image from "next/image";
import Link from "next/link";

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

const Service = () => {
  const { texts } = useI18n();
  const services: ServicesData | undefined = texts?.pages?.home?.services;
  
      if (!services) {
    return (
      <section className={styles.section}>
        <div className={styles.skeleton} style={{ width: "100%", height: 504, background: "#eee" }} />
      </section>
    );
  }
  
  
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>{services.title}</h2>
      <ul className={styles.ul}>
        {services.items.map((item, idx) => (
          <li className={styles.li} key={idx}>
            <Image
              className={styles.image}
              src={item.image.src}
              alt={item.image.alt}
              width={120}
              height={120}
            />
            <div>
              <h4>{item.title}</h4>
            </div>
          </li>
        ))}
      </ul>
      <Link href={services.cta.href} className="button">
        {services.cta.label}
      </Link>
    </section>
  );
};

export default Service;

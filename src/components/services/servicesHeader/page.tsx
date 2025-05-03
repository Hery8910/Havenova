import styles from "./page.module.css";
import Image from "next/image";

interface ServicesHeaderProps {
  serviceHeader: { 
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  }
}
interface ServicesHeader {
  servicesHeader: ServicesHeaderProps
}



const ServicesHeader = ({ serviceHeader }: ServicesHeaderProps) => {
  return (
    <section className={`${styles.section} section`}>
      <header className={styles.header}>
        <h1>{serviceHeader.title}</h1>
        <p className={styles.p}>{serviceHeader.description}</p>
      </header>
      <aside className={styles.aside}>
        <Image
          className={styles.image}
          src={serviceHeader.image.src}
          priority={true}
          alt={serviceHeader.image.alt}
          width={550}
          height={550}
        />
      </aside>
    </section>
  );
};

export default ServicesHeader;

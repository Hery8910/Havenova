import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { useClient } from "../../contexts/ClientContext";

const Hero: React.FC = () => {
  const { client, loading } = useClient();
  if (loading || !client) return <p>loading...</p>;
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.h1}>{client.texts.en.hero.headline1}</h1>
        <h2 className={styles.h2}>{client.texts.en.hero.headline2}</h2>
        <h4 className={styles.h4}>{client.texts.en.hero.subtitle}</h4>
        <Link href={client.texts.en.hero.cta.href} className="button">
          {client.texts.en.hero.cta.label}
        </Link>
      </header>

      <Image
        className={styles.image}
        src={client.texts.en.hero.image}
        priority
        alt={client.texts.en}
        width={1500}
        height={504}
      />
    </section>
  );
};

export default Hero;

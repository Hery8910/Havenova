"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Card from "../card/page";
import { IoIosArrowForward } from "react-icons/io";
import { useClient } from "../../contexts/ClientContext";
import Image from "next/image";

const Benefits: React.FC = () => {
  const { client, loading } = useClient();
  if (loading || !client) return <p>loading...</p>;

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{client.texts.en.benefits.title}</h2>
      </header>
      <main>
        <ul>
          {client.texts.en.benefits.items.map(
            (item: { title: string; description: string }, idx: number) => {
              return (<li key={idx}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>);
            }
          )}
        </ul>
        <Image
          className={styles.image}
          src={client.texts.en.benefits.image}
          priority
          alt={client.texts.en.benefits.alt}
          width={500}
          height={504}
        />
      </main>
    </section>
  );
};

export default Benefits;

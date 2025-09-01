'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Opcional para estilos
import { useI18n } from '../../contexts/I18nContext';
import { IoClose } from 'react-icons/io5';
import { useUser } from '../../contexts/UserContext';

export interface OfferBannerContent {
  header: string;
  description: string;
  cta: string;
  close: string;
}

export default function WelcomeOfferBanner() {
  const { user } = useUser();
  const { texts } = useI18n();
  const offer: OfferBannerContent = texts?.components?.welcomeOffer;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  if (user?.role !== 'guest') return null;

  return (
    <section className={`${styles.section} card`}>
      <button onClick={() => setVisible(false)} className={styles.close}>
        <IoClose />
      </button>

      <main className={styles.main}>
        <h3 className={styles.h3}>{offer.header}</h3>
        <p className={styles.p}>{offer.description}</p>
        <Link href="/user/register" className="button">
          {offer.cta}
        </Link>
      </main>
    </section>
  );
}

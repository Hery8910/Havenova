import React from 'react';
import styles from './page.module.css';

const SkeletonWelcomeOfferBanner: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.skeletonCard}`}>
      <div className={`${styles.image} ${styles.skeletonBlock}`} />
      <main className={styles.main}>
        <div className={`${styles.skeletonText} ${styles.skeletonBlock}`} />
        <div className={`${styles.skeletonTextSm} ${styles.skeletonBlock}`} />
        <div className={`${styles.skeletonTextSm} ${styles.skeletonBlock}`} />
        <div className={`${styles.skeletonButton} ${styles.skeletonBlock}`} />
      </main>
    </section>
  );
};

export default SkeletonWelcomeOfferBanner;

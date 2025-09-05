import styles from './page.module.css';

const HomeHeroSkeleton = () => {
  return (
    <section className={styles.section}>
      <div className={styles.fakeBackground} />
      <main className={styles.main}>
        <aside className={styles.aside}>
          <div className={styles.div}>
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
          </div>
          <div className={styles.skeletonCircle} />
        </aside>
        <div className={styles.skeletonSubtitle} />
        <div className={styles.skeletonButton} />
      </main>
    </section>
  );
};

export default HomeHeroSkeleton;

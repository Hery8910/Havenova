"use client";

import styles from "./page.module.css";


const OffersCard = () => {
 
 
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <article className={`${styles.user_article} card`}>
          <div className={styles.user_div}>
            <p className={styles.article_p}>
              <span className={styles.span}>Name:</span> 
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Address:</span> 
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Phone:</span> 
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Email:</span> 
            </p>
            
          </div>
        
        </article>
 
      </section>
    </main>
  );
};

export default OffersCard;

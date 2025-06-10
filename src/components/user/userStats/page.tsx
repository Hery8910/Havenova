"use client";
import { useUser } from "../../../contexts/UserContext";

import styles from "./page.module.css";


const UserStats = () => {
  const { user} = useUser();
 
 
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <article className={`${styles.user_article} card`}>
          <div className={styles.user_div}>
            <p className={styles.article_p}>
              <span className={styles.span}>Name:</span> {user.name}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Address:</span> {user.address}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Phone:</span> {user.phone}
            </p>
            <p className={styles.article_p}>
              <span className={styles.span}>Email:</span> {user.email}
            </p>
            <span>
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        
        </article>
 
      </section>
    </main>
  );
};

export default UserStats;

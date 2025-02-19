import Link from "next/link";
import styles from "./page.module.css";

const Hero = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>
        Reliable Home Services,
        <br /> Just One Click Away
      </h1>
      <p className={styles.p}>
        Professional and tailored handyman services to meet your needs. Get
        started today and enjoy a 10% discount on your first order.
      </p>
      <Link href="/user/register" className={styles.button}>
        Register & Save 10%
      </Link>
    </section>
  );
};

export default Hero;

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Benefits = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.h2}>Why Choose Havenova?</h2>
        <h3 className={styles.header_h3}>Experience Quality & Reliability</h3>
      </header>
      <main className={styles.main}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Image
              src="/svg/tool-box.svg"
              priority={true}
              alt="Young male builder in blue overalls"
              width={75}
              height={75}
            />
            <div className={styles.div}>
              <h3 className={styles.h3}>Professional & Skilled Experts</h3>
              <p className={styles.p}>
                Our team consists of experienced professionals committed to
                delivering top-quality service.
              </p>
            </div>
          </li>
          <li className={styles.li}>
            <Image
              src="/svg/solution.svg"
              priority={true}
              alt="Young male builder in blue overalls"
              width={75}
              height={75}
            />
            <div className={styles.div}>
              <h3 className={styles.h3}>Custom Solutions for Every Job</h3>
              <p className={styles.p}>
                We tailor our services to your specific needs, ensuring the best
                results
              </p>
            </div>
          </li>
        </ul>
        <Image
          src="/images/benefits.webp"
          priority={true}
          alt="Young male builder in blue overalls"
          width={450}
          height={450}
          className={styles.image}
        />
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Image
              src="/svg/on-time.svg"
              priority={true}
              alt="Young male builder in blue overalls"
              width={75}
              height={75}
            />
            <div className={styles.div}>
              <h3 className={styles.h3}>Reliable & On-Time Service</h3>
              <p className={styles.p}>
                We value your time, our team ensures punctuality and efficiency
                in every project.
              </p>
            </div>
          </li>
          <li className={styles.li}>
            <Image
              src="/svg/rating.svg"
              priority={true}
              alt="Young male builder in blue overalls"
              width={75}
              height={75}
            />
            <div className={styles.div}>
              <h3 className={styles.h3}>Satisfaction Guaranteed</h3>
              <p className={styles.p}>
                Your happiness is our priority, if you’re not satisfied, we’ll
                make it right!
              </p>
            </div>
          </li>
        </ul>
      </main>
      <article className={styles.article}>
        <h3 className={styles.article_h3}>Learn More About Our Services</h3>
        <Link href="/about" className={styles.button}>
          About Us <IoIosArrowForward />

        </Link>
      </article>
    </section>
  );
};

export default Benefits;

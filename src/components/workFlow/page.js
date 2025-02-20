import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";



const WorkFlow = () => {
  return (
    <section className={styles.section}>
      <article className={styles.article}>
      <h2 className={styles.h2}>How Havenova Works</h2>
      <h3 className={styles.h3}>Seamless, Transparent, and Reliable</h3>
      <p className={styles.p}>
        At Havenova, we make booking a handyman service simple and stress-free.
        First, choose the service you need and select a preferred date for an
        on-site visit. One of our skilled professionals will assess your
        project’s requirements and provide a detailed quote—this can also be
        sent to your email for convenience. Once the service is completed,
        payment can be made securely online through our application or in cash,
        giving you full flexibility and control.
      </p>
      <Link href="/user/register" className={styles.button}>
      Explore Our Services <IoIosArrowForward />

      </Link>
      </article>
      <Image
              src="/images/workflow.webp"
              priority={true}
              alt="Young male builder in blue overalls"
              width={1000}
              height={667}
              className={styles.image}
            />
    </section>
  );
};

export default WorkFlow;

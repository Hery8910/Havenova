import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const Service = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.h2}>Services</h2>
        <p className={styles.header_p}>Discover Our Range of Professional Home Services.</p>
      </header>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/furniture-assembly">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
              Furniture Assembly <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/kitchen-assembly">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
              Kitchen Assembly <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/home-service">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
              Home Service <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/house-cleaning">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
                House Cleaning <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/kitchen-cleaning">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
              Kitchen Cleaning <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href="/service/windows-cleaning">
            <span className={styles.span}>
              <Image
                src="/svg/menu.svg"
                priority={true}
                alt="Berlin illustration"
                width={800}
                height={350}
                className={styles.image}
              />
              <p className={styles.p}>
                Windows Cleaning <IoIosArrowForward />
              </p>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Service;

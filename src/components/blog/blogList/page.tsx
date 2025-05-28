'use client'
import BlogCard from "../blogCard/page";
import Modal from "../../modal/page";
import { IframeProps } from "../../../types/blog";
import { BlogPost } from "../../../types/blog";
import styles from "./page.module.css";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

interface BlogListProps {
  blogs: BlogPost[];
}

export default function BlogList({ blogs }: BlogListProps) {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(320);
  const [showButtons, setShowButtons] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const iframeData: IframeProps = {
    width: "100%",
    height: 550,
    src: "https://sibforms.com/serve/MUIFAILMIV6v82u2k4aVB7f9zDVMFNkZTeu-u3GBK9woRLWSxxDDeKkGhQLNpoNf1LVHitqWTKBudhV_4KS_glkM_9NnuZFiAstmH67QrbiMn_1iL-2_siFUpViUuQkqZuwqJpArmczMcrKHAus36bTvTFHwdAvgnEdM7YwM5JMU4siLiffyM6EnjCU576aeeeTEPNU3jgrtcX1y",
    frameBorder: 0,
    scrolling: "auto",
    allowFullScreen: true,
    style: { display: "block", margin: "0 auto", maxWidth: "100%" },
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    windowWidth > 800 ? setShowButtons(true) : setShowButtons(false);
  }, [windowWidth]);

  const scrollLeft = () => {
    if (ulRef.current) {
      ulRef.current.scrollBy({ left: -620, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ulRef.current) {
      ulRef.current.scrollBy({ left: 620, behavior: "smooth" });
    }
  };
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <Image
          className={styles.image}
          src="/images/header-blog.webp"
          priority={true}
          alt="Coffee break concept illustration"
          width={250}
          height={250}
        />
        <div className={styles.div}>
          <h2>Havenova Blog</h2>
          <p>
            Stay Informed: Tips, Guides, and Updates for Your Home Subscribe to
            Our Newsletter and Never Miss a Home Tip!
          </p>
          <button className="button" onClick={() => setShowModal(true)}>
            Subscribe to Newsletter
          </button>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            iframeProps={iframeData}
          />

          <p className="quote">
            * Receive exclusive articles, seasonal maintenance checklists, and
            special offers directly to your inbox.
          </p>
        </div>
      </header>
      <article className={styles.article}>
        {showButtons && (
          <aside className={styles.aside}>
            <button className={styles.button} onClick={scrollLeft}>
              <IoIosArrowBack />
            </button>
            <button className={styles.button} onClick={scrollRight}>
              <IoIosArrowForward />
            </button>
          </aside>
        )}
        <ul className={styles.ul} ref={ulRef}>
          {blogs.map((blog) => (
            <li className={styles.li} key={blog._id}>
              <BlogCard key={blog._id} blog={blog} canDelete/>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

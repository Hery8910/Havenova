import Link from "next/link";
import { BlogPost } from "../../../types/blog";
import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowForward } from "react-icons/io";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  
  return (
    <section className={styles.section} key={blog.id}>
      <Image
        className={styles.image}
        src={blog.image}
        priority={true}
        alt={blog.imageAlt || "Image"}
        width={200}
        height={200}
      />
      <article className={`${styles.article} card`}>
        <h3>{blog.title}</h3>
        <p>{blog.metaDescription}</p>
        <Link className={styles.link} href={`/blog/${blog.slug}`}>
          Read more <IoIosArrowForward />
        </Link>
      </article>
    </section>
  );
}

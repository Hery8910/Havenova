"use client";

import { BlogPost } from "../../../types/blog";
import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  blog: BlogPost;
  isPreview?: boolean;
}

export default function BlogCard({ blog, isPreview}: BlogCardProps) {
  const router = useRouter();


  const handleClick = () => {
    router.push(`/blogs/${blog.slug}`);
  };

  return (
    <section onClick={handleClick} className={styles.section}>
      <Image
        className={styles.image}
        src={blog.featuredImage || '/images/blog-image-mock.webp'}
        priority={true}
        alt={blog.title || "Image"}
        width={500}
        height={236}
      />
      <main className={styles.main}>
        <h3 className={styles.h3}>{blog.title || "The title will appear as the main headline of your blog post."}</h3>
        <p>{blog.introduction || "A short summary of your blog post. This description helps readers and search engines quickly understand the main topic of your article. It should be concise and engaging, usually between 60 and 160 characters."}</p>
       {!isPreview && <p className={styles.link}>
          More <IoIosArrowForward />
        </p>}
      </main>
    </section>
  );
}

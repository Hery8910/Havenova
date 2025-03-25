import Link from "next/link";
import { BlogPost } from "../../../types/blog";
import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";


interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
   const router = useRouter();
  
    const handleClick = () => {
      router.push(`/blog/${blog.slug}`);
    };

  return (
    <section 
    onClick={handleClick}
    className={styles.section} 
    key={blog.id}>
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
        <p className={styles.link}>
          Read more <IoIosArrowForward />
        </p>
      </article>
    </section>
  );
}

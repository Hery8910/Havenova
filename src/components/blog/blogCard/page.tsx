"use client";

import { BlogFromDB } from "../../../types/blog";
import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import attentionAnimation from "../../../../public/animation/attention.json";

import { useState } from "react";
import ConfirmationAlert from "../../confirmationAlert/page";
import { deleteBlogById } from "../../../services/blogServices";

interface BlogCardProps {
  blog: BlogFromDB;
  canDelete?: boolean;
  onDelete?: (blog: BlogFromDB) => void;
}

export default function BlogCard({ blog, canDelete, onDelete }: BlogCardProps) {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Are you sure you want to delete this blog?");


  const handleClick = () => {
    router.push(`/blogs/${blog.slug}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Para que no navegue al blog al hacer click en borrar
    setAlertOpen(true);
  };

  return (
    <>
      <section onClick={handleClick} className={styles.section} key={blog._id}>
        <Image
          className={styles.image}
          src={blog.featuredImage}
          priority={true}
          alt={blog.title || "Image"}
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

        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteButton} // Puedes agregar estilos
          >
            Delete Blog
          </button>
        )}
      </section>
      {alertOpen && (
        <ConfirmationAlert
        title={message}
        message={message !== "Blog Deleted!" ? "This action cannot be undone." : ""} 
        animationData={attentionAnimation}
        confirmLabel="Yes, delete"
        cancelLabel="Cancel"
          extraClass="success"
          onCancel={() => setAlertOpen(false)}
          onConfirm={async () => {
            try {
              await deleteBlogById(blog._id);
              setMessage("Blog Deleted!")
              setTimeout(() => setAlertOpen(false), 3000);
              onDelete?.(blog);
            } catch (error) {
              setMessage("Error deleting blog");
            }
          }}
        />
      )}
    </>
  );
}

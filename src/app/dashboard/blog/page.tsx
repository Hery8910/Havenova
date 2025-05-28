"use client";
import { useEffect, useState } from "react";
import BlogTable from "../../../components/blog/blogTable/page";
import styles from "./page.module.css";
import { BlogFromDB } from "../../../types/blog";
import { getAllBlogs } from "../../../services/blogServices";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CreateBlogForm from "../../../components/blog/createBlogForm/page";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogFromDB[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(page, limit);
      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h4>Blogs</h4>
        <button className={styles.button} onClick={() => setOpen(prev =>!prev)}>
          {open ? "Create New Blog +" : "Blog List"}
        </button>
      </header>
      {open ? (
        <section className={styles.section}>
          <BlogTable blogs={blogs} />
          <aside className={styles.aside}>
            <button
              className={styles.aside_button}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <IoIosArrowBack />
            </button>
            <p>
              Page {page} / {totalPages}
            </p>
            <button
              className={styles.aside_button}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <IoIosArrowForward />
            </button>
          </aside>
        </section>
      ) : (
        <section className={styles.section}>
          <CreateBlogForm blogs={blogs}/>
        </section>
      )}
    </main>
  );
};

export default Blog;

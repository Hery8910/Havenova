"use client";
import Modal from "../../modal/page";
import { BlogFromDB, BlogPost } from "../../../types/blog";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

interface BlogListProps {
  blogs: BlogFromDB[];
}

export default function BlogTable({ blogs }: BlogListProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  {
    return (
        <ul className={styles.tableList}>
          <li className={`${styles.tableRow} ${styles.headerRow}`}>
            <span>Name</span>
            <span>Created at</span>
            <span></span>
          </li>
          {blogs.map((blog) => (
            <li
              key={blog._id}
              onClick={() => setShowModal(true)}
              className={styles.tableRow}
            >
              <span className={styles.title}>{blog.title}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>
                <button className={styles.moreButton} aria-label="Show details">
                  More...
                </button>
              </span>
            </li>
          ))}
        </ul>
    );
  }
}

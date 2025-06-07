"use client";
import BlogList from '../../components/blog/blogList/page';
import { BlogFromDB } from '../../types/blog';
import { getAllBlogs } from '../../services/blogServices';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogFromDB[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const limit = 10;

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(page, limit, search, order);
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
    <main>
      <h1>Latest Blog Posts</h1>
      <BlogList blogs={blogs} />
      
    </main>
  );
}

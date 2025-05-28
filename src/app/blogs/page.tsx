"use client";
import BlogList from '../../components/blog/blogList/page';
import { BlogPost } from '../../types/blog';
import { getAllBlogs } from '../../services/blogServices';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(page, limit);
      setBlogs(response.blogs);
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

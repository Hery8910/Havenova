import api from '../../services/api';
import BlogList from '../../components/blog/blogList/page';
import { BlogPost } from '../../types/blog';

export default async function BlogPage() {
  let blogs: BlogPost[] = [];

  try {
    const { data } = await api.get<BlogPost[]>('/blogs');
    blogs = data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <main>
      <h1>Latest Blog Posts</h1>
      <BlogList blogs={blogs} />
    </main>
  );
}

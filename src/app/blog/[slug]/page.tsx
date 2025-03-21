import { BlogPost } from '../../../types/blog';
import api from '../../../services/api';
import BlogContent from '../../../components/blog/blogContent/page';
import { notFound } from 'next/navigation';
import Head from 'next/head';

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;

  try {
    const { data: post } = await api.get<BlogPost>(`/blogs/${slug}`);

    if (!post) {
      return notFound(); // Redirige a la página 404 si no encuentra el blog
    }

    return (
      <>
        <Head>
          <title>{post.title} | Havenova</title>
          <meta name="description" content={post.metaDescription} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.metaDescription} />
          <meta property="og:image" content={post.image} />
        </Head>
        <main>
          <BlogContent post={post} />
        </main>
      </>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return notFound();
  }
}

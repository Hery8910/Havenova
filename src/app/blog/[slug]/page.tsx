import { BlogPost } from '../../../types/blog';
import api from '../../../services/api';
import BlogContent from '../../../components/blog/blogContent/page';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogPageProps {
  params: { slug: string };
}

// Generar metadata dinámico basado en el contenido del post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { data: post } = await api.get<BlogPost>(`/blogs/${params.slug}`);
    if (!post) return {};

    return {
      title: `${post.title} | Havenova`,
      description: post.metaDescription,
      openGraph: {
        title: `${post.title} | Havenova`,
        description: post.metaDescription,
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const { data: post } = await api.get<BlogPost>(`/blogs/${params.slug}`);

    if (!post) {
      return notFound();
    }

    return (
      <main>
        <BlogContent post={post} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return notFound();
  }
}

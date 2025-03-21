import { GetStaticProps } from 'next';
import Head from 'next/head';
import api from '../../services/api';
import BlogList from '../../components/blog/blogList/page';
import { BlogPost } from '../../types/blog';

interface HomeProps {
  blogs: BlogPost[];
}

const Blog = ({ blogs }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Havenova Blog</title>
        <meta name="description" content="Read expert advice on home maintenance and services." />
      </Head>
      <main>
        <h1>Latest Blog Posts</h1>
        <BlogList blogs={blogs} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<BlogPost[]>('/blogs');
  return { props: { blogs: data }, revalidate: 60 };
};


export default Blog;

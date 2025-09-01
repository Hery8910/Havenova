'use client';
import { useUser } from '../contexts/UserContext';
import { getPublishedBlogs } from '../services/blogServices';
import { useEffect, useState } from 'react';
import { BlogFromDB } from '../types/blog';

import Hero from '../components/hero/page';
import Benefits from '../components/benefits/page';
import WorkFlow from '../components/workFlow/page';
import QuestionAnswer from '../components/q&a/page';
import Review from '../components/reviews/page';
import { useClient } from '../contexts/ClientContext';
import Service from '../components/service/page';
import { AlertPopup } from '../components/alertPopup/page';
import { useI18n } from '../contexts/I18nContext';
import WelcomeOfferBanner from '../components/welcomeOffer/page';
// import BlogList from "../components/blog/blogList/page";

export default function Home() {
  const { client, loading } = useClient();
  const { refreshUser, user } = useUser();
  const [sessionAlert, setSessionAlert] = useState(false);
  const { texts } = useI18n();
  const popups = texts.popups;
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    title: string;
    description: string;
  } | null>(null);

  // const [blogs, setBlogs] = useState<BlogFromDB[]>([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [search, setSearch] = useState("");
  // const [order, setOrder] = useState<"desc" | "asc">("desc");
  // const limit = 10;

  useEffect(() => {
    refreshUser(() => {
      setAlert({
        type: 'error',
        title: texts.popups?.SESSION_EXPIRED?.title || 'Session expired',
        description:
          texts.popups?.SESSION_EXPIRED?.description ||
          'Your session has expired. Please log in again.',
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshUser]);
  console.log(client?.branding);

  if (!client || loading) return <p>Loading...</p>;

  return (
    <main>
      <Hero />
      <Benefits />
      <WorkFlow />
      <Service />
      <Review />
      <QuestionAnswer />
      <WelcomeOfferBanner />
      {/* <BlogList blogs={blogs} /> */}
      {alert && (
        <AlertPopup
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={() => setAlert(null)}
        />
      )}
    </main>
  );
}

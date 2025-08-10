"use client";
import { useUser } from "../contexts/UserContext";
import { getPublishedBlogs } from "../services/blogServices";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BlogFromDB } from "../types/blog";

import Hero from "../components/hero/page";
import Benefits from "../components/benefits/page";
import WorkFlow from "../components/workFlow/page";
import QuestionAnswer from "../components/q&a/page";
import Review from "../components/reviews/page";
import { useClient } from "../contexts/ClientContext";
import Service from "../components/service/page";
// import BlogList from "../components/blog/blogList/page";

export default function Home() {
  const { client, loading } = useClient();
  const {refreshUser, user} = useUser()
 
  // const [blogs, setBlogs] = useState<BlogFromDB[]>([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [search, setSearch] = useState("");
  // const [order, setOrder] = useState<"desc" | "asc">("desc");
  // const limit = 10;

  useEffect(() => {
  refreshUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!client || loading) return <p>Loading...</p>;

  return (
    <main >
      <Hero />
      <Benefits />
      <WorkFlow />
      <Service />
      <Review />
      <QuestionAnswer />
      {/* <BlogList blogs={blogs} /> */}
    </main>
  );
}

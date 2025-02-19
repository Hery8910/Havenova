'use client'
import { useUser } from "../components/contexts/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Hero from '../components/hero/page'
import Benefits from "../components/benefits/page";
import WorkFlow from "../components/workFlow/page"
import Service from './service/page'
import QuestionAnswer from "../components/q&a/page"
import Review from "../components/review/page"
import Blog from "../components/blog/page"


export default function Home() {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      refreshUser(); 
    }
  }, [refreshUser]);

  return (
    <main>
      <Hero/>
      <Benefits/>
      <WorkFlow />
      <Service/>
      <Review />
      <QuestionAnswer/>
      <Blog />
    </main>
  );
}

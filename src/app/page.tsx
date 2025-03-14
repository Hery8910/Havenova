'use client'
import { useUser } from "../components/contexts/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Hero from '../components/hero/page'
import Benefits from "../components/benefits/page";
import WorkFlow from "../components/workFlow/page"
import Service from '../components/service/page'
import QuestionAnswer from "../components/q&a/page"
import Review from "../components/review/page"
import Blog from "../components/blog/page"


export default function Home() {
  const { user, refreshUser } = useUser();
  const title = "Reliable Home Services, Just One Click Away";
  const description =
    "Professional and tailored handyman services to meet your needs. Get started today and enjoy a 10% discount on your first order.";
  const image = {src:"/svg/hero_home.svg", alt: "llustration of two household cleaning workers"};
  const cta = "Register & Save 10% ";
  const href = "/user/register";

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      refreshUser(); 
    }
  }, [refreshUser]);

  return (
    <main>
      <Hero  title={title} description={description} image={image} cta={cta} href={href}  />
      <Benefits/>
      <WorkFlow />
      <Service/>
      <Review />
      <QuestionAnswer/>
      <Blog />
    </main>
  );
}

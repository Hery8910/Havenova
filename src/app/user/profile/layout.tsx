// app/profile/layout.tsx
import React, { ReactNode } from "react";
import Sidebar from "../../../components/sidebar/page";
import styles from "./page.module.css";
import UserStats from "../../../components/user/userStats/page";
import { Metadata } from "next";

import { userProfileMetadata } from "../../pageMetadata"; 
import OffersCard from "../../../components/offersCard/page";
// import RecentList from "../../../components/blog/recentList/page";

import { FaFolder } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import { ImBlog } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

export const metadata: Metadata = userProfileMetadata;

interface ProfileLayoutProps {
  children: ReactNode;
}


export default function ProfileLayout({ children }: ProfileLayoutProps) {

    
   const userProfileNavItems= [
      { label: "Profile", href: "/user/profile", icon: <IoSettingsSharp /> },
      { label: "Edit", href: "/user/profile/edit", icon: <IoNotifications /> },
      { label: "My Requests", href: "/user/profile/requests", icon: <FaFolder /> },
      { label: "Notification", href: "/user/profile/notification", icon: <RxActivityLog /> },
    ];
    return (
    <>
      <main className={styles.layout}>
        <aside className={styles.sidebar}>
          <Sidebar items={userProfileNavItems} context="user-profile"/>
        </aside>
        <section className={styles.content}>{children}</section>
        <aside className={styles.infoColumn}>
          {/* <RecentList /> */}
          <OffersCard />
          <UserStats />
        </aside>
      </main>
    </>
  );
}

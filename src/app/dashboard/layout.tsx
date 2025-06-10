// app/dashboard/layout.tsx
import React from "react";
import styles from "./page.module.css";
import Sidebar from "../../components/sidebar/page";

import { MdDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import { ImBlog } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
    { label: "Requests", href: "/dashboard/requests", icon: <FaFolder /> },
    { label: "Employees", href: "/dashboard/employees", icon: <GrUserWorker />},
    { label: "Clients", href: "/dashboard/clients", icon: <MdPeopleAlt /> },
    { label: "Notifications", href: "/dashboard/notifications", icon: <IoNotifications />},
    { label: "Activity", href: "/dashboard/activity", icon: <RxActivityLog /> },
    { label: "Blogs", href: "/dashboard/blog", icon: <ImBlog />},
    { label: "Profile", href: "/dashboard/profile", icon: <IoSettingsSharp /> },
  ];
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Sidebar items={items} context="admin-dashboard"/>
      </nav>
      <section className={styles.section}>{children}</section>
    </main>
  );
}

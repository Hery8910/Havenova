// app/dashboard/layout.tsx
import React from "react";
import styles from "./page.module.css";
import DashboardSidebar from "../../components/dashboard/dashboardSidebar/page";
import DashboardHeader from "../../components/dashboard/dashboardHeader/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
        <DashboardSidebar />
      <header className={styles.header}>
        <DashboardHeader />
      </header>
      <section className={styles.section}>{children}</section>
    </main>
  );
}

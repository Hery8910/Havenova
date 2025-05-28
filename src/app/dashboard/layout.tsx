// app/dashboard/layout.tsx
import React from "react";
import styles from "./page.module.css";
import DashboardSidebar from "../../components/dashboard/dashboardSidebar/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
        <DashboardSidebar />
      <section className={styles.section}>{children}</section>
    </main>
  );
}

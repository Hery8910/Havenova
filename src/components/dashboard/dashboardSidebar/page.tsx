"use client";
import styles from './page.module.css'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import { IoSettingsSharp } from "react-icons/io5";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "Requests", href: "/dashboard/requests", icon: <FaFolder /> },
  { label: "Employees", href: "/dashboard/employees", icon: <GrUserWorker />},
  { label: "Clients", href: "/dashboard/clients", icon: <MdPeopleAlt /> },
  { label: "Notifications", href: "/dashboard/notifications", icon: <IoNotifications />},
  { label: "Activity", href: "/dashboard/activity", icon: <RxActivityLog /> },
  { label: "Profile", href: "/dashboard/profile", icon: <IoSettingsSharp /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <h2 className={styles.h2}>Perfil de el usuario</h2>
      <ul  className={styles.ul}>
        {navItems.map(({ label, href, icon }) => (
          <li  key={href}
          className={styles.li}
          >
          <Link key={href} href={href} className={styles.link}>
              {icon} {label}
          </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";
import styles from './page.module.css'
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import { ImBlog } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "Requests", href: "/dashboard/requests", icon: <FaFolder /> },
  { label: "Employees", href: "/dashboard/employees", icon: <GrUserWorker />},
  { label: "Clients", href: "/dashboard/clients", icon: <MdPeopleAlt /> },
  { label: "Notifications", href: "/dashboard/notifications", icon: <IoNotifications />},
  { label: "Activity", href: "/dashboard/activity", icon: <RxActivityLog /> },
  { label: "Blogs", href: "/dashboard/blog", icon: <ImBlog />},
  { label: "Profile", href: "/dashboard/profile", icon: <IoSettingsSharp /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
 const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth <= 800);
     };
 
     handleResize();
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);

  return (
    <nav className={ `${styles.nav} ${
      isMobile ? `${styles.mobile}` : ""
    }`}>
      <ul  className={styles.ul}>
        {navItems.map(({ label, href, icon }) => (
          <li  key={href}
          className={styles.li}
          >
          <Link 
          key={href} 
          href={href} 
          className={`${styles.link} ${
            pathname === href ? styles.active : ""
          }`}
          >
              {icon} {!isMobile && <p>{label}</p>}
          </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

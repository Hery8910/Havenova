"use client";
import styles from './page.module.css'
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from 'react';
import SupportModal from '../user/supportModal/page';

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}
interface DashboardSidebarProps {
  items: NavItem[];
  context: "user-profile" | "admin-dashboard";
}

export default function Sidebar({ items, context }: DashboardSidebarProps) {
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
        {items.map(({ label, href, icon }) => (
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
      <ul>
        <li><SupportModal context={context} /></li>
        <li></li>
      </ul>
    </nav>
  );
}

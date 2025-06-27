"use client";
import styles from "./page.module.css";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import SupportModal from "../user/supportModal/page";
import { logoutUser } from "../../services/userService";
import { MdLogout } from "react-icons/md";
import { useUser } from "../../contexts/UserContext";

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
  const router = useRouter();
  const { logout } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`${styles.nav} ${isMobile ? `${styles.mobile}` : ""}`}>
      <ul className={styles.ul}>
        {items.map(({ label, href, icon }) => (
          <li key={href} className={styles.li}>
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
      <ul className={styles.ul}>
        <li className={styles.link}>
          <SupportModal context={context} />
        </li>
        <li className={styles.link}>
          <button
            className={styles.logout}
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            <MdLogout /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

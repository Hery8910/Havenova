"use client";
import { useUser } from "../../../contexts/UserContext";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { getActiveOffers } from "../../../services/offers";
import { OfferDB } from "../../../types/offers";

import { useRouter } from "next/navigation";
import RequestTable from "../../../components/user/requestTable/page";
import { ServiceOrder } from "../../../types/services";
import { OfferList } from "../../../components/offerList/page";
import UserStats from "../../../components/user/userStats/page";
import { TbPointFilled } from "react-icons/tb";
import { BlogFromDB } from "../../../types/blog";
import { getPublishedBlogs } from "../../../services/blogServices";
import BlogCard from "../../../components/blog/blogCard/page";
import Link from "next/link";
import { useClient } from "../../../contexts/ClientContext";

// const mockOrders: ServiceOrder[] = [
//   {
//     id: "1",
//     status: "in progress",
//     createdAt: new Date().toISOString(),
//     contact: {
//       user: {
//         _id: "u1",
//         name: "John",
//         email: "john@example.com",
//         role: "user",
//         address: "",
//         phone: "",
//         isVerified: true,
//         profileImage: "",
//         requests: [],
//         createdAt: new Date(),
//       },
//     },
//     serviceAddress: "Alexanderplatz 1, Berlin",
//     preferredDate: "2025-06-20",
//     preferredTime: "10:00",
//     totalPrice: 120,
//     totalEstimatedDuration: 2,
//     services: [
//       {
//         id: "srv1",
//         serviceType: "furniture-assembly",
//         price: 120,
//         estimatedDuration: 2,
//         details: {
//           title: "Montaje de armario Pax",
//           icon: { src: "/icons/armario.svg", alt: "armario" },
//           type: "wardrobe",
//           location: "Bedroom",
//           quantity: "1",
//           position: "against wall",
//           width: "200",
//           height: "236",
//           depth: "60",
//           doors: 2,
//           drawers: 3,
//           notes: "Cliente necesita fijación a la pared",
//         },
//       },
//     ],
//   },
//   {
//     id: "2",
//     status: "submitted",
//     createdAt: new Date().toISOString(),
//     contact: {
//       user: {
//         _id: "u1",
//         name: "John",
//         email: "john@example.com",
//         role: "user",
//         address: "",
//         phone: "",
//         isVerified: true,
//         profileImage: "",
//         requests: [],
//         createdAt: new Date(),
//       },
//     },
//     serviceAddress: "Alexanderplatz 2, Berlin",
//     preferredDate: "2025-06-20",
//     preferredTime: "10:00",
//     totalPrice: 120,
//     totalEstimatedDuration: 2,
//     services: [
//       {
//         id: "srv1",
//         serviceType: "furniture-assembly",
//         price: 120,
//         estimatedDuration: 2,
//         details: {
//           title: "Montaje de armario Pax",
//           icon: { src: "/icons/armario.svg", alt: "armario" },
//           type: "wardrobe",
//           location: "Bedroom",
//           quantity: "1",
//           position: "against wall",
//           width: "200",
//           height: "236",
//           depth: "60",
//           doors: 2,
//           drawers: 3,
//           notes: "Cliente necesita fijación a la pared",
//         },
//       },
//     ],
//   },
//   {
//     id: "3",
//     status: "completed",
//     createdAt: "2025-05-10T10:00:00.000Z",
//     contact: {
//       user: {
//         _id: "u1",
//         name: "John",
//         email: "john@example.com",
//         role: "user",
//         address: "",
//         phone: "",
//         isVerified: true,
//         profileImage: "",
//         requests: [],
//         createdAt: new Date(),
//       },
//     },
//     serviceAddress: "Prenzlauer Allee 100, Berlin",
//     preferredDate: "2025-05-12",
//     preferredTime: "14:00",
//     totalPrice: 90,
//     totalEstimatedDuration: 1.5,
//     services: [
//       {
//         id: "srv2",
//         serviceType: "window-cleaning",
//         price: 90,
//         estimatedDuration: 1.5,
//         details: {
//           title: "Limpieza de ventanas",
//           icon: { src: "/icons/windows.svg", alt: "ventanas" },
//           windows: 5,
//           doors: 2,
//           access: "desde interior",
//           notes: "Sin persianas",
//         },
//       },
//     ],
//   },
// ];

const Profile = () => {
    const { client } = useClient();
    const clientId = client?._id;
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const { user } = useUser();

  const [hasMounted, setHasMounted] = useState(false);
  const [offers, setOffers] = useState<OfferDB[]>([]);
  const [blogs, setblogs] = useState<BlogFromDB[]>([]);
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const limit = 1;

  const loadOffers = async () => {
    try {
      const data = await getActiveOffers();
      setOffers(data);
      console.log(user);
    } catch (err) {
      console.error("Error loading offers", err);
    }
  };
  const loadBlogs = async () => {
    if (clientId)
    try {
      const data = await getPublishedBlogs(clientId, page, limit, order);
      setblogs(data.blogs);
    } catch (err) {
      console.error("Error loading offers", err);
    }
  };

  useEffect(() => {
    loadOffers();
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !user || !offers) return null;

  if (!user || !user.profileImage || !offers) return <p>Loading...</p>;
  if (user.role === "guest")
    return (
      <div className={styles.messageWrapper}>
        <h2 className={styles.title}>You are not logged in</h2>
        <p className={styles.text}>
          To access and manage your profile, please log in to your Havenova
          account. This way, you can view your personal information, track your
          service requests, and update your preferences.
        </p>
        <Link href="/user/login">
          <button className={styles.button}>Log in to your account</button>
        </Link>
      </div>
    );
  return (
    <main className={styles.main}>
      <aside className={styles.user_aside}>
        <header>
          <h3 className={styles.h1}>Profile</h3>
          <p className={styles.header_p}>
            Manage your account settings, and view your profile information.
          </p>
        </header>
        <article className={styles.main_article}>
          <Image
            src={user.profileImage}
            alt="Profile"
            width={80}
            height={80}
            className={styles.image}
          />
          <div className={styles.article_div}>
            <h4 className={styles.h1}>{user.name}</h4>
            <p className={styles.header_p}>
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p
              className={styles.verified_p}
              style={
                !user.isVerified ? { color: "#fa4903" } : { color: "#00ad34" }
              }
            >
              {user.isVerified
                ? "Verified"
                : "You need to verfied your account"}
              <TbPointFilled />
            </p>
          </div>
        </article>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.th}>Name:</th>
              <td className={styles.td}>{user.name}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Address:</th>
              <td className={styles.td}>{user.address}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Phone:</th>
              <td className={styles.td}>{user.phone}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Email:</th>
              <td className={styles.td}>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </aside>
      <aside className={styles.blog_aside}>
        <h4>Tips of the Day</h4>
        {blogs &&
          blogs.map((blog, idx) => (
            <div key={idx}>
              <BlogCard blog={blog} />
            </div>
          ))}
      </aside>
      <aside className={styles.offer_aside}>
        <h4>Promotion</h4>
        <OfferList offers={offers} dashboard />
      </aside>
      {/* <aside className={styles.stats_aside}>
        <h4>Your Stats</h4>
        <UserStats />
      </aside> */}
    </main>
  );
};

export default Profile;

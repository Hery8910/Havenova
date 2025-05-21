"use client";

import React from "react";
import { useUser } from "../../../contexts/UserContext";
import Link from "next/link";
import styles from "./page.module.css";
import {
  getRequestsByType,
} from "../../../utils/serviceRequest";
import ServiceRenderer from "../serviceRenderer/page";
import Image from "next/image";

const ServiceCart = () => {
  const { user } = useUser();

  const allRequests = user.requests;

  const types = Array.from(new Set(allRequests.map((r) => r.serviceType)));

  if (!allRequests || allRequests.length === 0) {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <h3>Your Service Cart</h3>
        </header>
        <section className={styles.section}>
          <p className={styles.p}>No services requests.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3>Your Service Cart</h3>
        <Image
          className={styles.image}
          src="/svg/shoppingCart.svg"
          alt="Shopping Cart icon"
          width={30}
          height={30}
        />
      </header>
      {types.map((type) => {
        const requests = getRequestsByType(allRequests, type as any); // TypeScript no infiere bien aquí
        return (
            <ServiceRenderer key={type} type={type} requests={requests} />
        );
      })}
      <section className={styles.checkout}>
        <Link href="/checkout">
          <button className={styles.submit}>Checkout</button>
        </Link>
      </section>
    </main>
  );
};

export default ServiceCart;

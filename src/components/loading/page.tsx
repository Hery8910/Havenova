import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { TbPoint } from "react-icons/tb";

const Loading = () => {
  return (
    <main className={styles.main}>
        <p className={styles.dot}>
          <TbPoint />
        </p>
        <p className={styles.dot}>
          <TbPoint />
        </p>
        <p className={styles.dot}>
          <TbPoint />
        </p>
        <p className={styles.dot}>
          <TbPoint />
        </p>
    </main>
  );
};

export default Loading;

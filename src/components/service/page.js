"use client";
import styles from "./page.module.css";
import Card from '../card/page'

import { useState } from "react";


const cards = [
  {
    title: "Home Service",
    description:
      "Professional home maintenance and repair solutions tailored to your needs.",
      image:{
        src:"/svg/home-service.svg",
        alt: "Icon home service"
    },
    link: "/services/home-service",
  },
  {
    title: "Windows Cleaning",
    description:
      "Crystal-clear window cleaning for a spotless and streak-free shine.",
      image:{
        src:"/svg/windows-cleaning.svg",
        alt: "Icon Windows Cleaning"
    },
      link: "/services/windows-cleaning",
  },
  {
    title: "House Cleaning",
    description:
      "Comprehensive home cleaning for a tidy, refreshed, and inviting space.",
      image:{
        src:"/svg/house-cleaning.svg",
        alt: "Icon House Cleaning"
    },
      link: "/services/house-cleaning",
  },
  {
    title: "Kitchen Cleaning",
    description:
      "Deep cleaning services to keep your kitchen fresh, hygienic, and grease-free.",
      image:{
        src:"/svg/kitchen-cleaning.svg",
        alt: "Icon Kitchen Cleaning"
    },
      link: "/services/kitchen-cleaning",
  },
  {
    title: "Furniture Assembly",
    description:
      "Efficient and precise assembly of all types of furniture, including IKEA products.",
      image:{
        src:"/svg/furniture-assembly.svg",
        alt: "Icon Furniture Assembly"
    },
      link: "/services/furniture-assembly",
  },
  {
    title: "Kitchen Assembly",
    description:
      "Expert kitchen installation for a seamless and functional space.",
      image:{
        src:"/svg/kitchen-assembly.svg",
        alt: "Icon Kitchen Assembly"
    },
      link: "/services/kitchen-assembly",
  },
];

const Service = () => {

  return (
    <section className={styles.section}>
      
          <h2 className={styles.h2}>
            Discover Our Range of Professional Home Services
          </h2>
        <Card cards={cards} />

       
    </section>
  );
};

export default Service;

import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReviewStars from "../reviewStars/page";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AvatarInicial from "../avatarPicture/page";

const Review = () => {
  const ulRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [showButtons, setShowButtons] = useState(false)
 
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
     
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  useEffect(() => {
    (windowWidth > 1000) ? setShowButtons(true) : setShowButtons(false)
  }, [windowWidth]);


  const scrollLeft = () => {
    if (ulRef.current) {
      ulRef.current.scrollBy({ left: -620, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ulRef.current) {
      ulRef.current.scrollBy({ left: 620, behavior: "smooth" });
    }
  };

  const googleReview = {
    reviews: [
      {
        name: "string",
        reviewId: "string",
        reviewer: {
          profilePhotoUrl: "string",
          displayName: "string",
          isAnonymous: "boolean",
        },
        starRating: "enum (StarRating)",
        comment: "string",
        createTime: "string",
        updateTime: "string",
        reviewReply: {},
      },
    ],
    averageRating: 3.6,
    totalReviewCount: 8,
    nextPageToken: "string",
  };
  const list = {
    reviews: [
      {
        name: "John Doe",
        color:'#1fb1b1',
        starRating: 5,
        comment:
          "Great service! Everything was done professionally and on time.",
        createTime: "2024-12-11T13:18:18.928131",
      },
      {
        name: "Jane Smith",
        color:'#ff6b6b', 
        starRating: 5,
        comment: "Highly recommended! The team was efficient and very polite.",
        createTime: "2025-01-21T13:18:18.928158",
      },
      {
        name: "Michael Johnson",
        color:'#4f46e5',
        starRating: 5.0,
        comment: "Had a great experience. The service was top-notch.",
        createTime: "2024-12-10T13:18:18.928169",
      },
      {
        name: "Emily Davis",
        color:'#f59e0b',
        starRating: 5,
        comment:
          "Very satisfied with the quality of work. Will hire them again!",
        createTime: "2024-11-24T13:18:18.928175",
      },
      {
        name: "Daniel Martinez",
        color:'#10b981',
        starRating: 5,
        comment: "Quick response and excellent customer service.",
        createTime: "2024-12-14T13:18:18.928179",
      },
      {
        name: "Sophia Brown",
        color:'#ef4444',
        starRating: 5,
        comment:
          "Reliable and skilled professionals. My place looks fantastic!",
        createTime: "2025-01-11T13:18:18.928183",
      },
      {
        name: "Liam Wilson",
        color:'#8b5cf6',
        starRating: 5,
        comment: "They went above and beyond to complete the job perfectly.",
        createTime: "2025-02-07T13:18:18.928188",
      },
      {
        name: "Olivia Anderson",
        color:'#ec4899',
        starRating: 5,
        comment: "Super easy booking process and great results.",
        createTime: "2025-01-03T13:18:18.928195",
      },
      {
        name: "Noah Thomas",
        color:'#3b82f6',
        starRating: 5,
        comment: "The team was very courteous and efficient. Highly recommend!",
        createTime: "2025-01-17T13:18:18.928207",
      },
      {
        name: "Emma Taylor",
        color:'#22c55e',
        starRating: 5,
        comment:
          "Best handyman service I’ve used. Will definitely call them again.",
        createTime: "2024-11-28T13:18:18.928213",
      },
    ],
    averageRating: 4.3,
    totalReviewCount: 10,
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <article className={styles.article}>
          <h2>Your Feedback Matters – Help Us Improve</h2>
          <p>
            At Havenova, we continuously strive to improve our services. Your
            feedback helps us enhance the customer experience and provide better
            solutions.
          </p>
          <Link href="/google_api" className={`${styles.link} button`}>
            Leave a Review
            <Image
              src="/svg/google.svg"
              priority={true}
              alt="Google logo"
              width={25}
              height={25}
            />
          </Link>
        </article>
        <Image
          className={styles.image}
          src="/images/reviews.webp"
          priority={true}
          alt="Reviews Ilustration"
          width={300}
          height={300}
        />
      </header>
      <main className={styles.main}>
      {showButtons && <aside className={styles.aside}>
            <button className={styles.button} onClick={scrollLeft}>
        <IoIosArrowBack />
      </button>
      <button className={styles.button} onClick={scrollRight}>
        <IoIosArrowForward />
      </button>
        </aside>}
        
        <ul
          className={styles.ul}
          ref={ulRef}
        >
          {list.reviews.map((review, index) => {

            return (
              <li key={index} className={`${styles.li} card`}>
               <AvatarInicial username={review.name} color={review.color} />
                <h4>{review.name}</h4>
                <p>{review.comment}</p>
                <div className={styles.div}>
                  <ReviewStars starRating={review.starRating} />
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </section>
  );
};

export default Review;

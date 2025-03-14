import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowForward } from "react-icons/io";
import ReviewStars from "../reviewStars/page";
import Link from "next/link";

const Review = () => {
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
        starRating: 5,
        comment:
          "Great service! Everything was done professionally and on time.",
        createTime: "2024-12-11T13:18:18.928131",
      },
      {
        name: "Jane Smith",
        starRating: 5,
        comment: "Highly recommended! The team was efficient and very polite.",
        createTime: "2025-01-21T13:18:18.928158",
      },
      {
        name: "Michael Johnson",
        starRating: 5.0,
        comment: "Had a great experience. The service was top-notch.",
        createTime: "2024-12-10T13:18:18.928169",
      },
      {
        name: "Emily Davis",
        starRating: 5,
        comment:
          "Very satisfied with the quality of work. Will hire them again!",
        createTime: "2024-11-24T13:18:18.928175",
      },
      {
        name: "Daniel Martinez",
        starRating: 5,
        comment: "Quick response and excellent customer service.",
        createTime: "2024-12-14T13:18:18.928179",
      },
      {
        name: "Sophia Brown",
        starRating: 5,
        comment:
          "Reliable and skilled professionals. My place looks fantastic!",
        createTime: "2025-01-11T13:18:18.928183",
      },
      {
        name: "Liam Wilson",
        starRating: 5,
        comment: "They went above and beyond to complete the job perfectly.",
        createTime: "2025-02-07T13:18:18.928188",
      },
      {
        name: "Olivia Anderson",
        starRating: 5,
        comment: "Super easy booking process and great results.",
        createTime: "2025-01-03T13:18:18.928195",
      },
      {
        name: "Noah Thomas",
        starRating: 5,
        comment: "The team was very courteous and efficient. Highly recommend!",
        createTime: "2025-01-17T13:18:18.928207",
      },
      {
        name: "Emma Taylor",
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
      <header>
        <article>
          <h2>Your Feedback Matters – Help Us Improve</h2>
          <p>
            At Havenova, we continuously strive to improve our services. Your
            feedback helps us enhance the customer experience and provide better
            solutions.
          </p>
          <Link href="/google_api" className="card">
            <p>About Us</p>
            <Image
              className={styles.image}
              src="/svg/google.svg"
              priority={true}
              alt="Google logo"
              width={50}
              height={50}
            />
          </Link>
        </article>
        <Image
          className={styles.image}
          src="/svg/reviews.svg"
          priority={true}
          alt="Reviews Ilustration"
          width={300}
          height={300}
        />
      </header>
      <main>
        {/* <section className={styles.review_section}>
          <div>
            <Image
              src="/svg/google-review.svg"
              alt="Google logo"
              width={200}
              height={75}
            />
            <p>Verified reviews from Google</p>
          </div>
          <div className={styles.wrapper}>
            <ReviewStars starRating={googleReview.averageRating} />
            <p className={styles.p}>{googleReview.averageRating}</p>
          </div>
        </section> */}
        {/* <section className={styles.review_section}>
          <div>
            <Image
              src="/svg/myhammer.svg"
              alt="My Hammer logo"
              width={200}
              height={75}
            />
            <p>Verified reviews from MyHammer</p>
          </div>
          <div className={styles.wrapper}>
            <ReviewStars starRating={list.averageRating} />
            <p className={styles.p}>{list.averageRating}</p>
          </div>
        </section> */}
        <ul className={styles.ul}>
          {list.reviews.map((review, index) => (
            <li key={index} className={`${styles.li} card`}>
              <div className={styles.div}>
                <h4>{review.name}</h4>
                <ReviewStars starRating={review.starRating} />
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Review;

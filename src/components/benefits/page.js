import styles from "./page.module.css";
import Link from "next/link";
import Card from '../card/page'
import { IoIosArrowForward } from "react-icons/io";



const Benefits = () => {
  const cards = [
    {
      title: "Professional & Skilled Experts",
      description:
        "Our team consists of experienced professionals committed to delivering top-quality service.",
        image:{
            src:"/svg/tool-box.svg",
            alt: "Illustration of a toolbox"
        }
    },
    {
      title: "Solutions for Every Job",
      description:
        "We tailor our services to your specific needs, ensuring the best results",
        image:{
            src:"/svg/solution.svg",
            alt: "Illustration of a hand"
        }
    },{
      title: "Reliable & On-Time Service",
      description:
        "We value your time, our team ensures punctuality and efficiency in every project.",
        image:{
            src:"/svg/on-time.svg",
            alt: "Illustration of a pocket watch"
        }
    },
    {
      title: "Satisfaction Guaranteed",
      description:
        "Your happiness is our priority, if you’re not satisfied, we’ll make it right!",
        image:{
            src:"/svg/rating.svg",
            alt: "happy emoji"
        }
    }
  ];
  
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>Why Choose Havenova?</h2>
        <h3>Experience Quality & Reliability</h3>
      </header>
      <main className={styles.main}>
        <Card cards={cards} />
      </main>
      <article className={styles.article}>
        <h3>Learn More About Our Services</h3>
        <Link href="/about" className="button">
          About Us <IoIosArrowForward />
        </Link>
      </article>
    </section>
  );
};

export default Benefits;

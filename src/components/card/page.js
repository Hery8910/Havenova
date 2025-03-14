import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const Card = ({ cards }) => {
  const router = useRouter();

  const handleClick = (card) => {
    let link = card.link;
    router.push(`${link}`);
  };
  return (
    <ul className={styles.ul}>
      {cards.map((card, index) => (
        <li
          key={index}
          className={`${styles.li} card ${
            index % 2 === 0 ? styles.right : styles.left
          }
          ${card.link ? styles.link : ""}
          `}
          onClick={() => handleClick(card)}
        >
          <h4>{card.title}</h4>
          <p>{card.description}</p>
          <Image
            className={styles.image}
            src={card.image.src}
            priority={true}
            alt={card.image.alt || "Image"}
            width={90}
            height={90}
          />
          {card.link && <p className={styles.p}>
            Order now <IoIosArrowForward />
          </p>}
          
        </li>
      ))}
    </ul>
  );
};

export default Card;

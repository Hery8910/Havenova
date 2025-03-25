import { useState } from "react";
import styles from "./page.module.css";
import { IoIosArrowBack } from "react-icons/io";

const Accordion = ({questions}) => {

  const [open, setOpen] = useState(null);

  const handleClick = (index) => {
    if (open === null || open !== index) {
      setOpen(index);
    } else {
      setOpen(null);
    }
  };

  return (
    <section className={styles.section}>
      <header>
        <h2>Frequently Asked Questions (FAQ)</h2>
      </header>
      <ul className={styles.ul}>
        {questions.map((question, index) => (
          <li
            key={index}
            className={`${styles.li} card`}
            onClick={() => handleClick(index)}
          >
            <h4 className={styles.h4}>
              {question.name}{" "}
              <IoIosArrowBack
                className={`${styles.icon} ${open === index ? styles.open : ""}`}
              />
            </h4>
            {open === index && (
              <p className={`${styles.p}`}>{question.answer} </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Accordion;

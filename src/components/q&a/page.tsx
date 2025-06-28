"use client";
import styles from "./page.module.css";
import { useI18n } from "../../contexts/I18nContext";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface QuestionAnswerItem {
  question: string;
  answer: string;
}

interface QuestionAnswerProps {
  title: string;
  items: QuestionAnswerItem[];
}
const QuestionAnswer: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const { texts } = useI18n();
  const faq: QuestionAnswerProps = texts.home.faq;

  return (
    <section className={styles.section}>
      <header>
        <h2>{faq.title}</h2>
      </header>
      <ul className={styles.ul}>
        {faq.items.map((question, index) => (
          <li
            key={index}
            className={`${styles.li} card`}
            onClick={() => handleClick(index)}
          >
            <h4 className={styles.h4}>
              {question.question}
              <IoIosArrowBack
                className={`${styles.icon} ${
                  open === index ? styles.open : ""
                }`}
              />
            </h4>
            {open === index && <p className={styles.p}>{question.answer}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuestionAnswer;

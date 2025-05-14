import { useState } from "react";
import styles from "./page.module.css";
import { IoIosArrowBack } from "react-icons/io";

// Tipo para cada pregunta
interface QuestionItem {
  name: string;
  answer: string;
}

// Props del componente
interface AccordionProps {
  questions: QuestionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ questions }) => {
  const [open, setOpen] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
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
              {question.name}
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

export default Accordion;

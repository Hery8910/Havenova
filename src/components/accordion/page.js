import { useState } from "react";
import styles from "./page.module.css";

const Accordion = () => {
  const questions = [
    {
      name: "How can I book a service?",
      answer:
        "You can book a service directly on our website. Simply select the type of service you need, choose a date, and submit your request. A team member will contact you to confirm the details.",
    },
    {
        name: "How can I book a service?",
        answer:
          "You can book a service directly on our website. Simply select the type of service you need, choose a date, and submit your request. A team member will contact you to confirm the details.",
      },
      {
        name: "How can I book a service?",
        answer:
          "You can book a service directly on our website. Simply select the type of service you need, choose a date, and submit your request. A team member will contact you to confirm the details.",
      },
      {
        name: "How can I book a service?",
        answer:
          "You can book a service directly on our website. Simply select the type of service you need, choose a date, and submit your request. A team member will contact you to confirm the details.",
      },
  ];
  const [open, setOpen] = useState(null);
  
  const handleClick = (index) => {
    if(open === null || open !== index) {
        setOpen(index)
    }else {
        setOpen(null)
    }
  }


  return (
    <section>
      <header>
        <h2>Frequently Asked Questions (FAQ)</h2>
      </header>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            className={styles.li}
            onClick={() => handleClick(index)}
          >
            <h4 className={styles.h4}>{question.name}</h4>
            {open === index && (
              <p className={styles.p}>{question.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Accordion;

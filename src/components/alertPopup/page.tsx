import Image from "next/image";
import React from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./page.module.css";

interface AlertPopupProps {
  type: "success" | "error";
  title: string;
  description: string;
  onClose?: () => void;
}

export const AlertPopup: React.FC<AlertPopupProps> = ({
  type,
  title,
  description,
  onClose,
}) => {
  return (
    <section className={`${styles.section} card`}>
      <div className={styles.wraper}>
        <main
          style={{
            backgroundColor:
              type === "success"
                ? "var(--color-success)"
                : type === "error"
                  ? "var(--color-error)"
                  : undefined,
          }}
          className={styles.main}
        >
          <Image
            src={type === "success" ? "/images/success.webp" : "/images/caution.webp"}
            priority={true}
            alt={type === "success" ? "Success icon" : "Caution icon"}
            width={100}
            height={100}
            className={styles.image}
          />
          <article className={styles.article}>
            <h4><strong>{title}</strong></h4>
            <p>{description}</p>
          </article>
        </main>
        {onClose && (
          <button className={styles.button} onClick={onClose}>
            <IoIosClose />
          </button>
        )}
      </div>
    </section>
  );
};

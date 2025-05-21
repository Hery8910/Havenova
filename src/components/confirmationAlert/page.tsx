"use client";
import React from "react";
import styles from "./page.module.css";
import Lottie from "lottie-react";

interface ConfirmationAlertProps {
  title: string;
  message: string;
  animationData: object;
  confirmLabel?: string;
  cancelLabel?: string;
  extraClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationAlert: React.FC<ConfirmationAlertProps> = ({
  title,
  message,
  animationData,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  extraClass = "",
  onConfirm,
  onCancel,
}) => {
  return (
    <section className={styles.wrapper}>
      <main className={styles.section_main}>
           <Lottie
           animationData={animationData}
           loop={true}
           autoplay={true}
           style={{ width: 100, height: 100 }}
         />
        <article className={styles.section_article}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.message}>{message}</p>
          <div className={styles.button_group}>
            <button 
            className={styles.cancel_button}
            onClick={onCancel}>
              {cancelLabel}
            </button>
            <button 
            className={extraClass ? styles[`${extraClass}_button`] : styles.confirm_button}
            onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </article>
      </main>
    </section>
  );
};

export default ConfirmationAlert;

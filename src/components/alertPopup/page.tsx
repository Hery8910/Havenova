import Image from 'next/image';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import styles from './page.module.css';

interface AlertPopupProps {
  type: 'success' | 'error';
  title: string;
  description: string;
  onClose?: () => void;
}

export const AlertPopup: React.FC<AlertPopupProps> = ({ type, title, description, onClose }) => {
  return (
    <section
      style={{
        backgroundImage:
          type === 'success'
            ? 'url(/svg/success-bg.svg)'
            : type === 'error'
            ? 'url(/svg/alert-bg.svg)'
            : undefined,
      }}
      className={`${styles.section} card`}
    >
      <div className={styles.wraper}>
        <main
          style={{
            backgroundColor:
              type === 'success'
                ? 'var(--bg-success)'
                : type === 'error'
                ? 'var(--bg-alert)'
                : undefined,
          }}
          className={styles.main}
        >
          <Image
            src={type === 'success' ? '/images/success.webp' : '/images/alert.webp'}
            priority={true}
            alt={type === 'success' ? 'Success image' : 'Alert image'}
            width={300}
            height={200}
            className={styles.image}
          />
          <article
            style={{
              color:
                type === 'success'
                  ? 'var(--color-success)'
                  : type === 'error'
                  ? 'var(--color-alert)'
                  : undefined,
            }}
            className={styles.article}
          >
            <h4>
              <strong>{title}</strong>
            </h4>
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

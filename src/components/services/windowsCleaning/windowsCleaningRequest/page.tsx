"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import styles from "./page.module.css";
import { ServiceRequestItem } from "../../../../types/services";
import { removeRequestItemFromStorage } from "../../../../utils/serviceRequest";
import Image from "next/image";

interface Props {
  requests: Extract<
    ServiceRequestItem,
    { serviceType: "window-cleaning" }
  >[];
}

const WindowCleaningRequest = ({ requests }: Props) => {
  const { user, removeRequestFromUser } = useUser();

  return (
    <ul className={styles.ul}>
      {requests.map((item, index) => (
        <li key={index} className={`${styles.li} card`}>
          <h3>{item.details.title}</h3>
          <article className={styles.article}>
            <div className={styles.first_div}>
              <Image
                className={styles.image}
                src={item.details.icon.src}
                alt={item.details.icon.alt}
                width={50}
                height={50}
              />
              <div className={styles.div}>
                {/* <p>
                  <strong>{item.details}</strong>
                </p>
                <p>
                  {item.details.quantity}x {item.details.type}
                </p> */}
              </div>
            </div>

            <button
              className={styles.Btn}
              onClick={() => {
                removeRequestItemFromStorage(index);
                removeRequestFromUser(index);
              }}
            >
              <div className={styles.sign}>
                <svg
                  viewBox="0 0 16 16"
                  className="bi bi-trash3-fill"
                  fill="currentColor"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                </svg>
              </div>

              <div className={styles.text}>Delete</div>
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default WindowCleaningRequest;

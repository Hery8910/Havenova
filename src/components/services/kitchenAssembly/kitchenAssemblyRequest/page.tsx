"use client";
import React, { useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import styles from "./page.module.css";
import { ServiceRequestItem } from "../../../../types/services";
import Image from "next/image";

interface Props {
  requests: Extract<ServiceRequestItem, { serviceType: "kitchen-assembly" }>[];
}

const KitchenAssemblyRequest = ({ requests }: Props) => {
  const { user, removeRequestFromUser } = useUser();
  const [hover, setHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <section className={styles.section}>
      {requests.map((item, index) => (
        <>
          <header key={index} className={styles.li}>
            <h3>{item.details.title}</h3>
          </header>

          <main className={styles.article}>
            <article className={styles.first_div}>
              <Image
                className={styles.image}
                src={item.details.icon.src}
                alt={item.details.icon.alt}
                width={50}
                height={50}
              />
              <div className={styles.div}>
                <p>
                  <strong>{item.details.length} m</strong>
                </p>
                <p>{item.details.layout} Layout Kitchen</p>
              </div>
            </article>

            <button
              className={styles.button}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Image
                className={styles.image}
                src="/svg/delete.svg"
                alt="Delete icon"
                width={20}
                height={20}
              />{" "}
              {hover && <p className={styles.delete}>Delete</p>}
            </button>
            {open && (
              <aside className={styles.aside}>
                <Image
                  className={styles.image}
                  src="/svg/caution.svg"
                  alt={item.details.icon.alt}
                  width={60}
                  height={60}
                />
                <article className={styles.aside_article}>
                  <h4 className={styles.aside_h4}>
                    Are you sure you want to delete this request?
                  </h4>
                  <p className={styles.aside_p}>
                    This action cannot be undone.
                  </p>
                  <div className={styles.div_buttons}>
                    <button
                      className={styles.cancel_button}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.delete_button}
                      onClick={() => {
                        removeRequestFromUser(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              </aside>
            )}
          </main>
        </>
      ))}
    </section>
  );
};

export default KitchenAssemblyRequest;

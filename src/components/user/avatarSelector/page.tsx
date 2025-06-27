import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ImageUpload from "../../imageUpload/page";

interface AvatarSelectorProps {
  current: string;
  onSelect: (src: string) => void;
  onUpload: (src: string) => void;
}

const avatarList = Array.from(
  { length: 10 },
  (_, i) => `/avatars/avatar-${i + 1}.svg`
);

export default function AvatarSelector({
  current,
  onSelect,
  onUpload,
}: AvatarSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={styles.button}
      >
       Change Profile Image
      </button>
      {open && (
        <article className={styles.article}>
       
          <ul className={styles.ul}>
            {avatarList.map((src) => (
              <li className={styles.li} key={src}>
                <Image
                  className={`${styles.image} ${current === src ? styles.selected : ""}`}
                  src={src}
                  alt="Profile Image"
                  width={60}
                  height={60}
                  onClick={() => onSelect(src)}
                />
              </li>
            ))}
          </ul>
          <aside className={styles.aside}>
            <ImageUpload
              label="Featured Image"
              uploadPreset="havenova_upload"
              cloudName="dd1i5d0iq"
              initialImage={""}
              onUpload={(url) => onUpload(url)}
              width="350px"
              aspectRatio={1 / 1}
            />
          </aside>
             <button
            type="button"
            onClick={() => setOpen(false)}
            className={styles.button}
          >
            Choose Selected
          </button>
        </article>
      )}
    </main>
  );
}

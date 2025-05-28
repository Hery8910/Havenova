import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./page.module.css";
import Loading from "../loading/page";

interface ImageUploadProps {
  label?: string;
  onUpload: (url: string) => void;
  uploadPreset: string;
  cloudName: string;
  initialImage?: string;
}

export default function ImageUpload({
  label = "Upload Image",
  onUpload,
  uploadPreset,
  cloudName,
  initialImage = "",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        onUpload(data.secure_url);
      } else {
        setError("Upload failed");
      }
    } catch {
      setError("An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  // For drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <main
      className={styles.main}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => {
        imageUrl ? null : fileInputRef.current?.click();
      }}
    >
      {imageUrl ? (
        <section className={styles.image_section}>
        
          <button
            type="button"
            className={styles.button}
            onMouseEnter={() => {
              setTimeout(() => {
                setHover(true)
              }, 400);
            }}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              setImageUrl("");
              onUpload("");
              setHover(false)
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            <Image
              src="/svg/delete.svg"
              alt="Delete icon"
              width={20}
              height={20}
            />
          {hover && <p className={styles.delete}>Delete</p>}
          </button>
          <Image
            src={imageUrl}
            priority={true}
            alt="Uploaded"
            width={250}
            height={250}
          />
        </section>
      ) : (
        <section
          onMouseEnter={() => setDragActive(true)}
          onMouseLeave={() => setDragActive(false)}
          className={`${styles.input_section} ${dragActive ? styles.section_active : ""}`}
        >
          <div className={styles.images}>
            <Image
              className={`${styles.image_left} ${dragActive ? styles.image_left_active : ""}`}
              src="/svg/image_icon.svg"
              priority={true}
              alt="Image Icon"
              width={100}
              height={100}
            />
            <Image
              className={styles.imge_top}
              src="/svg/image_icon.svg"
              priority={true}
              alt="Image Icon"
              width={100}
              height={100}
            />
            <Image
              className={`${styles.image_right} ${dragActive ? styles.image_right_active : ""}`}
              src="/svg/image_icon.svg"
              priority={true}
              alt="Image Icon"
              width={100}
              height={100}
            />
          </div>

          {uploading ? <Loading /> : <p>Drop an image, or click to select</p>}
        </section>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </main>
  );
}

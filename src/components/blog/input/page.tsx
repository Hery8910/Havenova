import React, { useRef } from "react";
import styles from "./page.module.css";

interface InputProps {
  heading: string;
  value: string;
  onChange: (value: string, idx?: number) => void;
  onBlur: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function Input({
  heading,
  value,
  onChange,
  onBlur,
  placeholder = "Blog Title",
  maxLength = 120,
}: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajuste automático de altura
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
    onChange(e.currentTarget.value);
    onBlur(e.currentTarget.value);

  };

  return (
    <textarea
      ref={textareaRef}
      className={`${styles.titleInput} ${styles[`${heading}`]}`}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      maxLength={maxLength}
      onInput={handleInput}
    />
  );
}

"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.css";
import Image from "next/image";
import {
  HouseCleaningData,
  serviceIcon,
  ServiceRequestItem,
} from "../../../../types/services";
import { useUser } from "../../../../contexts/UserContext";
import { handleServiceRequest } from "../../../../services/serviceRequestHandler";

const HouseCleaningForm = () => {
  const { user, refreshUser, addRequestToUser } = useUser();
  const [formData, setFormData] = useState<HouseCleaningData>({
    title: "House Cleaning",
    icon: {
      src: "/svg/house-cleaning.svg",
      alt: "House Cleaning icon",
    },
    surface: 0,
    livingRoom: 0,
    bedRooms: 0,
    badRooms: 1,
    balcon: 0,
    kitchen: "yes",
    house: "Apartment",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typedValue = type === "number" ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: typedValue,
      title: "House Cleaning",
      icon: {
        src: "/svg/house-cleaning.svg",
        alt: "House Cleaning icon",
      },
    }));
  };

  const handleAdjust = (
    field: "livingRoom" | "bedRooms" | "badRooms" | "balcon",
    action: "add" | "subtract"
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated =
        action === "add"
          ? current + 1
          : field === "badRooms"
            ? Math.max(1, current - 1)
            : Math.max(0, current - 1);
      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: ServiceRequestItem = {
      id: uuidv4(),
      serviceType: "house-cleaning",
      details: formData,
    };
    try {
      await handleServiceRequest({
        user,
        newRequest,
        addRequestToUser,
      });
      setFormData({
        title: "House Cleaning",
        icon: {
          src: "/svg/house-cleaning.svg",
          alt: "House Cleaning icon",
        },
        surface: 0,
        livingRoom: 0,
        bedRooms: 0,
        badRooms: 1,
        balcon: 0,
        kitchen: "yes",
        house: "no",
        notes: "",
      });
      alert("Service item added to cart!");
      refreshUser();
    } catch (err) {
      console.error("❌ Error saving to cart:", err);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <Image
            className={styles.header_image}
            src="/svg/house-cleaning.svg"
            priority={true}
            alt="Window Icon"
            width={70}
            height={70}
          />
          <h3>{formData.title}</h3>
        </header>

        <div className={styles.form_div}>
          <label className={styles.label}>Surface</label>
          <div className={styles.div}>
            <input
              className={styles.input}
              type="number"
              name="surface"
              value={formData.surface || ""}
              onChange={handleChange}
              placeholder="0"
            />
            <label className={styles.label}>m²</label>
          </div>
        </div>

        <div className={styles.form_div}>
          <p>Living Room</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("livingRoom", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.livingRoom}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("livingRoom", "add")}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.form_div}>
          <p>Bed Room</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("bedRooms", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.bedRooms}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("bedRooms", "add")}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.form_div}>
          <p>Bad Room</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("badRooms", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.badRooms}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("badRooms", "add")}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.form_div}>
          <p>Balcon</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("balcon", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.balcon}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("balcon", "add")}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.form_div}>
          <label className={styles.label}>Kitchen</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.kitchen === "yes"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  kitchen: e.target.checked ? "yes" : "no",
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.form_div}>
          <label className={styles.label}>Private House</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.house === "House"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  house: e.target.checked ? "House" : "Apartment",
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <textarea
          className={styles.textarea}
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Leave us a comment"
        />

        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default HouseCleaningForm;

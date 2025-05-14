"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.css";
import Image from "next/image";
import {
  KitchenAssemblyData,
  serviceIcon,
  ServiceRequestItem,
} from "../../../../types/services";
import { useUser } from "../../../../contexts/UserContext";
import { handleServiceRequest } from "../../../../services/serviceRequestHandler";
import Select from "../../../select/page";

const KitchenAssemblyForm = () => {
  const { user, refreshUser, addRequestToUser } = useUser();
  const [formData, setFormData] = useState<KitchenAssemblyData>({
    title: "Kitchen Assembly",
    icon: {
      src: "/svg/kitchen-assembly.svg",
      alt: "Kitchen assembly icon",
    },
    length: 0,
    layout: "",
    lowerCabinets: 0,
    upperCabinets: 0,
    island: "no",
    appliances: [],
    disassemblyNeed: "no",
    provider: "",
    notes: "",
  });
  const applianceOptions = [
    {
      name: "Refrigerator",
      icon: { src: "/svg/refrigerator.svg", alt: "Refrigerator" },
    },
    {
      name: "Dishwasher",
      icon: { src: "/svg/dishwasher.svg", alt: "Dishwasher" },
    },
    {
      name: "Cooktop",
      icon: { src: "/svg/cooktop.svg", alt: "Cooktop" },
    },
    {
      name: "Oven",
      icon: { src: "/svg/oven.svg", alt: "Oven" },
    },
    {
      name: "Extractor",
      icon: { src: "/svg/extractor.svg", alt: "Extractor" },
    },
    {
      name: "Washing Machine",
      icon: {
        src: "/svg/washing-machine.svg",
        alt: "Washing Machine",
      },
    },
    {
      name: "Sink",
      icon: { src: "/svg/sink.svg", alt: "Sink" },
    },
  ];
  const layoutOptions = [
    {
      name: "Linear",
      icon: { src: "/svg/linear.svg", alt: "Linear Layout" },
    },
    {
      name: "L-Shape",
      icon: { src: "/svg/l-shape.svg", alt: "L-Shaped Layout" },
    },
    {
      name: "U-Shape",
      icon: { src: "/svg/u-shape.svg", alt: "U-Shaped Layout" },
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typedValue = type === "number" ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: typedValue,
      title: "Kitchen Assembly",
      icon: {
        src: "/svg/kitchen-assembly.svg",
        alt: "Kitchen Assembly icon",
      },
    }));
  };

  const handleAdjust = (
    field: "lowerCabinets" | "upperCabinets",
    action: "add" | "subtract"
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = action === "add" ? current + 1 : Math.max(0, current - 1);
      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const handleApplianceChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      appliances: selected,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: ServiceRequestItem = {
      id: uuidv4(),
      serviceType: "kitchen-assembly",
      details: formData,
    };
    try {
      await handleServiceRequest({
        user,
        newRequest,
        addRequestToUser,
      });
      setFormData({
        title: "Kitchen Assembly",
        icon: {
          src: "/svg/kitchen-assembly.svg",
          alt: "Kitchen assembly icon",
        },
        length: 0,
        layout: "",
        lowerCabinets: 0,
        upperCabinets: 0,
        island: "no",
        appliances: [],
        disassemblyNeed: "no",
        provider: "",
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
            src="/svg/kitchen-assembly.svg"
            priority={true}
            alt="Kitchen assembly icon"
            width={100}
            height={100}
          />
          <h3>{formData.title}</h3>
        </header>

        <div className={styles.form_div}>
          <label className={styles.label}>Length</label>
          <div className={styles.div}>
            <input
              className={styles.input}
              type="number"
              name="length"
              value={formData.length || ""}
              onChange={handleChange}
              placeholder="0"
            />
            <label className={styles.label}>m</label>
          </div>
        </div>
        <div className={styles.form_div}>
          <p>Lower Cabinets</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("lowerCabinets", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.lowerCabinets}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("lowerCabinets", "add")}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.form_div}>
          <p>Upper Cabinets</p>
          <div className={styles.counter}>
            <button
              className={styles.rest_button}
              type="button"
              onClick={() => handleAdjust("upperCabinets", "subtract")}
            >
              -
            </button>
            <p className={styles.counter_p}>{formData.upperCabinets}</p>
            <button
              className={styles.add_button}
              type="button"
              onClick={() => handleAdjust("upperCabinets", "add")}
            >
              +
            </button>
          </div>
        </div>

       
        <Select
          label="Select Layout"
          options={layoutOptions}
          onChange={(selected) =>
            setFormData((prev) => ({ ...prev, layout: selected[0] || "" }))
          }
          multiple={false}
        />
         <Select
          label="Select Appliances"
          options={applianceOptions}
          onChange={handleApplianceChange}
          multiple
        />
          <div className={styles.form_div}>
          <label className={styles.label}>Island</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.island === "yes"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  island: e.target.checked ? "yes" : "no",
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.form_div}>
          <label className={styles.label}>Disassembly of the old kitchen needeed?</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.disassemblyNeed === "yes"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  disassemblyNeed: e.target.checked ? "yes" : "no",
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.provider_div}>
          <label className={styles.label}>Kitchen provider</label>
            <input
              className={styles.provider_input}
              type="text"
              name="provider"
              value={formData.provider || ""}
              onChange={handleChange}
              placeholder="E.g. IKEA"
            />
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

export default KitchenAssemblyForm;

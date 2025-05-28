"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { validateFurnitureForm } from "../../../../utils/validators";
import {
  FurnitureAssemblyData,
  serviceIcon,
  furnitureServiceInput,
  ServiceRequestItem,
} from "../../../../types/services";
import successAnimation from "../../../../../public/animation/success.json";
import { useUser } from "../../../../contexts/UserContext";
import { handleServiceRequest } from "../../../../services/serviceRequestHandler";
import { IoClose } from "react-icons/io5";
import ConfirmationAlert from "../../../confirmationAlert/page";

const FurnitureAssemblyForm = () => {
  const furnitureTypes = [
    {
      location: "Bedroom",
      furniture: [
        {
          id: "wardrobe",
          label: "Wardrobe",
          icon: {
            src: "/svg/furnitureTypes/wardrobe.svg",
            alt: "Wardrobe icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: false,
          },
        },
        {
          id: "bed_frame",
          label: "Bed Frame",
          icon: {
            src: "/svg/furnitureTypes/bed_frame.svg",
            alt: "Bed Frame icon",
          },
          input: {
            width: true,
            height: false,
            depth: true,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "dresser",
          label: "Dresser",
          icon: {
            src: "/svg/furnitureTypes/dresser.svg",
            alt: "Dresser icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "nightstand",
          label: "Nightstand",
          icon: {
            src: "/svg/furnitureTypes/nightstand.svg",
            alt: "Nightstand icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: {
            src: "/svg/furnitureTypes/bookshelf.svg",
            alt: "Bookshelf icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
      ],
    },
    {
      location: "Living Room",
      furniture: [
        {
          id: "tv_unit",
          label: "TV Unit",
          icon: {
            src: "/svg/furnitureTypes/tv_unit.svg",
            alt: "TV Unit icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "coffee_table",
          label: "Coffee Table",
          icon: {
            src: "/svg/furnitureTypes/coffee_table.svg",
            alt: "Coffee Table icon",
          },
          input: {
            width: true,
            height: true,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: {
            src: "/svg/furnitureTypes/bookshelf.svg",
            alt: "Bookshelf icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "display_cabinet",
          label: "Display Cabinet",
          icon: {
            src: "/svg/furnitureTypes/display_cabinet.svg",
            alt: "Display Cabinet icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
      ],
    },
    {
      location: "Bathroom",
      furniture: [
        {
          id: "bathroom_cabinet",
          label: "Bathroom Cabinet",
          icon: {
            src: "/svg/furnitureTypes/bathroom_cabinet.svg",
            alt: "Bathroom Cabinet icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "mirror_cabinet",
          label: "Mirror Cabinet",
          icon: {
            src: "/svg/furnitureTypes/mirror_cabinet.svg",
            alt: "Mirror Cabinet icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "shelf_unit",
          label: "Shelf Unit",
          icon: {
            src: "/svg/furnitureTypes/shelf_unit.svg",
            alt: "Shelf Unit icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
      ],
    },
    {
      location: "Kitchen",
      furniture: [
        {
          id: "dining_table",
          label: "Dining Table",
          icon: {
            src: "/svg/furnitureTypes/dining_table.svg",
            alt: "Dining Table icon",
          },
          input: {
            width: true,
            height: true,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "dining_chair",
          label: "Dining Chair",
          icon: {
            src: "/svg/furnitureTypes/dining_chair.svg",
            alt: "Dining Table icon",
          },
          input: {
            width: false,
            height: false,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "kitchen_island",
          label: "Kitchen Island",
          icon: {
            src: "/svg/furnitureTypes/kitchen_island.svg",
            alt: "Kitchen Island icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: false,
          },
        },
        {
          id: "kitchen_cabinet",
          label: "Kitchen Cabinet",
          icon: {
            src: "/svg/furnitureTypes/kitchen_cabinet.svg",
            alt: "Kitchen Cabinet icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
      ],
    },
    {
      location: "Office / Study",
      furniture: [
        {
          id: "desk",
          label: "Desk",
          icon: {
            src: "/svg/furnitureTypes/desk.svg",
            alt: "Desk icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "office_chair",
          label: "Office Chair",
          icon: {
            src: "/svg/furnitureTypes/office_chair.svg",
            alt: "Office Chair icon",
          },
          input: {
            width: false,
            height: false,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "filing_cabinet",
          label: "Filing Cabinet",
          icon: {
            src: "/svg/furnitureTypes/filing_cabinet.svg",
            alt: "Filing Cabinet icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: {
            src: "/svg/furnitureTypes/bookshelf.svg",
            alt: "Bookshelf icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
      ],
    },
    {
      location: "Hallway / Entry",
      furniture: [
        {
          id: "shoe_rack",
          label: "Shoe Rack",
          icon: {
            src: "/svg/furnitureTypes/shoe_rack.svg",
            alt: "Shoe Rack icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "coat_rack",
          label: "Coat Rack",
          icon: {
            src: "/svg/furnitureTypes/coat_rack.svg",
            alt: "Coat Rack icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: true,
          },
        },
        {
          id: "console_table",
          label: "Console Table",
          icon: {
            src: "/svg/furnitureTypes/console_table.svg",
            alt: "Console Table icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: true,
            drawers: true,
            wall: false,
          },
        },
      ],
    },
    {
      location: "Balcony / Outdoor",
      furniture: [
        {
          id: "outdoor_table",
          label: "Outdoor Table",
          icon: {
            src: "/svg/furnitureTypes/outdoor_table.svg",
            alt: "Outdoor Table icon",
          },
          input: {
            width: true,
            height: true,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "garden_chair",
          label: "Garden Chair",
          icon: {
            src: "/svg/furnitureTypes/garden_chair.svg",
            alt: "Garden Chair icon",
          },
          input: {
            width: false,
            height: false,
            depth: false,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
        {
          id: "plant_shelf",
          label: "Plant Shelf",
          icon: {
            src: "/svg/furnitureTypes/plant_shelf.svg",
            alt: "Plant Shelf icon",
          },
          input: {
            width: true,
            height: true,
            depth: true,
            doors: false,
            drawers: false,
            wall: false,
          },
        },
      ],
    },
  ];
  const router = useRouter();
  const { user, refreshUser, addRequestToUser } = useUser();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [icon, setIcon] = useState<serviceIcon>({ src: "", alt: "" });
  const [input, setInput] = useState<furnitureServiceInput>({
    width: true,
    height: true,
    depth: true,
    doors: true,
    drawers: true,
    wall: true,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FurnitureAssemblyData>({
    title: "Furniture Assembly",
    icon: {
      src: icon.src,
      alt: icon.alt,
    },
    type: selectedItem,
    location: selectedLocation,
    quantity: "1",
    position: "floor",
    width: "",
    height: "",
    depth: "",
    doors: 0,
    drawers: 0,
    notes: "",
  });

  useEffect(() => {
    if (furnitureTypes.length > 0) {
      setSelectedLocation(furnitureTypes[0].location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const activeGroup = furnitureTypes.find(
    (group) => group.location === selectedLocation
  );

  const handleClick = (
    label: string,
    icon: serviceIcon,
    input: furnitureServiceInput
  ) => {
    setSelectedItem(label);
    setInput(input);
    setIcon(icon);
    setOpen(true);
    setFormData((prev) => ({
      ...prev,
      title: "Furniture Assembly",
      icon,
      type: label,
      location: selectedLocation,
      position: "floor", // default
      quantity: "1",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typedValue = type === "number" ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: typedValue,
      title: "Furniture Assembly",
      icon: {
        src: icon.src,
        alt: icon.alt,
      },
      type: selectedItem,
      location: selectedLocation,
    }));
  };

  const handleAdjust = (
    field: "doors" | "drawers" | "quantity",
    action: "add" | "subtract"
  ) => {
    setFormData((prev) => {
      const current =
        field === "quantity" ? Number(prev.quantity) : prev[field];
      const updated =
        action === "add"
          ? current + 1
          : field === "drawers" || field === "doors"
            ? Math.max(0, current - 1)
            : Math.max(1, current - 1);
      return {
        ...prev,
        [field]: field === "quantity" ? String(updated) : updated,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: ServiceRequestItem = {
      id: uuidv4(),
      serviceType: "furniture-assembly",
      price: 0,
      estimatedDuration: 0,
      details: formData,
    };
    const error = validateFurnitureForm(formData);
    if (error) {
      alert(error);
      return;
    }
    try {
      await handleServiceRequest({
        user,
        newRequest,
        addRequestToUser,
      });
      setFormData({
        title: "Furniture Assembly",
        icon: {
          src: icon.src,
          alt: icon.alt,
        },
        type: selectedItem,
        location: selectedLocation,
        quantity: "1",
        position: "floor",
        width: "",
        height: "",
        depth: "",
        doors: 0,
        drawers: 0,
        notes: "",
      });
      setAlertOpen(true);
      setOpen(false);
      refreshUser();
    } catch (err) {
      console.error("❌ Error saving to cart:", err);
    }
  };

  return (
    <>
    <main className={styles.main}>
      <header
        className={styles.header}
        style={open ? { opacity: "0.2" } : { opacity: "1" }}
      >
        {furnitureTypes.map((group) => (
          <button
            key={group.location}
            onClick={() => handleSelect(group.location)}
            className={` button ${
              selectedLocation === group.location ? `${styles.active}` : ""
            }`}
          >
            {group.location}
          </button>
        ))}
      </header>
      {activeGroup && (
        <ul
          className={styles.ul}
          style={open ? { opacity: "0.2" } : { opacity: "1" }}
        >
          {activeGroup.furniture.map((item) => (
            <li
              key={item.id}
              className={styles.li}
              onClick={() => handleClick(item.label, item.icon, item.input)}
            >
              <Image
                className={styles.li_image}
                src={item.icon.src}
                priority={true}
                alt={item.icon.alt}
                width={50}
                height={50}
              />
              <p className={styles.li_p}>{item.label}</p>
            </li>
          ))}
        </ul>
      )}
      {open && (
        <aside className={styles.aside}>
          <header className={styles.aside_header}>
            <Image
              className={styles.aside_image}
              src={icon.src}
              priority={true}
              alt={icon.alt}
              width={75}
              height={75}
            />
            <div>
              <h4>{formData.title}</h4>
              <p>{selectedItem}</p>
            </div>
            <button
              className={styles.aside_button}
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </button>
          </header>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_div}>
              <p>Quantity</p>
              <div className={styles.counter}>
                <button
                  className={styles.rest_button}
                  type="button"
                  onClick={() => handleAdjust("quantity", "subtract")}
                >
                  -
                </button>
                <p className={styles.counter_p}>{formData.quantity}</p>
                <button
                  className={styles.add_button}
                  type="button"
                  onClick={() => handleAdjust("quantity", "add")}
                >
                  +
                </button>
              </div>
            </div>

            {input.width && (
              <div className={styles.form_div}>
                <label className={styles.label}>Width </label>
                <div className={styles.div}>
                  <input
                    className={styles.input}
                    type="number"
                    name="width"
                    value={formData.width || ""}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  <label className={styles.label}>cm</label>
                </div>
              </div>
            )}

            {input.height && (
              <div className={styles.form_div}>
                <label className={styles.label}>Height</label>
                <div className={styles.div}>
                  <input
                    className={styles.input}
                    type="number"
                    name="height"
                    value={formData.height || ""}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  <label className={styles.label}>cm</label>
                </div>
              </div>
            )}

            {input.depth && (
              <div className={styles.form_div}>
                <label className={styles.label}>Depth</label>
                <div className={styles.div}>
                  <input
                    className={styles.input}
                    type="number"
                    name="depth"
                    value={formData.depth || ""}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  <label className={styles.label}>cm</label>
                </div>
              </div>
            )}

            {input.doors && (
              <div className={styles.form_div}>
                <p>Number of Doors</p>
                <div className={styles.counter}>
                  <button
                    className={styles.rest_button}
                    type="button"
                    onClick={() => handleAdjust("doors", "subtract")}
                  >
                    -
                  </button>
                  <p className={styles.counter_p}>{formData.doors}</p>
                  <button
                    className={styles.add_button}
                    type="button"
                    onClick={() => handleAdjust("doors", "add")}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {input.drawers && (
              <div className={styles.form_div}>
                <p>Number of Drawers</p>
                <div className={styles.counter}>
                  <button
                    className={styles.rest_button}
                    type="button"
                    onClick={() => handleAdjust("drawers", "subtract")}
                  >
                    -
                  </button>
                  <p className={styles.counter_p}>{formData.drawers}</p>
                  <button
                    className={styles.add_button}
                    type="button"
                    onClick={() => handleAdjust("drawers", "add")}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {input.wall && (
              <div className={styles.form_div}>
                <label className={styles.label}>Mounted on wall?</label>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={formData.position === "wall"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        position: e.target.checked ? "wall" : "floor",
                      }))
                    }
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            )}

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
        </aside>
      )}
    </main>
      {alertOpen && (
        <ConfirmationAlert
          title="Your request has been submitted!"
          message="Do you want to continue to checkout or keep browsing for more services?"
          animationData={successAnimation}
          confirmLabel="Go to Checkout"
          cancelLabel="Keep Browsing"
          extraClass="success"
          onCancel={() => setAlertOpen(false)}
          onConfirm={() => {
            router.push("/checkout");
          }}
        />
      )}
    </>
  );
};

export default FurnitureAssemblyForm;

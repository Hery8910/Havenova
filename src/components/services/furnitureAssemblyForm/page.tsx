"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { saveRequestItemToStorage } from "../../../utils/serviceRequest";
import { validateFurnitureForm } from "../../../utils/validators";
import { FurnitureAssemblyData } from "../../../types/services";
import { useUser } from "../../../contexts/UserContext";
import { handleServiceRequest } from "../../../services/serviceRequestHandler";

const FurnitureAssemblyForm = () => {
  const furnitureTypes = [
    {
      location: "Bedroom",
      furniture: [
        {
          id: "wardrobe",
          label: "Wardrobe",
          icon: "/svg/furnitureTypes/wardrobe.svg",
        },
        {
          id: "bed_frame",
          label: "Bed Frame",
          icon: "/svg/furnitureTypes/bed_frame.svg",
        },
        {
          id: "dresser",
          label: "Dresser",
          icon: "/svg/furnitureTypes/dresser.svg",
        },
        {
          id: "nightstand",
          label: "Nightstand",
          icon: "/svg/furnitureTypes/nightstand.svg",
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: "/svg/furnitureTypes/bookshelf.svg",
        },
      ],
    },
    {
      location: "Living Room",
      furniture: [
        {
          id: "tv_unit",
          label: "TV Unit",
          icon: "/svg/furnitureTypes/tv_unit.svg",
        },
        {
          id: "coffee_table",
          label: "Coffee Table",
          icon: "/svg/furnitureTypes/coffee_table.svg",
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: "/svg/furnitureTypes/bookshelf.svg",
        },
        {
          id: "display_cabinet",
          label: "Display Cabinet",
          icon: "/svg/furnitureTypes/display_cabinet.svg",
        },
      ],
    },
    {
      location: "Bathroom",
      furniture: [
        {
          id: "bathroom_cabinet",
          label: "Bathroom Cabinet",
          icon: "/svg/furnitureTypes/bathroom_cabinet.svg",
        },
        {
          id: "mirror_cabinet",
          label: "Mirror Cabinet",
          icon: "/svg/furnitureTypes/mirror_cabinet.svg",
        },
        {
          id: "shelf_unit",
          label: "Shelf Unit",
          icon: "/svg/furnitureTypes/shelf_unit.svg",
        },
      ],
    },
    {
      location: "Kitchen",
      furniture: [
        {
          id: "dining_table",
          label: "Dining Table",
          icon: "/svg/furnitureTypes/dining_table.svg",
        },
        {
          id: "kitchen_island",
          label: "Kitchen Island",
          icon: "/svg/furnitureTypes/kitchen_island.svg",
        },
        {
          id: "kitchen_cabinet",
          label: "Kitchen Cabinet",
          icon: "/svg/furnitureTypes/kitchen_cabinet.svg",
        },
      ],
    },
    {
      location: "Office / Study",
      furniture: [
        { id: "desk", label: "Desk", icon: "/svg/furnitureTypes/desk.svg" },
        {
          id: "office_chair",
          label: "Office Chair",
          icon: "/svg/furnitureTypes/office_chair.svg",
        },
        {
          id: "filing_cabinet",
          label: "Filing Cabinet",
          icon: "/svg/furnitureTypes/filing_cabinet.svg",
        },
        {
          id: "bookshelf",
          label: "Bookshelf",
          icon: "/svg/furnitureTypes/bookshelf.svg",
        },
      ],
    },
    {
      location: "Hallway / Entry",
      furniture: [
        {
          id: "shoe_rack",
          label: "Shoe Rack",
          icon: "/svg/furnitureTypes/shoe_rack.svg",
        },
        {
          id: "coat_rack",
          label: "Coat Rack",
          icon: "/svg/furnitureTypes/coat_rack.svg",
        },
        {
          id: "console_table",
          label: "Console Table",
          icon: "/svg/furnitureTypes/console_table.svg",
        },
      ],
    },
    {
      location: "Balcony / Outdoor",
      furniture: [
        {
          id: "outdoor_table",
          label: "Outdoor Table",
          icon: "/svg/furnitureTypes/outdoor_table.svg",
        },
        {
          id: "garden_chair",
          label: "Garden Chair",
          icon: "/svg/furnitureTypes/garden_chair.svg",
        },
        {
          id: "plant_shelf",
          label: "Plant Shelf",
          icon: "/svg/furnitureTypes/plant_shelf.svg",
        },
      ],
    },
  ];
  const { user, addRequestToUser } = useUser();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FurnitureAssemblyData>({
    title: "Furniture Assembly",
    type: "",
    location: "",
    quantity: "1",
    position: "floor",
    width: "",
    height: "",
    length: "",
    doors: "",
    drawers: "",
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

  const handleClick = (label: string) => {
    setSelectedItem(label);
    setOpen(true);
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
      type: selectedItem,
      location: selectedLocation,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateFurnitureForm(formData);
    if (error) {
      alert(error);
      return;
    }
    try {
      await handleServiceRequest({
        user,
        newRequest: {
          serviceType: "furniture-assembly",
          details: formData,
        },
        addRequestToUser,
      });
      setFormData({
        title: "Furniture Assembly",
        type: "",
        location: "",
        quantity: "1",
        position: "floor",
        width: "",
        height: "",
        length: "",
        doors: "",
        drawers: "",
        notes: "",
      });
      alert("Service item added to cart!");
      setOpen(false)
    } catch (err) {
      console.error("❌ Error saving to cart:", err);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
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
        <ul className={styles.ul}>
          {activeGroup.furniture.map((item) => (
            <li
              key={item.id}
              className={styles.li}
              onClick={() => handleClick(item.label)}
            >
              <Image
                className={styles.image}
                src={item.icon}
                priority={true}
                alt={item.label}
                width={50}
                height={50}
              />
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      )}
      {open && (
        <aside className={styles.aside}>
          <header>
            <h3>{formData.title}</h3>
            <h4>{selectedLocation}</h4>
            <button onClick={() => setOpen(false)}>Close</button>
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <label>{selectedItem}</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                placeholder="1"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Mount on wall?</label>
              <div>
                <label className={styles.container}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="position"
                    value="wall"
                    checked={formData.position === "wall"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        position: e.target.checked ? "wall" : "floor",
                      }))
                    }
                  />
                  <svg viewBox="0 0 64 64" height="24px" width="24px">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className={styles.path}
                    ></path>
                  </svg>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium">Length (cm)</label>
              <input
                type="number"
                name="width"
                value={formData.width || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Width (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Depth (cm)</label>
              <input
                type="number"
                name="length"
                value={formData.length || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium">Number of Doors</label>
              <input
                type="number"
                name="doors"
                value={formData.doors || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium">Number of Drawers</label>
              <input
                type="number"
                name="drawers"
                value={formData.drawers || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit">submit</button>
          </form>
        </aside>
      )}
    </main>
  );
};

export default FurnitureAssemblyForm;

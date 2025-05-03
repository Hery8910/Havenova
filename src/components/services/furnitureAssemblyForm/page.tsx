"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

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
  const [selectedLocation, setSelectedLocation] = useState<string>("");

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

  return (
    <div className="space-y-6">
      {/* Location Buttons */}
      <div className="flex flex-wrap gap-3">
        {furnitureTypes.map((group) => (
          <button
            key={group.location}
            onClick={() => handleSelect(group.location)}
            className={`px-4 py-2 rounded border transition ${
              selectedLocation === group.location
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {group.location}
          </button>
        ))}
      </div>

      {/* Furniture Grid for selected location */}
      {activeGroup && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {activeGroup.furniture.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-3 border rounded hover:shadow cursor-pointer transition"
            >
              <Image
                className={styles.image}
                src={item.icon}
                priority={true}
                alt={item.label}
                width={30}
                height={30}
              />
              <span className="text-sm text-center">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FurnitureAssemblyForm;

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import Link from "next/link";
import styles from "./page.module.css";
import {ServiceRequestItem } from "../../../types/services";
import {
  removeRequestItemFromStorage,
  clearAllRequestItemsFromStorage,
} from "../../../utils/serviceRequest";

const ServiceCart = () => {
  const { user, removeRequestFromUser, clearAllRequests } = useUser();
  const [localRequests, setLocalRequests] = useState<ServiceRequestItem[]>(
    []
  );


  useEffect(() => {
      setLocalRequests(user.requests);
  }, [user.requests]);
  console.log(user);
  

  if (!localRequests || localRequests.length === 0) {
    return (
      <main>
        <h2 className="text-xl font-semibold">Your Service Cart</h2>
        <p>No services requests.</p>
      </main>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Your Service Cart</h2>
      {localRequests.map((item, index) => (
        <li key={index} className="border p-4 rounded">
          <p className="font-bold">
            {item.details.type} in {item.details.location}
          </p>

          <>
            <p>Quantity: {item.details.quantity}</p>
            <p>Position: {item.details.position}</p>
            <p>
              Dimensions: {item.details.length} x {item.details.width} x {item.details.height}
            </p>
            <p>Doors: {item.details.doors}</p>
            <p>Drawers: {item.details.drawers}</p>
            <p>Notes: {item.details.notes}</p>
          </>

          <button
            onClick={() => {
              removeRequestItemFromStorage(index);
              removeRequestFromUser(index);
              setLocalRequests((prev) => prev.filter((_, i) => i !== index));
            }}
          >
            Remove
          </button>
        </li>
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            clearAllRequestItemsFromStorage();
            clearAllRequests();
            setLocalRequests([]);
          }}
        >
          Clear All
        </button>
        <Link href="/submit-service">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Submit Request
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCart;

'use client'
import React from "react";
import { ServiceRequestItem } from "../../../types/services";
import FurnitureAssemblyRequest from "../furnitureAssembly/furnitureAssemblyRequest/page";
import WindowCleaningRequest from '../windowsCleaning/windowsCleaningRequest/page'
import HouseCleaningRequest from "../houseCleaning/houseCleaningRequest/page";
import KitchenAssemblyRequest from "../kitchenAssembly/kitchenAssemblyRequest/page";
import HouseServiceRequest from "../houseService/houseServiceRequest/page";
import KitchenCleaningRequest from "../kitchenCleaning/kitchenCleaningRequest/page";
interface Props {
  type: ServiceRequestItem["serviceType"];
  requests: ServiceRequestItem[];
}

const ServiceRenderer = ({ type, requests }: Props) => {
  switch (type) {
    case "kitchen-cleaning": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "kitchen-cleaning";  price: number;
          estimatedDuration: number;details: any } =>
          req.serviceType === "kitchen-cleaning"
      );
      return <KitchenCleaningRequest requests={filtered} />;
    }
    case "house-service": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "house-service"; price: number;
          estimatedDuration: number; details: any } =>
          req.serviceType === "house-service"
      );
      return <HouseServiceRequest requests={filtered} />;
    }
    case "kitchen-assembly": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "kitchen-assembly"; price: number;
          estimatedDuration: number; details: any } =>
          req.serviceType === "kitchen-assembly"
      );
      return <KitchenAssemblyRequest requests={filtered} />;
    }
    case "furniture-assembly": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "furniture-assembly"; price: number;
          estimatedDuration: number; details: any } =>
          req.serviceType === "furniture-assembly"
      );
      return <FurnitureAssemblyRequest requests={filtered} />;
    }
    case "window-cleaning": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "window-cleaning"; price: number;
          estimatedDuration: number; details: any } =>
          req.serviceType === "window-cleaning"
      );
      return <WindowCleaningRequest requests={filtered} />;
    }
    case "house-cleaning": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "house-cleaning"; price: number;
          estimatedDuration: number; details: any } =>
          req.serviceType === "house-cleaning"
      );
      return <HouseCleaningRequest requests={filtered} />;
    }
    default:
      return null;
  }
};
export default ServiceRenderer;

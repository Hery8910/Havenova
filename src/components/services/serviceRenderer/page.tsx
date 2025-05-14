'use client'
import React from "react";
import { ServiceRequestItem } from "../../../types/services";
import FurnitureAssemblyRequest from "../furnitureAssembly/furnitureAssemblyRequest/page";
import WindowCleaningRequest from '../windowsCleaning/windowsCleaningRequest/page'
import HouseCleaningRequest from "../houseCleaning/houseCleaningRequest/page";
import KitchenAssemblyRequest from "../kitchenAssembly/kitchenAssemblyRequest/page";
interface Props {
  type: ServiceRequestItem["serviceType"];
  requests: ServiceRequestItem[];
}

const ServiceRenderer = ({ type, requests }: Props) => {
  switch (type) {
    case "kitchen-assembly": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "kitchen-assembly"; details: any } =>
          req.serviceType === "kitchen-assembly"
      );
      return <KitchenAssemblyRequest requests={filtered} />;
    }
    case "furniture-assembly": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "furniture-assembly"; details: any } =>
          req.serviceType === "furniture-assembly"
      );
      return <FurnitureAssemblyRequest requests={filtered} />;
    }
    case "window-cleaning": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "window-cleaning"; details: any } =>
          req.serviceType === "window-cleaning"
      );
      return <WindowCleaningRequest requests={filtered} />;
    }
    case "house-cleaning": {
      const filtered = requests.filter(
        (req): req is { id: string; serviceType: "house-cleaning"; details: any } =>
          req.serviceType === "house-cleaning"
      );
      return <HouseCleaningRequest requests={filtered} />;
    }
    default:
      return null;
  }
};
export default ServiceRenderer;

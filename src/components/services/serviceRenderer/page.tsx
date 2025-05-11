'use client'
import React from "react";
import { ServiceRequestItem } from "../../../types/services";
import FurnitureAssemblyRequest from "../furnitureAssembly/furnitureAssemblyRequest/page";
import WindowCleaningRequest from '../windowsCleaning/windowsCleaningRequest/page'
interface Props {
  type: ServiceRequestItem["serviceType"];
  requests: ServiceRequestItem[];
}

const ServiceRenderer = ({ type, requests }: Props) => {
  switch (type) {
    case "furniture-assembly": {
      const filtered = requests.filter(
        (req): req is { serviceType: "furniture-assembly"; details: any } =>
          req.serviceType === "furniture-assembly"
      );
      return <FurnitureAssemblyRequest requests={filtered} />;
    }
    case "window-cleaning": {
      const filtered = requests.filter(
        (req): req is { serviceType: "window-cleaning"; details: any } =>
          req.serviceType === "window-cleaning"
      );
      return <WindowCleaningRequest requests={filtered} />;
    }
    default:
      return null;
  }
};
export default ServiceRenderer;

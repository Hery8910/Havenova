"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { saveRequestItemToStorage } from "../../../../utils/serviceRequest";
import { validateFurnitureForm } from "../../../../utils/validators";
import {
  FurnitureAssemblyData,
  serviceIcon,
  serviceInput,
} from "../../../../types/services";
import { useUser } from "../../../../contexts/UserContext";
import { handleServiceRequest } from "../../../../services/serviceRequestHandler";
import { IoClose } from "react-icons/io5";

const KitchenAssemblyForm = () => {
  return <>Hello Mother Fuckers!!!</>;
};

export default KitchenAssemblyForm;

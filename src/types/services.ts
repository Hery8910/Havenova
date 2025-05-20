import { User } from "./User";

export interface ServiceOrder {
  id?: string;
  status: ServiceStatus;
  createdAt?: string;
  contact: {
    user: User;
  };
  serviceAddress: string;
  preferredDate: string;
  preferredTime: string;
  services: ServiceRequestItem[];
}
// Agregar correo para despues de 15 dias enviar un mahnung si no han pagado.
export type ServiceStatus = "draft" | "submitted" | "completed" | "cancelled";

export type serviceIcon = {
  src: string;
  alt: string;
};
export type furnitureServiceInput = {
  width: boolean;
  height: boolean;
  depth: boolean;
  doors: boolean;
  drawers: boolean;
  wall: boolean;
};
export type houseServiceInput = {
  area: boolean,
  rooms: boolean,
  ceiling: boolean,
  floorType:boolean,
  remove_old: boolean,
  length: boolean,
};
export type ServiceRequestItem =  {
  id: string;
  serviceType: "house-service";
  details: HouseServiceData;
} | {
  id: string;
  serviceType: "kitchen-assembly";
  details: KitchenAssemblyData;
} | {
  id: string;
  serviceType: "house-cleaning";
  details: HouseCleaningData;
} | {
  id: string;
  serviceType: "furniture-assembly";
  details: FurnitureAssemblyData;
} | {
  id: string;
  serviceType: "window-cleaning";
  details: WindowCleaningData;
}; 
// Aquí irán otros tipos como TVMountingData, etc.

export interface FurnitureAssemblyData {
  title: string;
  icon: serviceIcon;
  type: string;
  location: string;
  quantity: string;
  position: string;
  width: string;
  height: string;
  depth: string;
  doors: number;
  drawers: number;
  notes: string;
}

export interface WindowCleaningData {
  title: string;
  icon: serviceIcon;
  windows: number;
  doors: number;
  access: string;
  notes: string;
}

export interface HouseCleaningData {
  title: string;
  icon: serviceIcon;
  surface: number;
  livingRoom: number;
  bedRooms: number;
  badRooms: number;
  balcon: number;
  kitchen: string;
  house: string;
  notes: string;
}

export interface KitchenAssemblyData {
  title: string;
  icon: serviceIcon;
  length: number;
  lowerCabinets: number;
  upperCabinets: number;
  layout: string; // Ej: "Lineal", "L", "U", etc.
  appliances: string[]; // ✅ Ahora compatible con Select
  island: string;
  disassemblyNeed: string;
  provider: string; // IKEA, Leroy Merlin, etc.
  notes: string;
}

export interface HouseServiceData {
  title: string;
  icon: serviceIcon;
  category: string,
  quantity: number,
  area: string,
  length: string,
  rooms: number,
  ceiling: string,
  floorType: string,
  removeOld: string,
  notes: string,
}
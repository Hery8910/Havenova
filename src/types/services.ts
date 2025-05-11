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

export type ServiceStatus = "draft" | "submitted" | "completed" | "cancelled";

export type serviceIcon = {
  src: string;
  alt: string;
};
export type serviceInput = {
  width: boolean;
  height: boolean;
  depth: boolean;
  doors: boolean;
  drawers: boolean;
  wall: boolean;
};

export type ServiceRequestItem =  {
  serviceType: "furniture-assembly";
  details: FurnitureAssemblyData;
} | {
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

import { User } from "./User";

export interface ServiceOrder {
  id?: string;
  status: ServiceStatus;
  createdAt?: string;
  contact: {
    user: User
  };
  serviceAddress: string;
  preferredDate: string;
  preferredTime: string;
  services: ServiceRequestItem[];
}

export type ServiceStatus = "draft" | "submitted" | "completed" | "cancelled";

export type ServiceRequestItem =
  | {
      serviceType: "furniture-assembly";
      details: FurnitureAssemblyData;
    }
  // Aquí irán otros tipos como TVMountingData, etc.
  ;

export interface FurnitureAssemblyData {
  title: string;
  type: string;
  location: string;
  quantity: string;
  position: string;
  width: string;
  height: string;
  length: string;
  doors: string;
  drawers: string;
  notes: string;
}

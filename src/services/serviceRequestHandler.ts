import { User } from "../types/User";
import { ServiceRequestItem } from "../types/services"; // suponiendo que lo tengas separado
import { saveRequestItemToStorage } from "../utils/serviceRequest";
import { updateUser } from "./userService";

interface Props {
  user: User;
  newRequest: ServiceRequestItem;
  addRequestToUser: (req: ServiceRequestItem) => void;
}

export const handleServiceRequest = async ({
  user,
  newRequest,
  addRequestToUser,
}: Props) => {
  addRequestToUser(newRequest);

  if (user.role === "guest") {
    saveRequestItemToStorage(newRequest);
  } else {
    try {
      await updateUser({
        ...user,
        requests: [...user.requests, newRequest],
      });
    } catch (err) {
      console.error("❌ Failed to sync with backend:", err);
    }
  }
};

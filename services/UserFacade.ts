import axios from "axios";
import { API_URLS } from "@/app/api/api-url";

export const UserFacade = {
  async getTotalUsers(): Promise<string> {
    try {
      const response = await axios.get(API_URLS.TOTAL_USERS);
      return response.data.total_users;
    } catch (error) {
      console.error("Error fetching total users:", error);
      return "Error";
    }
  },
};

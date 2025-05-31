// services/UserDataFacade.ts

export const UserFacade = {
  async getTotalUsers(): Promise<string> {
    try {
      const response = await fetch("http://localhost:8000/api/jumlah-user");
      if (!response.ok) {
        throw new Error("Failed to fetch total users");
      }
      const data = await response.json();
      return data.total_users;
    } catch (error) {
      console.error("Error fetching total users:", error);
      return "Error";
    }
  },
};

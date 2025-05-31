// services/EventDataFacade.ts

export const EventFacade = {
  async getTotalEvent(): Promise<string> {
    try {
      const response = await fetch("http://localhost:8000/api/jumlah-event");
      if (!response.ok) {
        throw new Error("Failed to fetch total event");
      }
      const data = await response.json();
      return data.jumlah_event || "0";
    } catch (error) {
      console.error("Error fetching event data:", error);
      return "Error";
    }
  },
};

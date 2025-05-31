// services/AsosiasiFacade.ts

export const AsosiasiFacade = {
  async getJumlahAsosiasi(): Promise<string> {
    try {
      const response = await fetch("http://localhost:8000/api/jumlah-asosiasi");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data.jumlah_asosiasi?.toString() || "0";
    } catch (error) {
      console.error("Error fetching jumlah asosiasi:", error);
      return "Error";
    }
  },
};

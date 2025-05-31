// services/UMKMFacade.ts

export const UMKMFacade = {
  async getTotalUMKM(): Promise<string> {
    try {
      const response = await fetch("http://localhost:8000/api/jumlah-umkm");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return data.jumlah_umkm?.toString() || "0";
    } catch (error) {
      console.error("UMKMFacade Error:", error);
      return "Error";
    }
  },
};

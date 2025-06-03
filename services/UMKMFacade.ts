// src/facades/UMKMFacade.ts
import axios from "axios";
import { API_URLS } from "@/app/api/api-url";
import { Umkm } from "@/types/umkm";
import { UmkmFormData } from "@/types/umkmFormData";

export class UMKMFacade {
  private static instance: UMKMFacade;

  private constructor() {}

  static getInstance(): UMKMFacade {
    if (!UMKMFacade.instance) {
      UMKMFacade.instance = new UMKMFacade();
    }
    return UMKMFacade.instance;
  }

  async fetchUmkmData(): Promise<Umkm[]> {
    try {
      const response = await axios.get(API_URLS.PEMILIK);
      // Check if response.data.umkm exists and is an array
      return Array.isArray(response.data.umkm) ? response.data.umkm : [];
    } catch (error) {
      console.error("Error fetching UMKM data:", error);
      return [];
    }
  }

  async deleteUmkm(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URLS.PEMILIK}${id}`);
    } catch (error) {
      console.error("Error deleting UMKM:", error);
      throw error;
    }
  }

  async createUmkm(formData: UmkmFormData): Promise<void> {
    try {
      const data = new FormData();
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          data.append(key, (formData as any)[key]);
        }
      }
      await axios.post(API_URLS.PEMILIK, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error creating UMKM:", error);
      throw error;
    }
  }

  async updateUmkm(id: string, formData: UmkmFormData): Promise<void> {
    try {
      const data = new FormData();
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          data.append(key, (formData as any)[key]);
        }
      }
      await axios.put(`${API_URLS.PEMILIK}${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error updating UMKM:", error);
      throw error;
    }
  }

  async getTotalUMKM(): Promise<string> {
    try {
      const response = await axios.get(API_URLS.TOTAL_UMKM);
      return response.data.jumlah_umkm?.toString() || "0";
    } catch (error) {
      console.error("Error fetching total UMKM:", error);
      return "Error";
    }
  }
}
// src/services/FormFacade.ts

import { API_URLS } from "@/app/api/api-url";
import { LoginResponse } from "@/types/login";
import { UmkmFormData } from "@/types/umkmFormData";
import axios from "axios";
import Cookies from "js-cookie";

export class FormFacade {
  public async submitUmkmForm(
    formData: UmkmFormData,
    router: any
  ): Promise<void> {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        form.append(key, value);
      } else if (value) {
        form.append(key, value);
      }
    });

    try {
      const response = await axios.post(API_URLS.PEMILIK, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.umkm?.user_id) {
        const loginData = new FormData();
        loginData.append("email", formData.email);
        loginData.append("password", formData.password);

        const loginResponse = await axios.post(API_URLS.LOGIN, loginData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const data: LoginResponse = loginResponse.data;
        Cookies.set("token", JSON.stringify(data));

        if (data.user.role.name === "umkm") {
          router.push(`/dashboardUmkm/${data.user.id}`);
        } else if (data.user.role.name === "asosiasi") {
          router.push(`/dashboardAsosiasi/${data.user.id}`);
        } else if (data.user.role.name === "admin") {
          router.push(`/admin`);
        }
      } else {
        throw new Error("Unexpected response structure from UMKM API");
      }
    } catch (error: any) {
      console.error(
        "Error submitting UMKM form:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  }
}

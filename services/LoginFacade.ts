"use client";
import axios from "axios";
import Cookies from "js-cookie";
export const LoginFacade = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login response:", response.data);

      const token = response.data.access_token; // Pastikan ini sesuai dengan respon backend-mu
      const role = response.data.user.role.name;
      const id = response.data.user.id;

      if (!token) {
        throw new Error("Token tidak ditemukan di response backend");
      }

      Cookies.set("token", token);
      return { role, id };
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  },

  isLoggedIn(): boolean {
    return !!Cookies.get("token");
  },

  getDashboardPath(role: string, id: number): string {
    if (role === "umkm") return `/dashboardUmkm/${id}`;
    if (role === "asosiasi") return `/dashboardAsosiasi/${id}`;
    if (role === "admin") return "/admin";
    return "/";
  },

  logout(): void {
    Cookies.remove("token");
  },

  getLoginPath(): string {
    return "/";
  },
};

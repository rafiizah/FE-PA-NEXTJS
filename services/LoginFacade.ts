import { API_URLS } from "@/app/api/api-url";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role?: {
    name: string;
  };
}

export const LoginFacade = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        API_URLS.LOGIN,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = response.data.access_token;
      const role = response.data.user.role.name;
      const id = response.data.user.id;

      console.log("Backend response:", response.data);

      if (!token) throw new Error("Token tidak ditemukan di response backend");

      Cookies.set("token", token);
      Cookies.set("role", role);
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
    if (role === "umkm" || role === "umkm") return `/dashboardUmkm/${id}`;
    if (role === "asosiasi") return `/dashboardAsosiasi/${id}`;
    if (role === "admin" || role === "superadmin") return "/admin";
    return "/";
  },

  logout(): void {
    Cookies.remove("token");
    Cookies.remove("role");
  },

  getLoginPath(): string {
    return "/";
  },

  getUserDataFromToken(): { role: string; id: number } {
    const token = Cookies.get("token");
    const role = Cookies.get("role") || "";
    if (!token) {
    //   console.warn("No token found in cookies");
      return { role: "", id: 0 };
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
    //   console.log("Decoded token:", decoded);
      return {
        role,
        id: Number(decoded.sub) || 0,
      };
    } catch (error) {
    //   console.error("Failed to decode token:", error);
      return { role: "", id: 0 };
    }
  },
};

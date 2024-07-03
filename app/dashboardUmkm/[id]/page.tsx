import axios from "axios";
import ProfileUmkm from "@/components/Umkm/ProfileUmkm";
import React from "react";
import Cookies from "js-cookie";

// Generate static params function
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/pemilik");
    const data = await res.json();

    if (data && Array.isArray(data.umkms)) {
      return data.umkms.map((umkm: any) => ({
        id: umkm.user_id.toString(),
      }));
    } else {
      throw new Error("Data structure does not match expected format.");
    }
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

// Function to get UMKM profile data
async function getUmkmProfile(userId: any) {
  try {
    const res = await axios.get(`http://localhost:8000/api/pemilik/${userId}`);
    const data = res.data;
    const token = Cookies.get("token");
    return data;
  } catch (error) {
    console.error("Error fetching UMKM profile:", error);
    return null;
  }
}

// Component to display UMKM profile
const DashboardUmkm: React.FC<{ params: any }> = async ({ params }) => {
  try {
    const userId = params.id;
    const data = await getUmkmProfile(userId);
    if (data) {
      return (
        <ProfileUmkm
          id={data.user_id}
          nama_pemilik={data.nama_pemilik}
          nomor_pemilik={data.nomor_pemilik}
          alamat_pemilik={data.alamat_pemilik}
          nama_usaha={data.nama_usaha}
          alamat_usaha={data.alamat_usaha}
          domisili_usaha={data.domisili_usaha}
          kodePos_usaha={data.kodePos_usaha}
          email_usaha={data.email_usaha}
          tahunBerdiri_usaha={data.tahunBerdiri_usaha}
          jenisbadan_usaha={data.jenisbadan_usaha}
          kategori_usaha={data.kategori_usaha}
          image={data.image}
          deskripsi_usaha={data.deskripsi_usaha}
          legalitas_usaha={data.legalitas_usaha}
          data={undefined}
        />
      );
    } else {
      throw new Error("Profile data not available.");
    }
  } catch (error) {
    console.error("Error in DashboardUmkm component:", error);
    return <h1>Error</h1>;
  }
};

export default DashboardUmkm;

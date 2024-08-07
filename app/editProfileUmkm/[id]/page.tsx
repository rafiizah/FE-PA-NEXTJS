import axios from "axios";
import ProfileUmkm from "@/components/Umkm/ProfileUmkm";
import React from "react";
import Cookies from "js-cookie";
import EditUmkm from "@/components/Forms/EditUmkm";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/pemilik");
    const data = await res.json();

    if (data && Array.isArray(data.umkms)) {
      return data.umkms.map((umkm: any) => ({
        id: umkm.id.toString(),
      }));
    } else {
      throw new Error("Data structure does not match expected format.");
    }
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

async function getFormUmkm(id: any) {
  try {
    const res = await axios.get(`http://localhost:8000/api/pemilik/${id}`);
    const data = res.data;
    const token = Cookies.get("token");
    return data;
  } catch (error) {
    console.error("Error fetching FormUmkm:", error);
    return null;
  }
}

const FormUmkm: React.FC<{ params: any }> = async ({ params }) => {
  try {
    const data = await getFormUmkm(params.id);

    if (data) {
      return (
        <EditUmkm
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
          deskripsi_usaha={data.deskripsi_usaha}
          legalitas_usaha={data.legalitas_usaha}
          data={undefined}
          user_id={data.user_id}
        />
      );
    } else {
      throw new Error("Data formUmkmData tidak tersedia.");
    }
  } catch (error) {
    console.error("Error in FormUmkm component:", error);
    return <h1>Error</h1>;
  }
};

export default FormUmkm;

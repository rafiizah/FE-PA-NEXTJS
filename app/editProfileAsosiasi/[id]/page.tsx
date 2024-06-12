import EditAsosiasi from "@/components/Forms/EditAsosiasi";
import axios from "axios";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/asosiasi");
    const data = await res.json();

    // Pastikan bahwa properti yang diharapkan adalah umkms
    if (data && Array.isArray(data.asosiasis)) {
      return data.asosiasis.map((asosiasi: any) => ({
        id: asosiasi.id.toString(),
      }));
    } else {
      throw new Error("Data structure does not match expected format.");
    }
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

async function getFormAsosiasi(id: any) {
  try {
    const res = await axios.get(`http://localhost:8000/api/asosiasi/${id}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.error("Error fetching FormUmkm:", error);
    return null;
  }
}

export default async function FormAsosiasi({ params }: { params: any }) {
  try {
    console.log(params.id);
    const formAsosiasiData = await getFormAsosiasi(params.id);
    console.log({ formAsosiasiData });

    // Pastikan formUmkmData berisi semua properti yang diperlukan oleh ProfileUmkm
    if (formAsosiasiData) {
      return (
        <EditAsosiasi
          id={formAsosiasiData.user_id}
          namalengkap_asosiasi={formAsosiasiData.namalengkap_asosiasi}
          namasingkat_asosiasi={formAsosiasiData.namasingkat_asosiasi}
          alamat_asosiasi={formAsosiasiData.alamat_asosiasi}
          domisili_asosiasi={formAsosiasiData.domisili_asosiasi}
          email_asosiasi={formAsosiasiData.email_asosiasi}
          nomor_wa_asosiasi={formAsosiasiData.nomor_wa_asosiasi}
          website_asosiasi={formAsosiasiData.website_asosiasi}
          nama_pimpinan_asosiasi={formAsosiasiData.nama_pimpinan_asosiasi}
          tahun_berdiri_asosiasi={formAsosiasiData.tahun_berdiri_asosiasi}
          jenis_bidang_asosiasi={formAsosiasiData.jenis_bidang_asosiasi}
          jumlah_anggota_umkm={formAsosiasiData.jumlah_anggota_umkm}
          legalitas_asosiasi={formAsosiasiData.legalitas_asosiasi}
          formAsosiasiData={undefined}
          user_id={formAsosiasiData.user_id}
        />
      );
    } else {
      throw new Error("Data formAsosiasiData tidak tersedia.");
    }
  } catch (error) {
    console.error("Error in formAsosiasiData component:", error);
    return <h1>Error</h1>;
  }
}

"use client";
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import axios from "axios";
import Cookies from "js-cookie";

export const metadata: Metadata = {
  title: "Form Asosiasi Page | SI UMKM",
  description: "This is Form Asosiasi page ",
  // other metadata
};

interface FormAsosiasiData {
  id: number;
  namalengkap_asosiasi: string;
  namasingkat_asosiasi: string;
  alamat_asosiasi: string;
  domisili_asosiasi: string;
  email_asosiasi: string;
  nomor_wa_asosiasi: string;
  website_asosiasi: string;
  nama_pimpinan_asosiasi: string;
  tahun_berdiri_asosiasi: string;
  jenis_bidang_asosiasi: string;
  jumlah_anggota_umkm: string;
  legalitas_asosiasi: string;
  user_id: number;
  formAsosiasiData: any;
}

const EditAsosiasi: React.FC<FormAsosiasiData> = ({
  id,
  namalengkap_asosiasi,
  namasingkat_asosiasi,
  alamat_asosiasi,
  domisili_asosiasi,
  email_asosiasi,
  nomor_wa_asosiasi,
  website_asosiasi,
  nama_pimpinan_asosiasi,
  tahun_berdiri_asosiasi,
  jenis_bidang_asosiasi,
  jumlah_anggota_umkm,
  legalitas_asosiasi,
  user_id,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namalengkap_asosiasi,
    namasingkat_asosiasi,
    alamat_asosiasi,
    domisili_asosiasi,
    email_asosiasi,
    nomor_wa_asosiasi,
    website_asosiasi,
    nama_pimpinan_asosiasi,
    tahun_berdiri_asosiasi,
    jenis_bidang_asosiasi,
    jumlah_anggota_umkm,
    legalitas_asosiasi,
  });

  const [selectedJumlah, setSelectedJumlah] =
    useState<string>(jumlah_anggota_umkm);
  const [selectedRegency, setSelectedRegency] =
    useState<string>(domisili_asosiasi);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    jenis_bidang_asosiasi
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedSix, setIsCheckedSix] = useState<boolean>(
    legalitas_asosiasi.includes("Akte Pendirian")
  );
  const [isCheckedSeven, setIsCheckedSeven] = useState<boolean>(
    legalitas_asosiasi.includes("NPWP")
  );
  const [isCheckedEight, setIsCheckedEight] = useState<boolean>(
    legalitas_asosiasi.includes("AD/ART")
  );
  const [isCheckedNine, setIsCheckedNine] = useState<boolean>(
    legalitas_asosiasi.includes("SK Kemenkumham")
  );
  const [isCheckedFive, setIsCheckedFive] = useState<boolean>(
    legalitas_asosiasi.includes("Other")
  );

  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter((prev) => !prev);
    };

  const handleJenisBadanUsahaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJumlah(e.target.value);
    setFormData({ ...formData, jumlah_anggota_umkm: e.target.value });
  };

  const handleRegencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(e.target.value);
    setFormData({ ...formData, domisili_asosiasi: e.target.value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, jenis_bidang_asosiasi: e.target.value });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedLegalitas = [];
    if (isCheckedSix) updatedLegalitas.push("Akte Pendirian");
    if (isCheckedSeven) updatedLegalitas.push("NPWP");
    if (isCheckedEight) updatedLegalitas.push("AD/ART");
    if (isCheckedNine) updatedLegalitas.push("SK Kemenkumham");
    if (isCheckedFive) updatedLegalitas.push("Other");

    const dataToUpdate = {
      ...formData,
      legalitas_asosiasi: updatedLegalitas.join(", "), // Join array elements into a string
    };

    try {
      await axios.post(
        `http://localhost:8000/api/asosiasi/${id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      alert("Success update");
      router.push(`/dashboardAsosiasi/${user_id}`); // Redirect to success page or any other page
    } catch (error) {
      console.error("Failed to update data", error);
      alert("Failed to update data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Asosiasi Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Lengkap Asosiasi
                  </label>
                  <input
                    type="text"
                    name="namalengkap_asosiasi"
                    placeholder="Masukkan Nama Lengkap Asosiasi"
                    value={formData.namalengkap_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Singkat Asosiasi
                  </label>
                  <input
                    type="text"
                    name="namasingkat_asosiasi"
                    placeholder="Masukkan Nama Singkat Asosiasi"
                    value={formData.namasingkat_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alamat Asosiasi
                  </label>
                  <input
                    type="text"
                    name="alamat_asosiasi"
                    placeholder="Masukkan Alamat Asosiasi"
                    value={formData.alamat_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Domisili Asosiasi
                  </label>
                  <select
                    id="regency"
                    value={selectedRegency}
                    onChange={handleRegencyChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option selected>Pilih Kabupaten/Kota</option>
                    <option value="KAB. PACITAN">KAB. PACITAN</option>
                    <option value="KAB. PONOROGO">KAB. PONOROGO</option>
                    <option value="KAB. TRENGGALEK">KAB. TRENGGALEK</option>
                    <option value="KAB. TULUNGAGUNG">KAB. TULUNGAGUNG</option>
                    <option value="KAB. BLITAR">KAB. BLITAR</option>
                    <option value="KAB. KEDIRI">KAB. KEDIRI</option>
                    <option value="KAB. MALANG">KAB. MALANG</option>
                    <option value="KAB. LUMAJANG">KAB. LUMAJANG</option>
                    <option value="KAB. JEMBER">KAB. JEMBER</option>
                    <option value="KAB. BANYUWANGI">KAB. BANYUWANGI</option>
                    <option value="KAB. BONDOWOSO">KAB. BONDOWOSO</option>
                    <option value="KAB. SITUBONDO">KAB. SITUBONDO</option>
                    <option value="KAB. PROBOLINGGO">KAB. PROBOLINGGO</option>
                    <option value="KAB. PASURUAN">KAB. PASURUAN</option>
                    <option value="KAB. SIDOARJO">KAB. SIDOARJO</option>
                    <option value="KAB. MOJOKERTO">KAB. MOJOKERTO</option>
                    <option value="KAB. JOMBANG">KAB. JOMBANG</option>
                    <option value="KAB. NGANJUK">KAB. NGANJUK</option>
                    <option value="KAB. MADIUN">KAB. MADIUN</option>
                    <option value="KAB. MAGETAN">KAB. MAGETAN</option>
                    <option value="KAB. NGAWI">KAB. NGAWI</option>
                    <option value="KAB. BOJONEGORO">KAB. BOJONEGORO</option>
                    <option value="KAB. TUBAN">KAB. TUBAN</option>
                    <option value="KAB. LAMONGAN">KAB. LAMONGAN</option>
                    <option value="KAB. GRESIK">KAB. GRESIK</option>
                    <option value="KAB. BANGKALAN">KAB. BANGKALAN</option>
                    <option value="KAB. SAMPANG">KAB. SAMPANG</option>
                    <option value="KAB. PAMEKASAN">KAB. PAMEKASAN</option>
                    <option value="KAB. SUMENEP">KAB. SUMENEP</option>
                    <option value="KOTA KEDIRI">KOTA KEDIRI</option>
                    <option value="KOTA BLITAR">KOTA BLITAR</option>
                    <option value="KOTA MALANG">KOTA MALANG</option>
                    <option value="KOTA PROBOLINGGO">KOTA PROBOLINGGO</option>
                    <option value="KOTA PASURUAN">KOTA PASURUAN</option>
                    <option value="KOTA MOJOKERTO">KOTA MOJOKERTO</option>
                    <option value="KOTA MADIUN">KOTA MADIUN</option>
                    <option value="KOTA SURABAYA">KOTA SURABAYA</option>
                    <option value="KOTA BATU">KOTA BATU</option>
                  </select>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Asosiasi
                  </label>
                  <input
                    type="email"
                    name="email_asosiasi"
                    placeholder="Masukkan Email Asosiasi"
                    value={formData.email_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    No. WhatsApp Asosiasi
                  </label>
                  <input
                    type="tel"
                    name="nomor_wa_asosiasi"
                    placeholder="Masukkan No. WhatsApp Asosiasi"
                    value={formData.nomor_wa_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Website Asosiasi
                  </label>
                  <input
                    type="text"
                    name="website_asosiasi"
                    placeholder="Masukkan Website Asosiasi"
                    value={formData.website_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Pimpinan Asosiasi
                  </label>
                  <input
                    type="text"
                    name="nama_pimpinan_asosiasi"
                    placeholder="Masukkan Nama Pimpinan Asosiasi"
                    value={formData.nama_pimpinan_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tahun Berdiri Asosiasi
                  </label>
                  <input
                    type="number"
                    name="tahun_berdiri_asosiasi"
                    placeholder="Masukkan Tahun Berdiri Asosiasi"
                    value={formData.tahun_berdiri_asosiasi}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jumlah Anggota UMKM
                  </label>
                  <select
                    id="Jumlah"
                    value={selectedJumlah}
                    onChange={handleJenisBadanUsahaChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Pilih Jumlah Anggota</option>
                    <option value="< 50">{"< 50"}</option>
                    <option value="50-100">50-100</option>
                    <option value="100-200">100-200</option>
                    <option value="200-500">200-500</option>
                    <option value="> 500">{"> 500"}</option>
                  </select>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jenis Kategori Asosiasi
                  </label>
                  <select
                    id="kategori"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option selected>Pilih Kategori UMKM</option>
                    <option value="Makanan & Minuman">Makanan & Minuman</option>
                    <option value="Elektronik & Elektronik Rumah Tangga">
                      Elektronik & Elektronik Rumah Tangga
                    </option>
                    <option value="Perlengkapan Usaha & kantor">
                      Perlengkapan Usaha & kantor
                    </option>
                    <option value="Perlatan & Perlengkapan Listrik">
                      Perlatan & Perlengkapan Listrik
                    </option>
                    <option value="Mesin & Perkakas">Mesin & Perkakas</option>
                    <option value="Bahan & Sarana Produksi">
                      Bahan & Sarana Produksi
                    </option>
                    <option value="Otomotif & Aksesoris">
                      Otomotif & Aksesoris
                    </option>
                    <option value="Olahraga & Hiburan">
                      Olahraga & Hiburan
                    </option>
                    <option value="Gift & Craft">Gift & Craft</option>
                    <option value="Mainan & Hobi">Mainan & Hobi</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Produk Segar">Produk Segar</option>
                    <option value="Pertanian & Budidaya">
                      Pertanian & Budidaya
                    </option>
                    <option value=" Kesehatan & Kecantikan">
                      Kesehatan & Kecantikan
                    </option>
                    <option value="Pakaian">Pakaian</option>
                    <option value="Aksesoris Fashion">Aksesoris Fashion</option>
                    <option value="Tekstil & Produk Kulit">
                      Tekstil & Produk Kulit
                    </option>
                    <option value="Tas, Sepatu, & Aksesorisnya">
                      Tas, Sepatu, & Aksesorisnya
                    </option>
                    <option value="Perlengkapan Rumah & Furniture">
                      Perlengkapan Rumah & Furniture
                    </option>
                  </select>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Legalitas Asosiasi
                </label>
              </div>
              <div className="flex mb-7 gap-7">
                <div>
                  <label
                    htmlFor="checkboxLabelOne"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelOne"
                        className="sr-only"
                        checked={isCheckedSix}
                        onChange={handleCheckboxChange(setIsCheckedSix)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedSix &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedSix && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    Akte Pendirian
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="checkboxLabelTwo"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelTwo"
                        className="sr-only"
                        checked={isCheckedSeven}
                        onChange={handleCheckboxChange(setIsCheckedSeven)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedSeven &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedSeven && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    NPWP
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="checkboxLabelThree"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelThree"
                        className="sr-only"
                        checked={isCheckedEight}
                        onChange={handleCheckboxChange(setIsCheckedEight)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedEight &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedEight && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    AD/ART
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="checkboxLabelFour"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelFour"
                        className="sr-only"
                        checked={isCheckedNine}
                        onChange={handleCheckboxChange(setIsCheckedNine)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedNine &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedNine && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    SK Kemenkumham
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="checkboxLabelFive"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelFive"
                        className="sr-only"
                        checked={isCheckedFive}
                        onChange={handleCheckboxChange(setIsCheckedFive)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedFive &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedFive && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    Other...
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full mt-4 bg-primary text-white rounded py-3 font-medium hover:bg-primary-dark transition-all"
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditAsosiasi;

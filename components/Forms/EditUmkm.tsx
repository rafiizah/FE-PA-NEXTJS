"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// Define types for the props
interface PostEditProps {
  id: number;
  nama_pemilik: string;
  nomor_pemilik: string;
  alamat_pemilik: string;
  nama_usaha: string;
  alamat_usaha: string;
  domisili_usaha: string;
  kodePos_usaha: string;
  email_usaha: string;
  tahunBerdiri_usaha: string;
  jenisbadan_usaha: string;
  kategori_usaha: string;
  deskripsi_usaha: string;
  legalitas_usaha: string;
  data: any;
  user_id: number;
}

const PostEdit: React.FC<PostEditProps> = ({
  id,
  nama_pemilik,
  nomor_pemilik,
  alamat_pemilik,
  nama_usaha,
  alamat_usaha,
  domisili_usaha,
  kodePos_usaha,
  email_usaha,
  tahunBerdiri_usaha,
  jenisbadan_usaha,
  kategori_usaha,
  deskripsi_usaha,
  legalitas_usaha,
  data,
  user_id,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_pemilik,
    nomor_pemilik,
    alamat_pemilik,
    nama_usaha,
    alamat_usaha,
    domisili_usaha,
    kodePos_usaha,
    email_usaha,
    tahunBerdiri_usaha,
    jenisbadan_usaha,
    kategori_usaha,
    deskripsi_usaha,
    legalitas_usaha,
  });

  const [selectedJenisBadanUsaha, setSelectedJenisBadanUsaha] =
    useState<string>(jenisbadan_usaha);
  const [selectedRegency, setSelectedRegency] =
    useState<string>(domisili_usaha);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(kategori_usaha);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedOne, setIsCheckedOne] = useState<boolean>(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState<boolean>(false);
  const [isCheckedThree, setIsCheckedThree] = useState<boolean>(false);
  const [isCheckedFour, setIsCheckedFour] = useState<boolean>(false);
  const [isCheckedFive, setIsCheckedFive] = useState<boolean>(false);

  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter((prev) => !prev);
    };

  const handleJenisBadanUsahaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenisBadanUsaha(e.target.value);
    setFormData({ ...formData, jenisbadan_usaha: e.target.value });
  };

  const handleRegencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(e.target.value);
    setFormData({ ...formData, domisili_usaha: e.target.value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, kategori_usaha: e.target.value });
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
    if (isCheckedOne) updatedLegalitas.push("NPWP");
    if (isCheckedTwo) updatedLegalitas.push("NIB");
    if (isCheckedThree) updatedLegalitas.push("IUMK");
    if (isCheckedFour) updatedLegalitas.push("SIUP");
    if (isCheckedFive) updatedLegalitas.push("Other");

    const dataToUpdate = {
      ...formData,
      legalitas_usaha: updatedLegalitas.join(", "), // Join array elements into a string
    };

    try {
      await axios.post(
        `http://localhost:8000/api/pemilik/${id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      alert("Success update");
      router.push(`/dashboardUmkm/${user_id}`); // Redirect to success page or any other page
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
        {/* <!-- UMKM Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              UMKM Form
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Pemilik
                  </label>
                  <input
                    type="text"
                    name="nama_pemilik"
                    placeholder="Masukkan Nama Pemilik"
                    value={formData.nama_pemilik}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Hp Aktif Pemilik
                  </label>
                  <input
                    type="number"
                    name="nomor_pemilik"
                    placeholder="Masukkan Nomer Hp Aktif Pemilik"
                    value={formData.nomor_pemilik}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat Pemilik
                </label>
                <input
                  type="text"
                  name="alamat_pemilik"
                  placeholder="Masukkan Alamat Pemilik"
                  value={formData.alamat_pemilik}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Usaha
                  </label>
                  <input
                    type="text"
                    name="nama_usaha"
                    placeholder="Masukkan Nama Usaha"
                    value={formData.nama_usaha}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alamat Usaha
                  </label>
                  <input
                    type="text"
                    name="alamat_usaha"
                    placeholder="Masukkan Alamat Usaha"
                    value={formData.alamat_usaha}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="regency"
                  >
                    Domisili Usaha
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

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kode Pos Usaha
                  </label>
                  <input
                    type="number"
                    name="kodePos_usaha"
                    placeholder="Masukkan Kode Pos Usaha"
                    value={formData.kodePos_usaha}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Usaha
                  </label>
                  <input
                    type="email"
                    name="email_usaha"
                    placeholder="Masukkan Email Usaha"
                    value={formData.email_usaha}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tahun Berdiri Usaha
                  </label>
                  <input
                    type="text"
                    name="tahunBerdiri_usaha"
                    placeholder="Masukkan Tahun Berdiri Usaha"
                    value={formData.tahunBerdiri_usaha}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jenis Badan Usaha
                  </label>
                  <select
                    id="jenisBadanUsaha"
                    value={selectedJenisBadanUsaha}
                    onChange={handleJenisBadanUsahaChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option selected>Pilih Jenis Badan</option>
                    <option value="Perseorangan">Perseorangan</option>
                    <option value="PT">PT</option>
                    <option value="CV">CV</option>
                    <option value="UD">UD</option>
                  </select>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kategori Usaha
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
                <label className="mb-2.5 block text-black dark:text-white">
                  Deskripsi Usaha
                </label>
                <textarea
                  name="deskripsi_usaha"
                  placeholder="Masukkan Deskripsi Usaha"
                  value={formData.deskripsi_usaha}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Legalitas Usaha
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
                        checked={isCheckedOne}
                        onChange={handleCheckboxChange(setIsCheckedOne)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedOne &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedOne && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    NPWP
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
                        checked={isCheckedTwo}
                        onChange={handleCheckboxChange(setIsCheckedTwo)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedTwo &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedTwo && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    NIB
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
                        checked={isCheckedThree}
                        onChange={handleCheckboxChange(setIsCheckedThree)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedThree &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedThree && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    IUMK
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
                        checked={isCheckedFour}
                        onChange={handleCheckboxChange(setIsCheckedFour)}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isCheckedFour &&
                          "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isCheckedFour && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                    SIUP
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
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray  ${
                  isLoading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;

"use client";
import { Metadata } from "next";
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import FormData from "form-data";

export const metadata: Metadata = {
  title: "Form UMKM Page | SI UMKM",
  description: "This is Form UMKM page ",
  // other metadata
};

interface FormUmkmProps {
  id: string; // Define the 'id' prop here
}

const FormUmkm: React.FC<FormUmkmProps> = ({ id }) => {
  //state
  const router = useRouter();
  const [nama_pemilik, setNama_pemilik] = useState("");
  const [nomor_pemilik, setNomor_pemilik] = useState("");
  const [alamat_pemilik, setAlamat_pemilik] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama_usaha, setNama_usaha] = useState("");
  const [alamat_usaha, setAlamat_usaha] = useState("");
  const [kodePos_usaha, setKodePos_usaha] = useState("");
  const [email_usaha, setEmail_usaha] = useState("");
  const [tahunBerdiri_usaha, setTahunBerdiri_usaha] = useState("");
  const [deskripsi_usaha, setDeskripsi_usaha] = useState("");
  const [legalitas_usaha, setLegalitas_usaha] = useState("");
  const [selectedJenisBadanUsaha, setSelectedJenisBadanUsaha] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [isCheckedOne, setIsCheckedOne] = useState<boolean>(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState<boolean>(false);
  const [isCheckedThree, setIsCheckedThree] = useState<boolean>(false);
  const [isCheckedFour, setIsCheckedFour] = useState<boolean>(false);
  const [isCheckedFive, setIsCheckedFive] = useState<boolean>(false);

  const handleCheckboxOneChange = () => setIsCheckedOne(!isCheckedOne);
  const handleCheckboxTwoChange = () => setIsCheckedTwo(!isCheckedTwo);
  const handleCheckboxThreeChange = () => setIsCheckedThree(!isCheckedThree);
  const handleCheckboxFourChange = () => setIsCheckedFour(!isCheckedFour);
  const handleCheckboxFiveChange = () => setIsCheckedFive(!isCheckedFive);

  const FormData = require("form-data");
  const axios = require("axios");

  //function "handleFileChange"
  const [image, setImage] = useState<File | null>(null); // Menggunakan tipe File untuk state image

  const handleJenisBadanUsahaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenisBadanUsaha(e.target.value);
  };

  const handleRegencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(e.target.value);
  };
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageData = e.target.files[0];
      // Validasi apakah file adalah gambar dan memiliki ekstensi yang diizinkan
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.test(imageData.name)) {
        console.error("The image must be a file of type: jpeg, png, jpg, gif.");
        return;
      }
      // Set image state dengan objek File yang benar
      setImage(imageData);
    }
  };

  const storePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    let legalitasValues = [];
    if (isCheckedOne) {
      legalitasValues.push("NPWP");
    }
    if (isCheckedTwo) {
      legalitasValues.push("NIB");
    }
    if (isCheckedThree) {
      legalitasValues.push("IUMK");
    }
    if (isCheckedFour) {
      legalitasValues.push("SIUP");
    }
    if (isCheckedFive) {
      legalitasValues.push("Other...");
    }
    const legalitas_usaha = legalitasValues.join(",");

    formData.append("nama_pemilik", nama_pemilik);
    formData.append("nomor_pemilik", nomor_pemilik);
    formData.append("alamat_pemilik", alamat_pemilik);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nama_usaha", nama_usaha);
    formData.append("alamat_usaha", alamat_usaha);
    formData.append("domisili_usaha", selectedRegency);
    formData.append("kodePos_usaha", kodePos_usaha);
    formData.append("email_usaha", email_usaha);
    formData.append("tahunBerdiri_usaha", tahunBerdiri_usaha);
    formData.append("jenisbadan_usaha", selectedJenisBadanUsaha);
    formData.append("kategori_usaha", selectedCategory);
    formData.append("deskripsi_usaha", deskripsi_usaha);
    formData.append("legalitas_usaha", legalitas_usaha);

    if (image) {
      formData.append("image", image);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/pemilik",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    try {
      const response = await axios.request(config);

      if (response.data && response.data.umkm && response.data.umkm.user_id) {
        const loginData = new FormData();
        loginData.append("email", email);
        loginData.append("password", password);

        let loginForm = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:8000/api/login",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: loginData,
        };

        axios
          .request(loginForm)
          .then((LoginResponse: any) => {
            Cookies.set("token", JSON.stringify(LoginResponse.data));
            if (LoginResponse.data.user.role.name === "umkm") {
              router.push(`/dashboardUmkm/${LoginResponse.data.user.id}`);
            } else if (LoginResponse.data.user.role.name === "asosiasi") {
              router.push(`/dashboardAsosiasi/${LoginResponse.data.user.id}`);
            } else if (LoginResponse.data.user.role.name === "admin") {
              router.push(`/admin`);
            }
          })
          .catch((error: any) => {
            console.error(error.response.data.message);
          });
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          {/* <!-- UMKM Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                UMKM Form
              </h3>
            </div>
            <form method="post">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Pemilik
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Pemilik"
                      value={nama_pemilik}
                      onChange={(e) => setNama_pemilik(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nomor Hp Aktif Pemilik
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan  Nomer Hp Aktif Pemilik"
                      value={nomor_pemilik}
                      onChange={(e) => setNomor_pemilik(e.target.value)}
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
                    placeholder="Masukkan Alamat Pemilik"
                    value={alamat_pemilik}
                    onChange={(e) => setAlamat_pemilik(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email Pemilik
                    </label>
                    <input
                      type="email"
                      placeholder="Masukkan Email Pemilik"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Masukkan Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Usaha"
                      value={nama_usaha}
                      onChange={(e) => setNama_usaha(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alamat Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Alamat usaha"
                      value={alamat_usaha}
                      onChange={(e) => setAlamat_usaha(e.target.value)}
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
                      placeholder="Masukkan kode Pos Usaha"
                      value={kodePos_usaha}
                      onChange={(e) => setKodePos_usaha(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Usaha
                  </label>
                  <input
                    type="email"
                    placeholder="Masukkan Email Usaha"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={email_usaha}
                    onChange={(e) => setEmail_usaha(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tahun Berdiri Usaha
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Tahun Berdiri Usaha"
                      value={tahunBerdiri_usaha}
                      onChange={(e) => setTahunBerdiri_usaha(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Badan Usaha
                    </label>
                    <label
                      htmlFor="jenisBadanUsaha"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
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
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="kategori"
                    >
                      Kategori Usaha
                    </label>
                    <select
                      id="kategori"
                      value={selectedCategory}
                      onChange={handleCategory}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option selected>Pilih Kategori UMKM</option>
                      <option value="Makanan & Minuman">
                        Makanan & Minuman
                      </option>
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
                      <option value="Aksesoris Fashion">
                        Aksesoris Fashion
                      </option>
                      <option value="Tekstil & Produk Kulit">
                        Tekstil & Produk Kulit
                      </option>
                      <option value="Tas, Sepat, & Aksesorisnya">
                        Tas, Sepat, & Aksesorisnya
                      </option>
                      <option value="Perlengkapan Rumah & Furniture">
                        Perlengkapan Rumah & Furniture
                      </option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label
                      className=" mb-2.5 block text-black dark:text-white"
                      htmlFor="file_input"
                    >
                      Unggah Gambar Umkm
                    </label>
                    <input
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      id="file_input"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Deskripsi Usaha
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masukkan Deskripsi Usaha"
                    value={deskripsi_usaha}
                    onChange={(e) => setDeskripsi_usaha(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-4.5">
                  <label className=" block text-black dark:text-white">
                    Legalitas Usaha
                  </label>
                </div>
                <div className="flex mb-7 gap-7">
                  {/* <CheckboxOne /> */}
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
                          value={legalitas_usaha}
                          onChange={handleCheckboxOneChange}
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
                          onChange={handleCheckboxTwoChange}
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
                          onChange={handleCheckboxThreeChange}
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
                          onChange={handleCheckboxFourChange}
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
                          onChange={handleCheckboxFiveChange}
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
                  onClick={storePost}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUmkm;

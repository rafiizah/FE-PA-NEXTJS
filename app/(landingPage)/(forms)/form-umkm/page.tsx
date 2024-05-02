"use client";
import { Metadata } from "next";
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";
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
  const [domisili_usaha, setDomisili_usaha] = useState("");
  const [kodePos_usaha, setKodePos_usaha] = useState("");
  const [email_usaha, setEmail_usaha] = useState("");
  const [tahunBerdiri_usaha, setTahunBerdiri_usaha] = useState("");
  const [kategori_usaha, setKategori_usaha] = useState("");
  const [deskripsi_usaha, setDeskripsi_usaha] = useState("");
  const [legalitas_usaha, setLegalitas_usaha] = useState("");
  const [selectedJenisBadanUsaha, setSelectedJenisBadanUsaha] =
    useState<string>("");

  const [isCheckedOne, setIsCheckedOne] = useState<boolean>(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState<boolean>(false);
  const [isCheckedThree, setIsCheckedThree] = useState<boolean>(false);
  const [isCheckedFour, setIsCheckedFour] = useState<boolean>(false);

  const handleCheckboxOneChange = () => setIsCheckedOne(!isCheckedOne);
  const handleCheckboxTwoChange = () => setIsCheckedTwo(!isCheckedTwo);
  const handleCheckboxThreeChange = () => setIsCheckedThree(!isCheckedThree);
  const handleCheckboxFourChange = () => setIsCheckedFour(!isCheckedFour);

  const FormData = require("form-data");
  const axios = require("axios");

  //function "handleFileChange"
  const [image, setImage] = useState<File | null>(null); // Menggunakan tipe File untuk state image

  const handleJenisBadanUsahaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenisBadanUsaha(e.target.value);
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

  //method "storePost"
  const storePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Membuat objek FormData
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

    const legalitas_usaha = legalitasValues.join(",");

    // Menambahkan data ke FormData
    formData.append("nama_pemilik", nama_pemilik);
    formData.append("nomor_pemilik", nomor_pemilik);
    formData.append("alamat_pemilik", alamat_pemilik);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nama_usaha", nama_usaha);
    formData.append("alamat_usaha", alamat_usaha);
    formData.append("domisili_usaha", domisili_usaha);
    formData.append("kodePos_usaha", kodePos_usaha);
    formData.append("email_usaha", email_usaha);
    formData.append("tahunBerdiri_usaha", tahunBerdiri_usaha);
    formData.append("jenisbadan_usaha", selectedJenisBadanUsaha);
    formData.append("kategori_usaha", kategori_usaha);
    formData.append("deskripsi_usaha", deskripsi_usaha);
    formData.append("legalitas_usaha", legalitas_usaha);

    // Menambahkan data gambar ke FormData
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

    axios
      .request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
        console.log(response);
        router.push(`/dashboardUmkm/${response.data.user.id}`);
      })
      .catch((error: any) => {
        console.log(error);
      });
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
                    <label className="mb-2.5 block text-black dark:text-white">
                      Domisili Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Domisili Usaha"
                      value={domisili_usaha}
                      onChange={(e) => setDomisili_usaha(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
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
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kategori Usaha
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Kategori Usaha"
                      value={kategori_usaha}
                      onChange={(e) => setKategori_usaha(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
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
                      NPWP / Nomor Pokok Wajib Pajak
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
                      NIB / Nomor Induk Berusaha
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
                      IUMK / Izin Usaha Mikro Kecil
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
                      SIUP / Surat Izin Usaha Perdagangan
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={storePost}
                >
                  Send Message
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

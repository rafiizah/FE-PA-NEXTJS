

"use client";
import { Metadata } from "next";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { UmkmFormData } from "@/types/umkmFormData";
import { useState } from "react";
import {
  REGENCY_OPTIONS,
  JENIS_BADAN_USAHA_OPTIONS,
  KATEGORI_USAHA_OPTIONS,
} from "@/constant/form-data";
import { FormFacade } from "@/services/FormFacade";

export const metadata: Metadata = {
  title: "Form UMKM Page | SI UMKM",
  description: "This is Form UMKM page",
};

interface FormUmkmProps {
  id: string;
}

const FormUmkm: React.FC<FormUmkmProps> = ({ id }) => {
  const router = useRouter();
  const formFacade = new FormFacade();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UmkmFormData>({
    defaultValues: {
      nama_pemilik: "",
      nomor_pemilik: "",
      alamat_pemilik: "",
      email: "",
      password: "",
      nama_usaha: "",
      alamat_usaha: "",
      domisili_usaha: "",
      kodePos_usaha: "",
      email_usaha: "",
      tahunBerdiri_usaha: "",
      jenisbadan_usaha: "",
      kategori_usaha: "",
      deskripsi_usaha: "",
      legalitas_usaha: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const [legalitas, setLegalitas] = useState({
    NPWP: false,
    NIB: false,
    IUMK: false,
    SIUP: false,
    Other: false,
  });

  const handleCheckboxChange = (key: keyof typeof legalitas) => {
    setLegalitas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [image, setImage] = useState<File | undefined>(undefined);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageData = e.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.test(imageData.name)) {
        setError("The image must be a file of type: jpeg, png, jpg, gif.");
        return;
      }
      setImage(imageData);
      setError(null);
    }
  };

  const onSubmit = async (data: UmkmFormData) => {
    setIsLoading(true);
    setError(null);

    const legalitasValues = Object.entries(legalitas)
      .filter(([_, checked]) => checked)
      .map(([key]) => key)
      .join(",");
    if (!legalitasValues) {
      setError("Please select at least one legalitas option");
      setIsLoading(false);
      return;
    }

    const formData: UmkmFormData = {
      ...data,
      legalitas_usaha: legalitasValues,
      image,
    };

    try {
      await formFacade.submitUmkmForm(formData, router);
    } catch (err: any) {
      setError(err.message || "Submission failed");
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
              UMKM Form
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {error && <div className="mb-4 text-red-500">{error}</div>}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Pemilik
                  </label>
                  <Controller
                    name="nama_pemilik"
                    control={control}
                    rules={{ required: "Nama Pemilik is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Masukkan Nama Pemilik"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.nama_pemilik ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.nama_pemilik && (
                    <p className="mt-1 text-red-500">
                      {errors.nama_pemilik.message}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Hp Aktif Pemilik
                  </label>
                  <Controller
                    name="nomor_pemilik"
                    control={control}
                    rules={{ required: "Nomor Hp is required" }}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Masukkan Nomer Hp Aktif Pemilik"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.nomor_pemilik ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.nomor_pemilik && (
                    <p className="mt-1 text-red-500">
                      {errors.nomor_pemilik.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat Pemilik
                </label>
                <Controller
                  name="alamat_pemilik"
                  control={control}
                  rules={{ required: "Alamat Pemilik is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Masukkan Alamat Pemilik"
                      {...field}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        errors.alamat_pemilik ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.alamat_pemilik && (
                  <p className="mt-1 text-red-500">
                    {errors.alamat_pemilik.message}
                  </p>
                )}
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Pemilik
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                        message: "Invalid email format",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="email"
                        placeholder="Masukkan Email Pemilik"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        type="password"
                        placeholder="Masukkan Password"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Usaha
                  </label>
                  <Controller
                    name="nama_usaha"
                    control={control}
                    rules={{ required: "Nama Usaha is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Masukkan Nama Usaha"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.nama_usaha ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.nama_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.nama_usaha.message}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alamat Usaha
                  </label>
                  <Controller
                    name="alamat_usaha"
                    control={control}
                    rules={{ required: "Alamat Usaha is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Masukkan Alamat usaha"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.alamat_usaha ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.alamat_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.alamat_usaha.message}
                    </p>
                  )}
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
                  <Controller
                    name="domisili_usaha"
                    control={control}
                    rules={{ required: "Domisili Usaha is required" }}
                    render={({ field }) => (
                      <select
                        id="regency"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.domisili_usaha ? "border-red-500" : ""
                        }`}
                      >
                        {REGENCY_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.domisili_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.domisili_usaha.message}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kode Pos Usaha
                  </label>
                  <Controller
                    name="kodePos_usaha"
                    control={control}
                    rules={{ required: "Kode Pos Usaha is required" }}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Masukkan kode Pos Usaha"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.kodePos_usaha ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.kodePos_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.kodePos_usaha.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email Usaha
                </label>
                <Controller
                  name="email_usaha"
                  control={control}
                  rules={{
                    required: "Email Usaha is required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                      message: "Invalid email format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      placeholder="Masukkan Email Usaha"
                      {...field}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        errors.email_usaha ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.email_usaha && (
                  <p className="mt-1 text-red-500">
                    {errors.email_usaha.message}
                  </p>
                )}
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tahun Berdiri Usaha
                  </label>
                  <Controller
                    name="tahunBerdiri_usaha"
                    control={control}
                    rules={{ required: "Tahun Berdiri Usaha is required" }}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Masukkan Tahun Berdiri Usaha"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.tahunBerdiri_usaha ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.tahunBerdiri_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.tahunBerdiri_usaha.message}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jenis Badan Usaha
                  </label>
                  <Controller
                    name="jenisbadan_usaha"
                    control={control}
                    rules={{ required: "Jenis Badan Usaha is required" }}
                    render={({ field }) => (
                      <select
                        id="jenisBadanUsaha"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.jenisbadan_usaha ? "border-red-500" : ""
                        }`}
                      >
                        {JENIS_BADAN_USAHA_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.jenisbadan_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.jenisbadan_usaha.message}
                    </p>
                  )}
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
                  <Controller
                    name="kategori_usaha"
                    control={control}
                    rules={{ required: "Kategori Usaha is required" }}
                    render={({ field }) => (
                      <select
                        id="kategori"
                        {...field}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.kategori_usaha ? "border-red-500" : ""
                        }`}
                      >
                        {KATEGORI_USAHA_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.kategori_usaha && (
                    <p className="mt-1 text-red-500">
                      {errors.kategori_usaha.message}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
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
                <Controller
                  name="deskripsi_usaha"
                  control={control}
                  rules={{ required: "Deskripsi Usaha is required" }}
                  render={({ field }) => (
                    <textarea
                      rows={3}
                      placeholder="Masukkan Deskripsi Usaha"
                      {...field}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        errors.deskripsi_usaha ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.deskripsi_usaha && (
                  <p className="mt-1 text-red-500">
                    {errors.deskripsi_usaha.message}
                  </p>
                )}
              </div>
              <div className="mb-4.5">
                <label className="block text-black dark:text-white">
                  Legalitas Usaha
                </label>
              </div>
              <div className="flex mb-7 gap-7">
                {["NPWP", "NIB", "IUMK", "SIUP", "Other"].map((option) => (
                  <div key={option}>
                    <label
                      htmlFor={`checkboxLabel${option}`}
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`checkboxLabel${option}`}
                          className="sr-only"
                          checked={legalitas[option as keyof typeof legalitas]}
                          onChange={() =>
                            handleCheckboxChange(
                              option as keyof typeof legalitas
                            )
                          }
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                            legalitas[option as keyof typeof legalitas] &&
                            "border-primary bg-gray dark:bg-transparent"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${
                              legalitas[option as keyof typeof legalitas] &&
                              "bg-primary"
                            }`}
                          ></span>
                        </div>
                      </div>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray ${
                  isLoading ? "opacity-50 pointer-events-none" : ""
                }`}
                disabled={isLoading}
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

export default FormUmkm;

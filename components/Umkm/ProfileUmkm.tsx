"use client";
import Image from "next/image";
import React from "react";
import EditUmkm from "@/components/Forms/EditUmkm";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

interface getFormUmkm {
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
  image: string;
  deskripsi_usaha: string;
  legalitas_usaha: string;
  data: any;
}

const ProfileUmkm: React.FC<getFormUmkm> = ({
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
  image,
  deskripsi_usaha,
  legalitas_usaha,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Profile UMKM
            </h3>
            <a href={`/editProfileUmkm/${id}`}>
              <Button color="success" className="text-white">
                Edit Profile
              </Button>
            </a>
          </div>
          <div className="p-6.5">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6">
              <Image
                src={`http://localhost:8000/${image}`}
                className="w-full h-full object-cover "
                alt={`Gambar ${image}`}
                width={128} // Ensure this matches the container size for better loading
                height={128} //
              />
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Pemilik :{" "}
                  {nama_pemilik ? nama_pemilik : "Nama Pemilik Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nomer Hp Aktif Pemilik :{" "}
                  {nomor_pemilik
                    ? nomor_pemilik
                    : "Nomor Pemilik Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat Pemilik :{" "}
                  {alamat_pemilik
                    ? alamat_pemilik
                    : "Alamat Pemilik Tidak Tersedia"}
                </label>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Usaha :{" "}
                  {nama_usaha ? nama_usaha : "Nama Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat Usaha :{" "}
                  {alamat_usaha ? alamat_usaha : "Alamat Usaha Tidak Tersedia"}
                </label>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Domisili Usaha :{" "}
                  {domisili_usaha
                    ? domisili_usaha
                    : "Domisili Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Kode Pos Usaha :{" "}
                  {kodePos_usaha
                    ? kodePos_usaha
                    : "Kode Pos Usaha Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email Usaha :{" "}
                  {email_usaha ? email_usaha : "Email Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tahun Berdiri Usaha :{" "}
                  {tahunBerdiri_usaha
                    ? tahunBerdiri_usaha
                    : "Tahun Berdiri Usaha Tidak Tersedia"}
                </label>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jenis Badan Usaha :{" "}
                  {jenisbadan_usaha
                    ? jenisbadan_usaha
                    : "Jenis Badan Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Kategori Usaha :{" "}
                  {kategori_usaha
                    ? kategori_usaha
                    : "Kategori Usaha Tidak Tersedia"}
                </label>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Deskripsi Usaha :{" "}
                  {deskripsi_usaha
                    ? deskripsi_usaha
                    : "Deskripsi Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Legalitas Usaha :{" "}
                  {legalitas_usaha
                    ? legalitas_usaha
                    : "Legalitas Usaha Tidak Tersedia"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUmkm;

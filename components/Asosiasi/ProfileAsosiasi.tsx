"use client";
import Image from "next/image";
import React from "react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

interface FormAsosiasiData {
  id: number;
  namalengkap_asosiasi: string;
  namasingkat_asosiasi: string;
  alamat_asosiasi: string;
  kodepos_asosiasi: string;
  email_asosiasi: string;
  nomor_wa_asosiasi: string;
  website_asosiasi: string;
  nama_pimpinan_asosiasi: string;
  tahun_berdiri_asosiasi: string;
  jenis_bidang_asosiasi: string;
  jumlah_anggota_umkm: string;
  legalitas_asosiasi: string;
  image: string;
  formAsosiasiData: any;
}

const ProfileAsosiasi: React.FC<FormAsosiasiData> = ({
  id,
  namalengkap_asosiasi,
  namasingkat_asosiasi,
  alamat_asosiasi,
  kodepos_asosiasi,
  email_asosiasi,
  nomor_wa_asosiasi,
  website_asosiasi,
  nama_pimpinan_asosiasi,
  tahun_berdiri_asosiasi,
  jenis_bidang_asosiasi,
  jumlah_anggota_umkm,
  legalitas_asosiasi,
  image,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Profile Asosiasi
            </h3>
            <a href={`/editProfileAsosiasi/${id}`}>
              <Button color="success" className="text-white">
                Edit Profile
              </Button>
            </a>
          </div>
          <div className="p-6.5">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6">
              <Image
                src={`http://localhost:8000/${image}`}
                // className="rounded-full"
                alt={`Gambar ${image}`}
                width={128}
                height={128}
                objectFit="cover"
              />
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Lengkap Asosiasi :{" "}
                  {namalengkap_asosiasi
                    ? namalengkap_asosiasi
                    : "Nama Lengkap Asosiasi Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Singkat Asosiasi :{" "}
                  {namasingkat_asosiasi
                    ? namasingkat_asosiasi
                    : "Nama Singkat Asosiasi Pemilik Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alamat Asosiasi :{" "}
                  {alamat_asosiasi
                    ? alamat_asosiasi
                    : "Alamat Asosiasi Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email Asosiasi :{" "}
                  {email_asosiasi
                    ? email_asosiasi
                    : "Email Asosiasi Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nomor WA Asosiasi :{" "}
                  {nomor_wa_asosiasi
                    ? nomor_wa_asosiasi
                    : "Nomor WA Asosiasi Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Website Asosiasi :{" "}
                  {website_asosiasi
                    ? website_asosiasi
                    : "Website Asosiasi Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Pimpinan Asosiasi :{" "}
                  {nama_pimpinan_asosiasi
                    ? nama_pimpinan_asosiasi
                    : "Nama Pimpinan Asosiasi Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tahun Berdiri Asosiasi :{" "}
                  {tahun_berdiri_asosiasi
                    ? tahun_berdiri_asosiasi
                    : "Tahun Berdiri Asosiasi Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jenis Bidang Asosiasi :{" "}
                  {jenis_bidang_asosiasi
                    ? jenis_bidang_asosiasi
                    : "Jenis Bidang Asosiasi Tidak Tersedia"}
                </label>
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jumalah Anggota UMKM :{" "}
                  {jumlah_anggota_umkm
                    ? jumlah_anggota_umkm
                    : "Jumalah Anggota UMKM Tidak Tersedia"}
                </label>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Legalitas Asosiasi :{" "}
                  {legalitas_asosiasi
                    ? legalitas_asosiasi
                    : "Legalitas Asosiasi Tidak Tersedia"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAsosiasi;

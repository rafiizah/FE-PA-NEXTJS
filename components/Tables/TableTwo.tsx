"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "../Icon/SearchIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";

interface Asosiasi {
  id: string;
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
  image: string;
}

async function deleteMember(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/asosiasi/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting member:", error);
  }
}

export default function TableTwo() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Asosiasi[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/asosiasi");
      const asosiasiData: Asosiasi[] = response.data.asosiasi;

      setData(asosiasiData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteMember(id);
    // Refresh data after deletion
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };

  const onClear = () => {
    setFilterValue("");
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (filterValue) {
      filteredData = filteredData.filter(
        (item) =>
          item.namalengkap_asosiasi
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.namasingkat_asosiasi
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [data, filterValue]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  return (
    <>
      <Input
        isClearable
        className="w-full sm:max-w-[44%] mb-3"
        placeholder="Search by name..."
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={onClear}
        onValueChange={onSearchChange}
      />
      <Table
        topContent={<b>Asosiasi</b>}
        className="justify-center"
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="namalengkap_asosiasi">
            Nama lengkap Asosiasi
          </TableColumn>
          <TableColumn key="namasingkat_asosiasi">
            Nama Singkat Asosiasi
          </TableColumn>
          <TableColumn key="alamat_asosiasi">Alamat Asosiasi</TableColumn>
          <TableColumn key="domisili_asosiasi">Domisili Asosiasi</TableColumn>
          <TableColumn key="email_asosiasi">Email Asosiasi</TableColumn>
          <TableColumn key="nomor_wa_asosiasi">
            Nomor WA Aktif Asosiasi
          </TableColumn>
          <TableColumn key="website_asosiasi">Website Asosiasi</TableColumn>
          <TableColumn key="nama_pimpinan_asosiasi">
            Nama Pimpinan Asosiasi
          </TableColumn>
          <TableColumn key="tahun_berdiri_asosiasi">
            Tahun Berdiri Asosiasi
          </TableColumn>
          <TableColumn key="jenis_bidang_asosiasi">
            Jenis Bidang Asosiasi
          </TableColumn>
          <TableColumn key="jumlah_anggota_umkm">
            Jumlah Anggota UMKM
          </TableColumn>
          <TableColumn key="legalitas_asosiasi">Legalitas Asosiasi</TableColumn>
          <TableColumn key="image">Gambar Logo Asosiasi</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.namalengkap_asosiasi}</TableCell>
              <TableCell>{item.namasingkat_asosiasi}</TableCell>
              <TableCell>{item.alamat_asosiasi}</TableCell>
              <TableCell>{item.domisili_asosiasi}</TableCell>
              <TableCell>{item.email_asosiasi}</TableCell>
              <TableCell>{item.nomor_wa_asosiasi}</TableCell>
              <TableCell>{item.website_asosiasi}</TableCell>
              <TableCell>{item.nama_pimpinan_asosiasi}</TableCell>
              <TableCell>{item.tahun_berdiri_asosiasi}</TableCell>
              <TableCell>{item.jenis_bidang_asosiasi}</TableCell>
              <TableCell>{item.jumlah_anggota_umkm}</TableCell>
              <TableCell>{item.legalitas_asosiasi}</TableCell>
              <TableCell>
                {" "}
                <Image
                  src={`http://localhost:8000/${item.image}`}
                  className="rounded-3"
                  alt={`Gambar ${item.image}`}
                  width={100}
                  height={100}
                />
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip color="danger" content="Delete user">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import { Umkm } from "@/types/umkm";
import { API_URLS } from "@/app/api/api-url";
import { UMKMFacade } from "@/services/UMKMFacade"; // Correct import

export default function TableOne() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Umkm[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const umkmFacade = UMKMFacade.getInstance();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const umkmData = await umkmFacade.fetchUmkmData();
      // Ensure umkmData is an array before setting state
      if (Array.isArray(umkmData)) {
        setData(umkmData);
      } else {
        console.error("Fetched data is not an array:", umkmData);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await umkmFacade.deleteUmkm(id);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };

  const onClear = () => {
    setFilterValue("");
  };

  const filteredItems = useMemo(() => {
    // Ensure data is an array before spreading
    let filteredData = Array.isArray(data) ? [...data] : [];
    if (filterValue) {
      filteredData = filteredData.filter(
        (item) =>
          item.nama_pemilik.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.nama_usaha.toLowerCase().includes(filterValue.toLowerCase())
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
        topContent={<b>UMKM</b>}
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
          <TableColumn align="center" key="nama_pemilik">
            Nama Pemilik
          </TableColumn>
          <TableColumn key="nomor_pemilik">Nomor Pemilik</TableColumn>
          <TableColumn key="alamat_pemilik">Alamat Pemilik</TableColumn>
          <TableColumn key="nama_usaha">Nama Usaha</TableColumn>
          <TableColumn key="alamat_usaha">Alamat Usaha</TableColumn>
          <TableColumn key="domisili_usaha">Domisili Usaha</TableColumn>
          <TableColumn key="kodePos_usaha">Kode Pos Usaha</TableColumn>
          <TableColumn key="email_usaha">Email Usaha</TableColumn>
          <TableColumn key="tahunBerdiri_usaha">
            Tahun Berdiri Usaha
          </TableColumn>
          <TableColumn key="jenisbadan_usaha">Jenis Badan Usaha</TableColumn>
          <TableColumn key="kategori_usaha">Kategori Usaha</TableColumn>
          <TableColumn key="deskripsi_usaha">Deskripsi Usaha</TableColumn>
          <TableColumn key="legalitas_usaha">Legalitas Usaha</TableColumn>
          <TableColumn key="image">Gambar Produk Usaha</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama_pemilik}</TableCell>
              <TableCell>{item.nomor_pemilik}</TableCell>
              <TableCell>{item.alamat_pemilik}</TableCell>
              <TableCell>{item.nama_usaha}</TableCell>
              <TableCell>{item.alamat_usaha}</TableCell>
              <TableCell>{item.domisili_usaha}</TableCell>
              <TableCell>{item.kodePos_usaha}</TableCell>
              <TableCell>{item.email_usaha}</TableCell>
              <TableCell>{item.tahunBerdiri_usaha}</TableCell>
              <TableCell>{item.jenisbadan_usaha}</TableCell>
              <TableCell>{item.kategori_usaha}</TableCell>
              <TableCell>{item.deskripsi_usaha}</TableCell>
              <TableCell>{item.legalitas_usaha}</TableCell>
              <TableCell>
                <Image
                  src={`http://localhost:8000${item.image.startsWith('/') ? '' : '/'}${item.image}`}
                  className="rounded-3"
                  alt={`Gambar ${item.id}`}
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

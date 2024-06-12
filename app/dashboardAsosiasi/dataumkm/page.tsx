// components/DataJoinEvent.tsx
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/Icon/SearchIcon";
import Cookies from "js-cookie";

interface UmkmAsosiasi {
  id: number;
  tanggal_bergabung: string;
  asosiasi_id: number;
  umkm: {
    id: number;
    nama_pemilik: string;
    nama_usaha: string;
  };
}

const DataJoinEvent: React.FC = () => {
  const [umkmAsosiasi, setUmkmAsosiasi] = useState<UmkmAsosiasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [asosiasiId, setAsosiasiId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchUmkmAsosiasi = async () => {
      if (asosiasiId === null) return;

      try {
        const response = await axios.get(
          "http://localhost:8000/api/umkmAsosiasi"
        );
        const filteredData = response.data.data.filter(
          (item: UmkmAsosiasi) => item.asosiasi_id === asosiasiId
        );
        setUmkmAsosiasi(filteredData);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUmkmAsosiasi();
  }, [asosiasiId]);

  const getTokenFromLocalStorage = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const fetchAsosiasiId = useCallback(async (user_id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/asosiasi/${user_id}`
      );
      const asosiasiId = Number(response.data.id);
      setAsosiasiId(asosiasiId);
      return response.data;
    } catch (error) {
      console.error("Error fetching asosiasi_id: ", error);
    }
  }, []);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const user = token.user;
      if (user && user.id) {
        fetchAsosiasiId(user.id);
      } else {
        console.error("User ID not found in token");
      }
    }
  }, [fetchAsosiasiId]);

  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };

  const onClear = () => {
    setFilterValue("");
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...umkmAsosiasi];

    if (filterValue) {
      filteredData = filteredData.filter((item) =>
        item.umkm.nama_usaha.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [umkmAsosiasi, filterValue]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Input
        isClearable
        className="w-full sm:max-w-[44%] mb-3"
        placeholder="Search by business name..."
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={onClear}
        onValueChange={onSearchChange}
      />
      <Table
        topContent={<b>UMKM Asosiasi</b>}
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
          <TableColumn key="tanggal_bergabung">Tanggal Bergabung</TableColumn>
          <TableColumn key="nama_pemilik">Nama Pemilik</TableColumn>
          <TableColumn key="nama_usaha">Nama UMKM</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.tanggal_bergabung}</TableCell>
              <TableCell>{item.umkm.nama_pemilik}</TableCell>
              <TableCell>{item.umkm.nama_usaha}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataJoinEvent;

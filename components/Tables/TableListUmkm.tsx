import React, { useState, useEffect, useMemo } from "react";
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
import { SearchIcon } from "../Icon/SearchIcon";

interface Umkm {
  id: string;
  nama_pemilik: string;
  nama_usaha: string;
  email_usaha: string;
}

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Umkm[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pemilik");
      const umkmData: Umkm[] = response.data.umkm;

      console.log("Data Umkm:", umkmData);
      setData(umkmData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

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
          item.nama_pemilik.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.nama_usaha.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.email_usaha.toLowerCase().includes(filterValue.toLowerCase())
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
          <TableColumn key="nama_pemilik">Nama Pemilik</TableColumn>
          <TableColumn key="nama_usaha">Nama Usaha</TableColumn>
          <TableColumn key="email_usaha">Email Usaha</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama_pemilik}</TableCell>
              <TableCell>{item.nama_usaha}</TableCell>
              <TableCell>{item.email_usaha}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

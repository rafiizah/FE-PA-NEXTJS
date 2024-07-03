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

interface Asosiasi {
  id: string;
  namalengkap_asosiasi: string;
  alamat_asosiasi: string;
  email_asosiasi: string;
}

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Asosiasi[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
        (items) =>
          items.namalengkap_asosiasi
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          items.alamat_asosiasi
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          items.email_asosiasi.toLowerCase().includes(filterValue.toLowerCase())
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
          <TableColumn key="namalengkap_asosiasi">Nama Asosiasi</TableColumn>
          <TableColumn key="alamat_asosiasi">Alamat Asosiasi Usaha</TableColumn>
          <TableColumn key="email_asosiasi">Email Asosiasi</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.namalengkap_asosiasi}</TableCell>
              <TableCell>{item.alamat_asosiasi}</TableCell>
              <TableCell>{item.email_asosiasi}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

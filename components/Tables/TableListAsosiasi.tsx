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
} from "@nextui-org/react";

interface Asosiasi {
  id: string;
  namalengkap_asosiasi: string;
  alamat_asosiasi: string;
  email_asosiasi: string;
}

export default function App() {
  const [data, setData] = useState<Asosiasi[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/asosiasi");
      const asosiasiData: Asosiasi[] = response.data.asosiasi;

      console.log("Data Umkm:", asosiasiData); // Tambahkan log untuk memeriksa struktur data
      setData(asosiasiData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
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
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="namalengkap_asosiasi">Nama Asosaisi</TableColumn>
        <TableColumn key="alamat_asosiasi">Alamat Asosiasi</TableColumn>
        <TableColumn key="email_asosiasi">Email Asosiasi</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.namalengkap_asosiasi}</TableCell>
            <TableCell>{item.alamat_asosiasi}</TableCell>
            <TableCell>{item.email_asosiasi}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

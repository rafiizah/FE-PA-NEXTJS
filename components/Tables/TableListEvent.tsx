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

interface Event {
  id: string;
  nama_event: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

async function deleteMember(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/event/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting member:", error);
  }
}

export default function TableOne() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/event");
      const eventData: Event[] = response.data.event;

      setData(eventData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMember(id);
      // Menghapus item yang sesuai dengan id dari state data
      const newData = data.filter((item) => item.id !== id);
      // Memperbarui state data dengan data yang sudah dihapus
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
    let filteredData = [...data];

    if (filterValue) {
      filteredData = filteredData.filter((item) =>
        item.nama_event.toLowerCase().includes(filterValue.toLowerCase())
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
        topContent={<b>Event</b>}
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
          <TableColumn align={"center"} key="nama_event">
            Nama Event
          </TableColumn>
          <TableColumn key="date">Tanggal</TableColumn>
          <TableColumn key="time">Jam</TableColumn>
          <TableColumn key="location">Lokasi</TableColumn>
          <TableColumn key="description">Deskripsi</TableColumn>
          <TableColumn key="image">Gambar Produk Usaha</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama_event}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.description}</TableCell>
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

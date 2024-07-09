"use client";
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

interface Event {
  date: string;
  umkm: {
    id: number;
    nama_pemilik: string;
    nama_usaha: string;
  };
  event: {
    id: number;
    nama_event: string;
  };
}

const DataJoinEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/event-registrations"
        );
        console.log("API Response:", response.data); // Debugging: log the API response
        setEvents(response.data); // Assuming response.data is the array of events
      } catch (err) {
        setError("Error fetching data");
        console.error("Fetch error:", err); // Debugging: log the error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };

  const onClear = () => {
    setFilterValue("");
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...events];

    if (filterValue) {
      filteredData = filteredData.filter((item) =>
        item.event.nama_event.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [events, filterValue]);

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
        placeholder="Search by event name..."
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={onClear}
        onValueChange={onSearchChange}
      />
      <Table
        topContent={<b>Join Event</b>}
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
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="nama_pemilik">Nama Pemilik</TableColumn>
          <TableColumn key="nama_usaha">Nama UMKM</TableColumn>
          <TableColumn key="nama_event">Nama Event</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={`${item.umkm.id}-${item.event.id}`}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.umkm.nama_pemilik}</TableCell>
              <TableCell>{item.umkm.nama_usaha}</TableCell>
              <TableCell>{item.event.nama_event}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataJoinEvent;

"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Checkbox, cn, Pagination } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";

interface Asosiasi {
  id: string;
  namalengkap_asosiasi: string;
}

interface Props {
  id: string;
}

export default function Page({ id }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<Asosiasi[]>([]);
  const [asosiasis, setAsosiasi] = useState<Asosiasi[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);
  const [umkmId, setUmkmId] = useState<string>();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/asosiasi?page=${page}&limit=${rowsPerPage}`
      );
      // console.log("Fetched Data:", response.data);
      setAsosiasi(response.data.asosiasi || []);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const getTokenFromLocalStorage = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const fetchUmkmId = useCallback(async (user_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pemilik/${user_id}`
      );
      setUmkmId(response.data.id || "");
      return response.data;
    } catch (error) {
      console.error("Error fetching umkm_id: ", error);
    }
  }, []);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const user = token.user;
      if (user && user.id) {
        fetchUmkmId(user.id);
      } else {
        console.error("User ID not found in token");
      }
    }
  }, [fetchUmkmId]);

  const handleCheckboxChange = (asosiasi: Asosiasi) => {
    const selectedIndex = selectedUsers.findIndex(
      (selectedUser) => selectedUser.id === asosiasi.id
    );
    if (selectedIndex === -1) {
      setSelectedUsers([...selectedUsers, asosiasi]);
    } else {
      const updatedSelectedUsers = [...selectedUsers];
      updatedSelectedUsers.splice(selectedIndex, 1);
      setSelectedUsers(updatedSelectedUsers);
    }
    // console.log("Selected Users:", selectedUsers);
  };

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const data = asosiasis.slice(start, end);
    // console.log("Paginated Data:", data);
    return data;
  }, [asosiasis, page, rowsPerPage]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handleSubmit = async () => {
    const postData = {
      umkm_id: umkmId,
      asosiasi_id: selectedUsers.map((user) => user.id),
      di_terima: true,
      tanggal_bergabung: new Date().toISOString().split("T")[0],
    };

    console.log("Post Data: ", postData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/umkmAsosiasi/create",
        postData
      );
      console.log("Response:", response.data);
      alert("Data has been successfully submitted!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container py-9 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
              Raw Denim Heirloom Man Braid
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh
              mi pug.
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {paginatedData.length > 0 &&
              paginatedData.map((asosiasi, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2"
                >
                  <Checkbox
                    aria-label={asosiasi.namalengkap_asosiasi}
                    data-id={asosiasi.id}
                    isSelected={selectedUsers.some(
                      (selectedUser) => selectedUser.id === asosiasi.id
                    )}
                    onChange={() => handleCheckboxChange(asosiasi)}
                    size="sm"
                    color="primary"
                    classNames={{
                      base: cn(
                        "inline-flex w-full max-w-md bg-content1",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                      label: "w-full",
                    }}
                  >
                    {asosiasi.namalengkap_asosiasi}
                  </Checkbox>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={totalPages}
              onChange={(pageNumber) => setPage(pageNumber)}
            />
          </div>
          <button
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 bg-meta-10 focus:outline-none hover:bg-meta-5 rounded text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}

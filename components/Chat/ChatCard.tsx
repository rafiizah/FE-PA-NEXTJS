"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";

interface Asosiasi {
  id: string;
  namalengkap_asosiasi: string;
  jenis_bidang_asosiasi: string;
}

interface Props {
  id: string;
}

export default function Page({ id }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [asosiasis, setAsosiasi] = useState<Asosiasi[]>([]);
  const [umkmId, setUmkmId] = useState<string>();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/asosiasi?limit=1000`
      );
      setAsosiasi(response.data.asosiasi || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleSelectionChange = (keys: Set<React.Key>) => {
    setSelectedUsers(new Set(Array.from(keys).map(String)));
  };

  const selectedValues = Array.from(selectedUsers)
    .map((key) => {
      const item = asosiasis.find((a) => a.id === key);
      return item ? item.namalengkap_asosiasi : key;
    })
    .join(", ");

  const handleSubmit = async () => {
    const postData = {
      umkm_id: umkmId,
      asosiasi_id: Array.from(selectedUsers),
      di_terima: true,
      tanggal_bergabung: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/umkmAsosiasi/create",
        postData
      );
      alert("Data has been successfully submitted!");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting data:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error submitting data:", error);
      }
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
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 justify-center">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedValues || "Select Asosiasi"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Asosiasi selection"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedUsers}
                onSelectionChange={(keys) =>
                  handleSelectionChange(new Set(keys))
                }
                className="max-h-60 overflow-auto"
              >
                {asosiasis.map((asosiasi) => (
                  <DropdownItem
                    key={asosiasi.id}
                    description={asosiasi.jenis_bidang_asosiasi}
                  >
                    <div>
                      <div>{asosiasi.namalengkap_asosiasi}</div>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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

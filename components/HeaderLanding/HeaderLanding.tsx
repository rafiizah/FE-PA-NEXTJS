"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Login from "@/components/Auth/Login";
import Cookies from "js-cookie"; // Ensure js-cookie is imported

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface UserRole {
  name: string;
}

interface User {
  id: number;
  role: UserRole;
}

interface TokenData {
  access_token: string;
  user: User;
}

const Headeranding = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
      const userData: TokenData = JSON.parse(savedToken);
      setUserRole(userData.user.role.name); // Extract user role name
      setUserId(userData.user.id); // Extract user ID
    }
  }, []);

  // Determine dashboard URL based on user role
  const getDashboardUrl = () => {
    if (userRole === "admin") {
      return `/admin`;
    } else if (userRole === "umkm") {
      return `/dashboardUmkm/${userId}`;
    } else if (userRole === "asosiasi") {
      return `/dashboardAsosiasi/${userId}`;
    } else {
      return "/";
    }
  };

  return (
    <header
      className="fixed top-0 z-50 w-full text-gray-600 body-font shadow-3 transition-all"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium mr-6 text-gray-900 mb-4 md:mb-0">
          <Image
            className="flex pl-15"
            src={"/images/logo/new-siumkm.png"}
            alt="Logo"
            width={250}
            height={32}
          />
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <ul className="flex w-full justify-between items-center text-black-500">
            <a href="/" className="mr-5 text-lg hover:text-meta-5">
              Home
            </a>
            <a href="/Repository" className="mr-5 text-lg hover:text-meta-5">
              Repository
            </a>
            <a href="/Events" className="mr-5 text-lg hover:text-meta-5">
              Event
            </a>
          </ul>
        </nav>
        {token ? (
          <a
            href={getDashboardUrl()} // Set the href based on the user's role
            className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-meta-10 text-meta-10 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-meta-10 hover:text-white transition-all"
          >
            Dashboard
          </a>
        ) : (
          <button
            onClick={onOpen}
            className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-meta-10 text-meta-10 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-meta-10 hover:text-white transition-all"
          >
            Login
          </button>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          placement="top-center"
          size={"4xl"}
        >
          <ModalContent>
            <Login />
          </ModalContent>
        </Modal>
      </div>
    </header>
  );
};

export default Headeranding;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Login from "@/components/Auth/Login";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LoginFacade } from "@/services/LoginFacade";
import Link from "next/link";

interface DecodedToken {
  sub: string;
}

const HeaderLanding = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  const updateUserData = () => {
    const { role, id } = LoginFacade.getUserDataFromToken();
    setToken(Cookies.get("token") || null);
    setUserRole(role);
    setUserId(id);
  };

  useEffect(() => {
    updateUserData();
    const interval = setInterval(() => {
      const newToken = Cookies.get("token");
      if (newToken !== token) {
        updateUserData();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    updateUserData();
    onClose();
  };

  const getDashboardUrl = () => {
    if (userRole === "admin" || userRole === "superadmin") {
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
        <Link
          href="/"
          className="flex title-font font-medium mr-6 text-gray-900 mb-4 md:mb-0"
        >
          <Image
            className="flex pl-15"
            src={"/images/logo/new-siumkm.png"}
            alt="Logo"
            width={250}
            height={32}
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <ul className="flex w-full justify-between items-center text-black-500">
            <Link href="/" className="mr-5 text-lg hover:text-meta-5">
              Home
            </Link>
            <Link href="/Repository" className="mr-5 text-lg hover:text-meta-5">
              Repository
            </Link>
            {/* <Link href="/Events" className="mr-5 text-lg hover:text-meta-5">
              Event
            </Link> */}
          </ul>
        </nav>
        {token ? (
          <Link
            href={getDashboardUrl()}
            className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-meta-10 text-meta-10 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-meta-10 hover:text-white transition-all"
          >
            Dashboard
          </Link>
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
            <Login onLoginSuccess={handleLoginSuccess} onClose={onClose} />
          </ModalContent>
        </Modal>
      </div>
    </header>
  );
};

export default HeaderLanding;

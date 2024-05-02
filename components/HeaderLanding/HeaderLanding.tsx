"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownUser from "../Header/DropdownUser";
const Headeranding = () => {
  return (
    <header className="fixed top-0 w-full text-gray-600 body-font shadow-3  transition-all ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium mr-6  text-gray-900 mb-4 md:mb-0">
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
            <a href="" className="mr-5 text-lg hover:text-meta-5">
              Event
            </a>
            <a href="" className="mr-5 text-lg hover:text-meta-5">
              About
            </a>
          </ul>
        </nav>
        <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-secondary text-secondary bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-secondary hover:text-white transition-all ">
          <a href="/login"> Login</a>
        </button>
      </div>
    </header>
  );
};

export default Headeranding;

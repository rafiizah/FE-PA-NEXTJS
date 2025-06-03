"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginFacade } from "@/services/LoginFacade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "../Icon/LogoutIcon";
import DropdownArrowIcon from "../Icon/DropdownArrowIcon";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    toast.error("Logged out successfully! Redirecting...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    LoginFacade.logout();
    setTimeout(() => {
      router.push(LoginFacade.getLoginPath());
    }, 2000);
  };

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <ToastContainer aria-live="polite" />

      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/user-circle-svgrepo-com.svg"
            alt="User"
          />
        </span>
        <DropdownArrowIcon className="hidden sm:block" />{" "}
        {/* Use DropdownArrow component */}
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <LogoutIcon /> {/* Use LogoutIcon component */}
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;

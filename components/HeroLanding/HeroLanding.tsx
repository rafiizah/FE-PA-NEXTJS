"use client";
import React from "react";
import Image from "next/image";
import FormUmkm from "@/components/Forms/FormUmkm";
import FormAsosiasi from "@/components/Forms/FormAsosiasi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ButtonUmkm from "../Button/JadikanUmkm";
const HeroLanding = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("");
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex pt-28 px-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to our platform
            <div className="hidden lg:inline-block">dedicated to UMKM!</div>
          </h1>
          <p className="mb-8 leading-relaxed">
            Our platform is your dedicated partner in navigating the
            complexities of the business landscape, offering tailor-made
            solutions designed specifically for your UMKM growth. Empower your
            business with our suite of innovative tools and resources, crafted
            to elevate your journey towards success. Join us today and unlock
            the full potential of your UMKM!
          </p>
          <div className="flex justify-center">
            <ButtonUmkm />
            <button
              onClick={onOpen}
              className="ml-4 inline-flex text-gray-700 bg-meta-10 hover:bg-meta-5 border-0 py-2 px-6 rounded text-lg"
            >
              Jadikan Asosiasi
            </button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onClose}
              placement="top-center"
              size={"4xl"}
              scrollBehavior={"inside"}
            >
              <ModalContent>
                <FormAsosiasi id={""} />
              </ModalContent>
            </Modal>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded shadow-2"
            alt="logo"
            src={"/images/4043726.jpg"}
            width={700}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;

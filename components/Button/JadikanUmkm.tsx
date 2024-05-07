import React from "react";
import FormUmkm from "@/components/Forms/FormUmkm";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ButtonUmkm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="inline-flex text-gray-700 bg-meta-10 hover:bg-meta-5 border-0 py-2 px-6 rounded text-lg"
      >
        Jadikan UMKM
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="top-center"
        size={"4xl"}
        scrollBehavior="inside"
      >
        <ModalContent>
          <FormUmkm id={""} />
        </ModalContent>
      </Modal>
    </>
  );
}

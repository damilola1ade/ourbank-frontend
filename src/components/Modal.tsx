import React, { ReactNode } from "react";
import {
  Button as ModalTrigger,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

interface ModalProps {
  triggerButton: ReactNode;
  buttonSize?: { base: string; lg: string };
  modalSize?: string;
  motionPreset?: string;
  overlayBg?: string;
  backdropFilter?: string;
  contentBg?: string;
  borderColor?: string;
  headerColor?: string;
  closeButtonColor?: string;
  children: ReactNode;
  headerText: string;
  handleClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  triggerButton,
  buttonSize = { base: "sm", lg: "lg" },
  modalSize = "md",
  motionPreset = "slideInRight",
  overlayBg = "blackAlpha.300",
  backdropFilter = "blur(10px) hue-rotate(0deg)",
  contentBg = "black",
  borderColor = "white",
  headerColor = "white",
  closeButtonColor = "white",
  children,
  headerText,
  handleClose,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalTrigger onClick={onOpen} size={buttonSize.base}>
        {triggerButton}
      </ModalTrigger>

      <ChakraModal
        isOpen={isOpen}
        onClose={handleClose || onClose}
        isCentered
        size={modalSize}
        motionPreset={motionPreset}
      >
        <ModalOverlay bg={overlayBg} backdropFilter={backdropFilter} />
        <ModalContent
          bg={contentBg}
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
        >
          <ModalHeader color={headerColor}>{headerText}</ModalHeader>
          <ModalCloseButton color={closeButtonColor} />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

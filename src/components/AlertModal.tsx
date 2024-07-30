import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Icon,
  Text,
  Divider,
} from "@chakra-ui/react";

import { MdInfoOutline } from "react-icons/md";

export const AlertModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checked, setChecked] = useState<boolean>(false);
  const [lastOpened, setLastOpened] = useState<Date | null>(null);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("alertModal");
    const lastOpenedTime = storedTimestamp ? new Date(storedTimestamp) : null;
    setLastOpened(lastOpenedTime);
  }, []);

  useEffect(() => {
    if (
      !checked &&
      (!lastOpened ||
        new Date().getTime() - lastOpened.getTime() >= 24 * 60 * 60 * 1000)
    ) {
      const timer = setTimeout(() => {
        onOpen();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [checked, lastOpened, onOpen]);

  const handleClose = () => {
    if (checked) {
      localStorage.setItem("alertModal", new Date().toISOString());
    }
    onClose();
  };

  return (
    <>
      <Modal
        size="xs"
        isOpen={isOpen}
        onClose={handleClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent pos="absolute" right={-1}>
          <ModalHeader as={Text} fontSize="md" p={2} color="black">
            <Flex alignItems="center" gap={2}>
              <Icon as={MdInfoOutline} />
              <Text>Info</Text>
            </Flex>
          </ModalHeader>
          <Divider borderColor="gray.500" />

          <ModalBody p={3} fontSize="sm">
            Click on card to reveal
            <Checkbox
              mt={4}
              size="sm"
              borderColor="gray.400"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            >
              Do not show this message again
            </Checkbox>
            <Button
              mt={4}
              size="sm"
              w="100px"
              bg="black"
              _hover={{ bg: "#002C8A" }}
              color="white"
              borderRadius="md"
              onClick={handleClose}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

import { Box, CloseButton, Slide, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export const Cookie = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = setTimeout(onOpen, 1000);
    return () => clearTimeout(timer);
  }, [onOpen]);

  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
      <Box
        p="40px"
        color="black"
        mt="4"
        bg="white"
        rounded="md"
        shadow="md"
        position="relative"
        fontWeight="medium"
        textAlign="center"
        fontSize={{ base: "sm", md: "md", "2xl": "xl" }}
      >
        Hey guys! The virtual card prototype has been implemented! Please sign
        up and test. Would appreciate feedback 🙏. Cheers!
        <CloseButton
          onClick={onClose}
          position="absolute"
          top="10px"
          right="10px"
          size={{ base: "md", lg: "lg" }}
          bg="white"
          color="black"
        />
      </Box>
    </Slide>
  );
};

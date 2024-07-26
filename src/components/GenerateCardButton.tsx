import React from "react";
import { Box, Button } from "@chakra-ui/react";

export const AnimatedButton = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Box onClick={onClick} className={className} position="relative">
      <Box
        position="absolute"
        bg="dot-whiteAlpha.50"
        _before={{
          content: '""',
          bg: "dot-blackAlpha.50",
          position: "absolute",
          inset: 0,
        }}
      />
      <Box position="relative" zIndex={40}>
        {children}
      </Box>
    </Box>
  );
};

export const GenerateCardButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <AnimatedButton onClick={onClick}>
      <Button
        position="relative"
        height="12"
        overflow="hidden"
        rounded="full"
        padding="1px"
        _focus={{
          outline: "none",
          ring: 2,
          ringColor: "slate.400",
          ringOffset: 2,
          ringOffsetColor: "slate.50",
        }}
      >
        <Box
          position="absolute"
          inset="-100%"
          animation="spin 6s linear infinite"
          bgGradient="conic-gradient(from 90deg at 50% 50%, #59c0cd 0%, #59c0cd 10%, #59c0cd 100%)"
        />
        <Box
          display="inline-flex"
          height="full"
          width="320px"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          rounded="full"
          bg="slate.950"
          px={3}
          py={1}
          fontSize="md"
          fontWeight="medium"
          color="white"
          zIndex={72}
        >
          Generate card
        </Box>
      </Button>
    </AnimatedButton>
  );
};

import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  text,
  colorScheme,
  ref,
  onClick,
  isLoading,
  isDisabled,
  type,
}: {
  text: string;
  colorScheme?: "red" | "purple";
  ref?: any;
  onClick?: any;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "button" | "submit";
}) => {
  return (
    <ChakraButton
      onClick={onClick}
      size={{ base: "sm", lg: "lg" }}
      colorScheme={colorScheme}
      ref={ref}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type={type}
    >
      {text}
    </ChakraButton>
  );
};

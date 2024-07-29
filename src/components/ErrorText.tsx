import { Text } from "@chakra-ui/react";

export const ErrorText = ({ error }: { error: any }) => {
  return (
    <Text color="red" align="left" mt={1} fontSize={{ base: "xs", md: "sm" }}>
      {error}
    </Text>
  );
};

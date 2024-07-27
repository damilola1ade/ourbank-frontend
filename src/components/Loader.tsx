import { Flex, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Flex minH='70vh' justifyContent='center' alignItems='center'>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.800"
        color="white"
        size="xl"
      />
    </Flex>
  );
};
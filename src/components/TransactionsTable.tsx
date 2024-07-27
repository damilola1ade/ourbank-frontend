import moment from "moment";

import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const TransactionsTable = () => {
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      color="white"
      fontSize={{ base: "xs", lg: "sm" }}
    >
      <TableContainer w={{ base: "320px", lg: "960px" }}>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Platform</Th>
              <Th>Amount in USD</Th>
              <Th>Amount in Naira</Th>
              <Th>Transaction date</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Amazon Prime</Td>
              <Td>$ 2.5</Td>
              <Td>₦ 5,000</Td>
              <Td>27th July, 2024 : 12:30pm</Td>
            </Tr>
            <Tr>
            <Td>Namecheap</Td>
              <Td>$ 7.99</Td>
              <Td>₦ 12,300</Td>
              <Td>2th July, 2024 : 2:30pm</Td>
            </Tr>
            <Tr>
            <Td>Playstation Store</Td>
              <Td>$ 60</Td>
              <Td>₦ 80,000</Td>
              <Td>25th June, 2024 : 6:30pm</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

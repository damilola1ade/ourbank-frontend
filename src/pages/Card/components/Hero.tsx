import { useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { FormValues } from "@/types";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useDeleteCardMutation, useGetSingleCardQuery } from "@/store/cards";

import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/tailwindcss-3dcard";

import {
  Button,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Stack,
  Text,
  Divider,
  FormLabel,
  Input,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { toast } from "sonner";
import { Loader, TransactionsTable } from "@/components";
import { ArrowLeftIcon } from "lucide-react";

const Hero = () => {
  const { cardId }: any = useParams();

  const { handleSubmit, control } = useForm<FormValues>();

  const cancelRef = useRef(null);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading: isCardLoading } = useGetSingleCardQuery(cardId);

  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await deleteCard({
        body: { password: data.password },
        cardId: cardId,
      }).unwrap();

      if (response) {
        toast.success("Card deleted");
        navigate(-1);
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  if (isCardLoading) {
    return <Loader />;
  }

  return (
    <>
      <Button
        variant="none"
        color="white"
        as={Link}
        to={"/card-generator"}
        leftIcon={<ArrowLeftIcon />}
        p={0}
        mx={{ base: 8, lg: 12 }}
      >
        Go back
      </Button>

      <Flex
        mt={12}
        w="100%"
        flexDirection={{ base: "column-reverse", lg: "row" }}
        justifyContent="space-around"
        alignItems="center"
        gap={12}
        color="white"
        fontSize={{ base: "sm", lg: "md" }}
      >
        <Stack w={{ base: "320px", lg: "600px" }} spacing={3}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Provider</Text>
            <Text>{data?.card?.provider}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Name on card</Text>
            <Text>{data?.card?.cardName}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Card number</Text>
            <Text>{data?.card?.cardNumber}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Expiry date</Text>
            <Text>{data?.card?.expiryDate}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">CVV</Text>
            <Text>{data?.card?.cvv}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Created on</Text>
            <Text>{data?.card?.createdAt}</Text>
          </Flex>

          <Divider />
        </Stack>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
        >
          <CardContainer className="bg-[url('/images/cardBg.webp')] rounded-md">
            <CardBody className="bg-opacity-1 bg-blend-darken h-[200px] sm:h-[250px] group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] p-6 transition-all duration-500">
              <div className="w-full flex datas-end justify-end">
                {data?.card?.provider === "Verve" && (
                  <img src="/images/verve.svg" className="w-20" />
                )}
                {data?.card?.provider === "MasterCard" && (
                  <img src="/images/mastercard.svg" className="w-12" />
                )}
                {data?.card?.provider === "Visa" && (
                  <img src="/images/visa.svg" className="w-14" />
                )}
              </div>
              <CardItem as="p" className="max-w-sm">
                <img
                  src='/images/mastercard_sim.png'
                  className="w-10 sm:w-12 border-2 border-sky-500 rounded-md"
                />
              </CardItem>
              <CardItem
                as="p"
                className="w-full font-bold text-black text-xs lg:text-2xl mt-5"
                style={{ letterSpacing: "0.6rem" }}
              >
                {data?.card?.cardNumber}
              </CardItem>
              <CardItem
                as="p"
                className="mt-4 pr-4 w-full flex datas-end justify-end font-poppins text-black text-xs lg:text-lg"
              >
                {data?.card?.expiryDate}
              </CardItem>
              <div className="mt-4 w-full flex justify-between">
                <CardItem
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="font-bold text-xs lg:text-lg text-black tracking-wide"
                >
                  {data?.card?.cardName?.toUpperCase()}
                </CardItem>

                <CardItem
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="pr-4 font-bold text-xs lg:text-lg text-black tracking-wide"
                >
                  {data?.card?.cvv}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          <Button colorScheme="red" onClick={onOpen}>
            Deactivate card
          </Button>
        </Flex>
      </Flex>

      <Flex
        mt={16}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={6}
      >
        <Text
          color="white"
          fontSize={{ base: "lg", lg: "2xl" }}
          fontWeight="bold"
        >
          All transactions
        </Text>
        <TransactionsTable />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AlertDialogContent
              bg="black"
              border="1px"
              borderColor="white"
              borderRadius="lg"
              color="white"
            >
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {data?.card?.provider}?
              </AlertDialogHeader>
              <AlertDialogCloseButton color="white" />

              <AlertDialogBody pb={6}>
                <>
                  <FormLabel htmlFor="password" color="white">
                    Password
                  </FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        bg="white"
                        color="black"
                        type="password"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </>
              </AlertDialogBody>

              <AlertDialogFooter
                as={Flex}
                gap={2}
                bg="white"
                border="1px"
                borderColor="white"
                borderBottomRadius="md"
              >
                <Button
                  borderRadius="md"
                  bg="black"
                  _hover={{ bg: "gray.800" }}
                  color="white"
                  onClick={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius="md"
                  type="submit"
                  colorScheme="red"
                  ref={cancelRef}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Deactivate
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </form>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Hero;

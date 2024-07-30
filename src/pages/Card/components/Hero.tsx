import { useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { FormValues } from "@/types";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useDeleteCardMutation, useGetSingleCardQuery } from "@/store/cards";

import { useFormatCardNumber } from "@/hooks/useFormatCardNumber";

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
  Box,
} from "@chakra-ui/react";

import { toast } from "sonner";
import { Loader, TransactionsTable } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import { Icon } from "@/components/assets/Icon";

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

  const getCardBgClass = (provider: string) => {
    switch (provider) {
      case "MasterCard":
        return "bg-[url('/images/cardBg.webp')]";
      case "Verve":
        return "bg-red-900 bg-[url('/images/cardBg.webp')] bg-blend-overlay bg-cover bg-center";
      case "Visa":
        return "bg-orange-900 bg-[url('/images/cardBg.webp')] bg-blend-overlay bg-cover bg-center";
      default:
        return "bg-gray-200";
    }
  };

  const cardClassName = `${getCardBgClass(
    data?.card?.provider
  )} relative rounded-md cursor-default`;

  return (
    <>
      <Button
        variant="none"
        color="white"
        as={Link}
        to={"/card-generator"}
        leftIcon={<ArrowLeftIcon />}
        p={0}
        mx={{ base: 8, lg: 16 }}
      >
        Go back
      </Button>

      <Flex
        mt={12}
        w="100%"
        flexDirection={{ base: "column-reverse", lg: "row" }}
        justifyContent="space-evenly"
        alignItems="center"
        color="white"
        fontSize={{ base: "sm", lg: "md" }}
        gap={{ base: 12, lg: 2 }}
      >
        <Stack w={{ base: "320px", lg: "500px" }} spacing={3}>
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
            <Text>{useFormatCardNumber(data?.card?.cardNumber)}</Text>
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
          gap={{ base: 0, lg: 4 }}
        >
          <div className="flip-card h-64 w-[22rem] lg:w-[28rem]">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Box className={`${cardClassName} h-52 lg:h-60`}>
                  <Box className="bg-opacity-1 bg-blend-darken group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] p-6 transition-all duration-500">
                    <div className="w-full flex items-end justify-end">
                      <div className="w-full flex items-end justify-end">
                        {data?.card?.provider === "Verve" && (
                          <Icon
                            name="verve"
                            className="w-32 h-8 pl-10 md:w-32"
                          />
                        )}
                        {data?.card?.provider === "MasterCard" && (
                          <Icon
                            name="mastercard"
                            className="w-72 h-10 pl-56 md:w-52 md:h-12 md:pl-32"
                          />
                        )}
                        {data?.card?.provider === "Visa" && (
                          <Icon
                            name="visa"
                            className="w-72 h-10 pl-56 md:w-52 md:h-12 md:pl-32"
                          />
                        )}
                      </div>
                    </div>
                    <Box as="p" className="max-w-sm">
                      <Icon name="sim" className="w-8 h-8 md:w-12 rounded-md" />
                    </Box>
                    <Box
                      as="p"
                      className="w-full font-bold text-left text-black text-xl lg:text-3xl mt-3"
                    >
                      {useFormatCardNumber(data?.card?.cardNumber)}
                    </Box>
                    <Box
                      as="p"
                      className="mt-3 pr-4 w-full flex items-end justify-end font-poppins text-black font-bold text-md lg:text-xl"
                    >
                      {data?.card?.expiryDate}
                    </Box>
                    <div className="mt-2 w-full flex justify-between">
                      <Box className="font-bold text-md lg:text-xl text-black">
                        {data?.card?.cardName?.toUpperCase()}
                      </Box>
                    </div>
                  </Box>
                </Box>
              </div>

              <div className="flip-card-back">
                <Box className={cardClassName}>
                  <Box className="p-0 bg-opacity-1 bg-blend-darken h-full group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] transition-all duration-500">
                    <div className="p-1 text-slate-300 text-[5px] lg:text-[10px] tracking-tighter leading-tight text-right">
                      {data?.card?.id}
                    </div>
                    <div className="bg-[#161414] p-6 w-full" />

                    <div className="p-6">
                      <Box
                        as="p"
                        className="bg-[url('/images/cardBg.webp bg-blend-overlay bg-contain bg-center bg-slate-200 p-1 rounded-md text-black w-full flex justify-center items-center tracking-widest"
                      >
                        {data?.card?.cvv}
                      </Box>

                      <div className="mt-2 flex justify-end items-end">
                        <Box
                          as="p"
                          className="w-[250px] lg:w-[360px] text-left font-bold text-black text-[5px] lg:text-[10px] tracking-tighter leading-tight"
                        >
                          This virtual card is issued to you and valid for use
                          in line with the agreement between the owner of this
                          account and OurBank digital services. This card is
                          valid for use at any online payment gateway and should
                          only be used by the owner of this account in line
                          OurBank terms and conditions.
                        </Box>
                      </div>

                      <div className="mt-4 w-full flex justify-between">
                        <Icon
                          name="logo"
                          className="w-20 h-6 bg-blend-darken opacity-80"
                        />
                      </div>
                    </div>
                  </Box>
                </Box>
              </div>
            </div>
          </div>

          <div>
            <Button w="full" colorScheme="red" onClick={onOpen}>
              Deactivate card
            </Button>
          </div>
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

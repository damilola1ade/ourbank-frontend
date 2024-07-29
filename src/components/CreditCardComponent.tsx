import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/tailwindcss-3dcard";
import { CreditCardComponentProps, FormValues } from "@/types";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Input,
  ModalFooter,
  Icon,
  InputGroup,
  InputRightElement,
  FormControl,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRevealCardMutation } from "@/store/cards";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOff } from "lucide-react";

import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorText } from "./ErrorText";

export const CreditCardComponent = ({ item }: CreditCardComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { authenticatePasswordValidation } = useFormValidation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const navigate = useNavigate();

  const [revealCard, { isLoading }] = useRevealCardMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await revealCard({
        body: { password: data.password },
        cardId: item.id,
      }).unwrap();

      if (response) {
        toast.success("Authentication approved");
        onClose();
        navigate(`/card/${item.id}`);
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

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
    item.provider
  )} relative rounded-md cursor-pointer`;

  return (
    <>
      <CardContainer className={cardClassName}>
        <CardBody className="bg-opacity-1 bg-blend-darken h-[180px] md:h-[250px] group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] p-6 transition-all duration-500">
          <div className="w-full flex items-end justify-end">
            {item.provider === "Verve" && (
              <img src="/images/verve.svg" className="w-16 md:w-32" />
            )}
            {item.provider === "MasterCard" && (
              <img src="/images/mastercard.svg" className="w-10 md:w-20" />
            )}
            {item.provider === "Visa" && (
              <img src="/images/visa.svg" className="w-10 md:w-20" />
            )}
          </div>
          <CardItem as="p" className="max-w-sm">
            <img
              src="/images/sim.png"
              className="w-8 md:w-12 border-2 border-sky-500 rounded-md"
            />
          </CardItem>
          <CardItem
            as="p"
            className="w-full font-bold text-black text-xs lg:text-2xl mt-5"
            style={{ letterSpacing: "0.6rem" }}
          >
            **** **** **** ****
          </CardItem>
          <CardItem
            as="p"
            className="mt-4 pr-4 w-full flex items-end justify-end font-poppins text-black text-xs lg:text-lg"
          >
            {item.expiryDate}
          </CardItem>
          <div className="mt-4 w-full flex justify-between">
            <CardItem
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="font-bold text-xs lg:text-lg text-black tracking-wide"
            >
              {item.cardName?.toUpperCase()}
            </CardItem>

            <CardItem
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="pr-4 font-bold text-xs lg:text-lg text-black tracking-wide"
            >
              ***
            </CardItem>
          </div>

          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-0 text-white opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
            <button
              className="bg-blue-gradient px-4 py-2 rounded-lg"
              onClick={onOpen}
            >
              Reveal card
            </button>
          </div>
        </CardBody>
      </CardContainer>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          bg="black"
          border="1px"
          borderColor="white"
          borderRadius="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <ModalCloseButton color="white" />
            <ModalBody p={8}>
              <FormControl>
                <FormLabel htmlFor="password" color="white">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    {...register("password", {
                      ...authenticatePasswordValidation,
                    })}
                    bg="white"
                    color="black"
                    type={show ? "text" : "password"}
                    height="50px"
                  />

                  <InputRightElement width="4.5rem">
                    <Button mt={2} bg="white" size="sm" onClick={handleShow}>
                      {show ? <Icon as={EyeIcon} /> : <Icon as={EyeOff} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <ErrorText error={errors?.password?.message} />
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter
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
                type="submit"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Authorize
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

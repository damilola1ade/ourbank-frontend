import { useState } from "react";
import { verveLogo, mastercardLogo, visaLogo, sim } from "../assets";
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
  Box,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useRevealCardMutation } from "@/store/cards";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOff } from "lucide-react";

export const MobileCreditCardComponent = ({
  item,
}: CreditCardComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const { handleSubmit, control, reset } = useForm<FormValues>();

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
        reset();
        onClose();
        navigate(`/card/${item.id}`);
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <>
      <Box className="relative bg-[url('./assets/bg.avif')] rounded-md">
        <Box className="bg-opacity-1 bg-blend-darken h-[160px] sm:h-[250px] group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] p-6 transition-all duration-500">
          <div className="w-full flex items-end justify-end">
            {item.provider === "Verve" && (
              <img src={verveLogo} className="w-14" />
            )}
            {item.provider === "MasterCard" && (
              <img src={mastercardLogo} className="w-8" />
            )}
            {item.provider === "Visa" && (
              <img src={visaLogo} className="w-10" />
            )}
          </div>
          <Box as="p" className="max-w-sm">
            <img src={sim} className="w-8 border-2 border-sky-500 rounded-md" />
          </Box>
          <Box
            as="p"
            className="w-full font-bold text-black text-xs mt-5"
            style={{ letterSpacing: "0.5rem" }}
          >
            **** **** **** ****
          </Box>
          <Box
            as="p"
            className="mt-4 pr-4 w-full flex items-end justify-end font-poppins text-black text-xs lg:text-lg"
          >
            {item.expiryDate}
          </Box>
          <div className="mt-1 w-full flex justify-between">
            <Box className="font-bold text-xs lg:text-lg text-black tracking-wide">
              {item.cardName?.toUpperCase()}
            </Box>

            <Box className="pr-4 font-bold text-xs lg:text-lg text-black tracking-wide">
              ***
            </Box>
          </div>

          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-0 text-white opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
            <button
              className="bg-blue-gradient px-4 py-2 rounded-lg"
              onClick={onOpen}
            >
              Reveal card
            </button>
          </div>
        </Box>
      </Box>

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
              <>
                <FormLabel htmlFor="password" color="white">
                  Password
                </FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputGroup>
                      <Input
                        color="white"
                        id="password"
                        type={show ? "text" : "password"}
                        {...field}
                        required
                        aria-required="true"
                      />

                      <InputRightElement width="4.5rem">
                        <Button
                          ml={6}
                          bg="white"
                          h="2.0rem"
                          size="sm"
                          onClick={handleShow}
                        >
                          {show ? <Icon as={EyeIcon} /> : <Icon as={EyeOff} />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  )}
                />
              </>
            </ModalBody>

            <ModalFooter
              bg="white"
              border="1px"
              borderColor="white"
              borderBottomRadius="md"
            >
              <Button
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

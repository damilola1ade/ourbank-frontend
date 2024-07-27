import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormValues } from "@/types";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
  ModalFooter,
  InputRightElement,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { EyeIcon, EyeOff } from "lucide-react";

export function SignInForm() {
  const { handleSubmit, control } = useForm<FormValues>();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response && response.accessToken) {
        sessionStorage.setItem("accessToken", response.accessToken);
        toast.success("Login successful!");
        navigate("/card-generator");
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <>
      <Button onClick={onOpen} size={{ base: "sm", lg: "lg" }}>
        Login
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="sm"
        motionPreset="slideInRight"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(0deg)"
          />
          <ModalContent
            bg="black"
            border="1px"
            borderColor="white"
            borderRadius="lg"
          >
            <ModalHeader color="white">Sign in to your account</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Email
                  </FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="damilola@gmail.com"
                        type="email"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password" color="white">
                    Password
                  </FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <Input
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
                            {show ? (
                              <Icon as={EyeIcon} />
                            ) : (
                              <Icon as={EyeOff} />
                            )}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </VStack>
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
                color='white'
                type="submit"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

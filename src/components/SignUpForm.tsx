import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSignUpMutation } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
} from "@chakra-ui/react";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const { handleSubmit, control } = useForm<FormValues>();
  
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response && response.accessToken) {
        sessionStorage.setItem("accessToken", response.accessToken);
        toast.success("Registration successful!");
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
        Sign up
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="sm"
        motionPreset="slideInRight"
      >
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
          <ModalHeader color="white">Register your account</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel htmlFor="name" color="white">
                    Full name
                  </FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="name"
                        placeholder="Damilola Adegbemile"
                        color="white"
                        type="text"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Email
                  </FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        placeholder="damilola@gmail.com"
                        color="white"
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
                      <Input
                        id="password"
                        type="password"
                        color="white"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </FormControl>

                <Button
                  mt={4}
                  w="100%"
                  borderRadius="md"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Register
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

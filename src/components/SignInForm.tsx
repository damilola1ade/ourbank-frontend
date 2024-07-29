import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/RTKHooks";
import { setUser } from "@/slice/authSlice";
import { useFormValidation } from "@/hooks/useFormValidation";
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

import { ErrorText } from ".";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { emailValidation, authenticatePasswordValidation } =
    useFormValidation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(
        setUser({ user: response.user, accessToken: response.accessToken })
      );
      navigate("/card-generator");
      onClose();
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
                  <Input
                    {...register("email", {
                      ...emailValidation,
                    })}
                    bg="white"
                    color="black"
                    placeholder="damilola@gmail.com"
                    height="50px"
                    type="email"
                  />
                  {errors.email && <ErrorText error={errors?.email?.message} />}
                </FormControl>

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
                color="white"
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

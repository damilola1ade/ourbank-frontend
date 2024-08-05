import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAppDispatch } from "@/hooks/RTKHooks";
import { setUser } from "@/slice/authSlice";
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
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { EyeIcon, EyeOff } from "lucide-react";

import { ErrorText } from ".";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { nameValidation, emailValidation, signUpPasswordValidation } =
    useFormValidation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const dispatch = useAppDispatch();

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
        Register
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
            <ModalHeader color="white">Register an account</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel htmlFor="name" color="white">
                    Full name
                  </FormLabel>
                  <Input
                    {...register("name", {
                      ...nameValidation,
                    })}
                    bg="white"
                    color="black"
                    placeholder="Damilola Adegbemile"
                    height="50px"
                    type="text"
                  />
                  {errors.name && <ErrorText error={errors?.name?.message} />}
                </FormControl>

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
                        ...signUpPasswordValidation,
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
                Register
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

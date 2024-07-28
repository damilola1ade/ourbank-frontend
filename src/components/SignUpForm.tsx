import { useState } from "react";
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

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const { handleSubmit, control } = useForm<FormValues>();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

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
            <ModalHeader color="white">Sign in to your account</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel htmlFor="name" color="white">
                    Full name
                  </FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input bg='white' color='black' 
                        placeholder="Damilola Adegbemile"
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
                      <Input bg='white' color='black' 
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
                        <Input bg='white' color='black' 
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

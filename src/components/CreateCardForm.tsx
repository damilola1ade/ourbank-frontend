import { useForm, Controller } from "react-hook-form";
import { useCreateCardMutation } from "@/store/cards";
import { toast } from "sonner";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FormValues } from "@/types";

export function CreateCardForm() {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      provider: "MasterCard",
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createCard, { isLoading }] = useCreateCardMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createCard({
        cardName: data.cardName,
        provider: data.provider,
      }).unwrap();

      if (response) {
        toast.success("Virtual card created successfully!");
        reset();
        onClose();
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <>
      <Button onClick={onOpen} w='250px' size='lg'>
        Generate card
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
          <ModalHeader color="white">Create a Virtual Card</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel htmlFor="cardName" color="white">
                    Name on card
                  </FormLabel>
                  <Controller
                    name="cardName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="cardName"
                        placeholder="Damilola Adegbemile"
                        type="text"
                        bg='white'
                        {...field}
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="provider" color="white">
                    Provider
                  </FormLabel>
                  <Controller
                    name="provider"
                    control={control}
                    render={({ field }) => (
                      <Select id="provider" bg='white' {...field}>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Verve">Verve</option>
                        <option value="Visa">Visa</option>
                      </Select>
                    )}
                  />
                </FormControl>

                <Button
                  w="100%"
                  mt={6}
                  bgGradient="linear(to-br, black, neutral.600)"
                 
                  borderRadius="md"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  _hover={{ bgGradient: "linear(to-br, black, neutral.500)" }}
                >
                  Create card
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

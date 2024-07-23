import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { cn } from "../lib/utils";
import { FormValues } from "@/types";
import { useCreateCardMutation } from "@/store/cards";
import { toast } from "sonner";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "./ui/animated-modal";

import { GenerateCardButton } from "./GenerateCardButton";

export function CreateCardForm() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      provider: "MasterCard",
    },
  });

  const [createCard, { isLoading }] = useCreateCardMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createCard({
        cardName: data.cardName,
        provider: data.provider,
      }).unwrap();

      if (response) {
        toast.success("Virtual card created successfully!");
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <Modal>
      <ModalTrigger>
        <GenerateCardButton />
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold font-poppins text-xl text-neutral-800 dark:text-neutral-200">
              Create your virtual card
            </h2>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="cardName">Name on card</Label>
                  <Controller
                    name="cardName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="cardName"
                        placeholder="Damilola Adegbemile"
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="provider">Provider</Label>
                <Controller
                  name="provider"
                  control={control}
                  render={({ field }) => (
                    <Select id="provider" {...field}>
                      <option value="MasterCard">MasterCard</option>
                      <option value="Verve">Verve</option>
                      <option value="Visa">Visa</option>
                    </Select>
                  )}
                />
              </LabelInputContainer>

              <button
                className="mt-6 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={isLoading}
              >
                Create card
              </button>
            </form>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

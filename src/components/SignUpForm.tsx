import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSignUpMutation } from "../store/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "./ui/animated-modal";
import { SignUpButton } from "./SignUpButton";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const { handleSubmit, control } = useForm<FormValues>();

  const navigate = useNavigate();

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
    <Modal>
      <ModalTrigger>
        <SignUpButton />
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Register to create a virtual card
            </h2>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col space-y-4 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="name">Full name</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="name"
                        placeholder="Damilola"
                        type="text"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        placeholder="damilola@gmail.com"
                        type="email"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="password">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type="password"
                        {...field}
                        required
                        aria-required="true"
                      />
                    )}
                  />
                </LabelInputContainer>

                <div className="pt-3">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
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

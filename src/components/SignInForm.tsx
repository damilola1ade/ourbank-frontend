import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "../store/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormValues } from "@/types";
import { LoginButton } from "./SignInButton";

import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "./ui/animated-modal";

export function SignInForm() {
  const { handleSubmit, control } = useForm<FormValues>();

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
    <Modal>
      <ModalTrigger className="group/modal-btn">
        <LoginButton />
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="font-poppins max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Sign in to your account
            </h2>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col space-y-4 mb-4">
                <LabelInputContainer className="">
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

                <LabelInputContainer className="">
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

                <div className="pt-3 ">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? "..." : "Login"}
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

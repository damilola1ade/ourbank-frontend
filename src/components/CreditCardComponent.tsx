import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/tailwindcss-3dcard";
import { verveLogo, mastercardLogo, visaLogo, sim } from "../assets";
import { useMaskedCardNumber } from "../hooks";
import { CreditCardComponentProps } from "@/types";

export const CreditCardComponent = ({
  item,
  handleDelete,
}: CreditCardComponentProps) => {
  const [isCardNumberRevealed, setIsCardNumberRevealed] = useState(false);
  const [isCVVRevealed, setIsCVVRevealed] = useState(false);

  const cardNumber = item.cardNumber;

  const maskedCardNumber = useMaskedCardNumber(cardNumber);

  const handleReveal = () => {
    setIsCardNumberRevealed(!isCardNumberRevealed);
    setIsCVVRevealed(!isCVVRevealed);
  };

  return (
    <div className="relative cursor-pointer">
      <CardContainer>
        <CardBody className="bg-[url('./assets/bg.avif')] bg-opacity-1 bg-blend-darken h-[200px] sm:h-[250px] relative group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border transition-all duration-500">
          <div className="w-full flex items-end justify-end">
            {item.provider === "Verve" && (
              <img src={verveLogo} className="w-20" />
            )}
            {item.provider === "MasterCard" && (
              <img src={mastercardLogo} className="w-12" />
            )}
            {item.provider === "Visa" && (
              <img src={visaLogo} className="w-14" />
            )}
          </div>
          <CardItem as="p" className="max-w-sm">
            <img
              src={sim}
              className="w-10 sm:w-12 border-2 border-[black] rounded-md"
            />
          </CardItem>
          <CardItem
            as="p"
            className="w-full font-bold text-black text-xs lg:text-2xl mt-5"
            style={{ letterSpacing: "0.6rem" }}
          >
            {isCardNumberRevealed ? cardNumber : maskedCardNumber}
          </CardItem>
          <CardItem
            as="p"
            className="mt-4 pr-4 w-full flex items-end justify-end font-poppins text-black text-xs lg:text-lg"
          >
            {item.expiryDate}
          </CardItem>
          <div className="mt-4 w-full flex justify-between">
            <CardItem
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="font-bold text-xs lg:text-lg text-black tracking-wide"
            >
              {item.cardName?.toUpperCase()}
            </CardItem>

            <CardItem
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="pr-4 font-bold text-xs lg:text-lg text-black tracking-wide"
            >
              {isCVVRevealed ? item.cvv : "***"}
            </CardItem>
          </div>

          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-0 text-white opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={handleReveal}
              className="bg-blue-gradient px-4 py-2 rounded-lg"
            >
              {isCardNumberRevealed ? "Hide card" : "Reveal card"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-[red] px-4 py-2 rounded-lg"
            >
              Delete card
            </button>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

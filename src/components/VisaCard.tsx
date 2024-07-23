import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/tailwindcss-3dcard";
import { sim, visaLogo } from "../assets";
import { useMaskedCardNumber } from "../hooks";

const VisaCard = () => {
  const cardNumber = "5399834460229037";
  const maskedCardNumber = useMaskedCardNumber(cardNumber);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-900 h-[200px] sm:h-[250px] relative group/card  dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border ">
        <div className="w-full flex items-end justify-end">
          <img src={visaLogo} className="w-12" />
        </div>

        <CardItem as="p" className="max-w-sm mt-2">
          <img src={sim} className="w-8 sm:w-10 border-2 rounded-md" />
        </CardItem>

        <CardItem
          as="p"
          className="w-full font-bold text-white text-xs lg:text-2xl mt-5 tracking-wide"
          style={{ letterSpacing: "0.6rem" }}
        >
          {maskedCardNumber}
        </CardItem>

        <CardItem
          as="p"
          className="mt-4 -ml-5 w-full flex items-end justify-end font-poppins text-white text-xs lg:text-md"
        >
          03/28
        </CardItem>

        <CardItem
          href="https://twitter.com/mannupaaji"
          target="__blank"
          className="font-ocrb font-bold text-white text-xs lg:text-lg tracking-wide"
        >
          DAMILOLA ADEGBEMILE
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default VisaCard;

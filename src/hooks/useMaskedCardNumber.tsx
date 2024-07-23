import { useState, useEffect } from "react";

export const useMaskedCardNumber = (cardNumber: string) => {
  const [maskedNumber, setMaskedNumber] = useState("");

  useEffect(() => {
    if (cardNumber?.length === 16) {
      const firstPart = cardNumber.slice(0, 4);
      const middlePart = "**** ****";
      const lastPart = cardNumber.slice(12, 16);
      setMaskedNumber(`${firstPart} ${middlePart} ${lastPart}`);
    }
  }, [cardNumber]);

  return maskedNumber;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconProps } from "./Icon.interface";

import { Logo } from "./svg/logo";
import { HeroImage } from "./svg/hero-image";
import { Sim } from "./svg/sim";
import { Verve } from "./svg/verve";
import { MasterCard } from "./svg/mastercard";
import { Visa } from "./svg/visa";

const iconMap = {
  logo: Logo,
  "hero-image": HeroImage,
  sim: Sim,
  verve: Verve,
  mastercard: MasterCard,
  visa: Visa
};

export type IconType = keyof typeof iconMap;

const resolver: Record<string, any> = {};

// eslint-disable-next-line react-refresh/only-export-components
export const iconNameList = Object.keys(iconMap) as IconType[];

export const Icon = ({
  name,
  size,
  ...props
}: IconProps & { name: IconType }) => {
  const style = size
    ? {
        height: size,
        width: size,
      }
    : {};

  for (const [key, icon] of Object.entries(iconMap)) {
    resolver[key] = icon({ size, ...props, ...style });
  }

  return resolver[name];
};

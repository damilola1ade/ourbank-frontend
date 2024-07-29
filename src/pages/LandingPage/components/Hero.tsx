import styles from "../../../style";
import { Image } from "@chakra-ui/react";

const Hero = () => (
  <section
    id="home"
    className={`flex md:flex-row flex-col gap-10 mt-6 ss:mt-0 ${styles.paddingY}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1
          className="flex-1 font-poppins font-semibold ss:text-[72px] text-[32px]
          text-white ss:leading-[100px] leading-[40px]"
        >
          Discover the future <br className="sm:block hidden" /> {""}
          <span className="text-gradient">of Virtual Cards</span> {""}
        </h1>
      </div>

      <p
        className={`${styles.paragraph} max-w-[960px] mt-5 text-sm ss:text-lg`}
      >
        Our platform offers cutting-edge virtual cards tailored to your needs.
        Enjoy enhanced security and seamless transactions with our innovative
        solutions.
      </p>
    </div>

    <div className={`flex-1 flex ${styles.flexCenter} relative`}>
      <Image
        src="/images/hero.webp"
        alt="hero"
        w={{ base: "320px", lg: "500px" }}
      />
    </div>
  </section>
);

export default Hero;

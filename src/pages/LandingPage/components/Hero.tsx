import React from "react";
import styles from "../../../style";
import { robot } from "../../../assets";
import GetStarted from "./GetStarted";

const Hero = () => (
  <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1
          className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]
          text-white ss:leading-[100px] leading-[75px]"
        >
          Discover the Future <br className="sm:block hidden" /> {""}
          <span className="text-gradient">of Virtual Cards</span> {""}
        </h1>

        <div className="ss:flex hidden md:mr-4 mr-0">
          <GetStarted />
        </div>
      </div>

      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Our platform provides cutting-edge virtual cards tailored to your needs.
        Enjoy enhanced security and seamless transactions with our innovative
        solutions.
      </p>
    </div>

    <div className={`flex-1 flex ${styles.flexCenter} relative`}>
      <img
        src={robot}
        alt="billing"
        className="mt-4 w-[100%] h-[100%] 
        "
      />

      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>

    <div className={`ss:hidden ${styles.flexCenter}`}>
      {/* <GetStarted /> */}
    </div>
  </section>
);

export default Hero;

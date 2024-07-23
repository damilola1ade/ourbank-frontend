import React from "react";
import styles from "../../../style";
import {Button} from "../../../components/Button";

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} 
  sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow `}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Try our services now!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Finally! All those formal talk, eh? So, Let's do this!
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 mt-10`}></div>
    <Button text="Sign in" styles={""} />
  </section>
);

export default CTA;

import React from "react";
import { card } from "../../../assets";
import styles, { layout } from "../../../style";
import {Button} from "../../../components/Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better card deal <br className="sm:block hidden" />
        in few easy steps.{" "}
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        This is very self explanatory tbh. And yes this is from Mr. Damilola as
        well.
      </p>
      <Button styles="mt-10" text="Sign in" />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="card" className="w-[100%] h-[100%] relative z-[5]" />
    </div>
  </section>
);

export default CardDeal;

import { SignUpForm } from "@/components";
import styles, { layout } from "../../../style";

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
      <SignUpForm />
    </div>

    <div className={layout.sectionImg}>
      <img src="/images/card.svg" alt="card" className="w-[100%] h-[100%] relative z-[5]" />
    </div>
  </section>
);

export default CardDeal;

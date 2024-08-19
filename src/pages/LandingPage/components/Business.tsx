import { Icon } from "@/components/assets/Icon";
import styles from "../../../style";

const Business = () => (
  <section
    id="home"
    className={`flex md:flex-row-reverse flex-col gap-0 ss:mt-0 ${styles.paddingY}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1
          className="flex-1 font-poppins font-semibold ss:text-[72px] text-[32px]
          text-white ss:leading-[100px] leading-[40px]"
        >
          You do the business, we'll handle the money.
        </h1>
      </div>

      <p
        className={`${styles.paragraph} max-w-[960px] mt-5 text-sm ss:text-lg`}
      >
        With the right virtual card, you can improve your financial life by
        building credit, earning rewards and saving money.
      </p>
    </div>

    <div className={`flex-1 flex ${styles.flexCenter} relative`}>
      <Icon name="business" className="w-64 -mt-60 lg:-mt-20 sm:w-80" />
    </div>
  </section>
);

export default Business;

import styles, { layout } from "../../../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src="/images/bill.svg"
        alt="billing"
        className="w-[100%] h-[100%] relative z-[5]"
      />
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Easily control your <br className="sm:block hidden" /> billing &
        invoicing
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        And the image shown here is the bill & invoice from a Mr. Damilola
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <img
          src="/images/apple.svg"
          alt="apple_store"
          className="w-[128px] h-[42px] object-contain mr-5
          cursor-pointer"
        />
        <img
          src="/images/google.svg"
          alt="google_play"
          className="w-[128px] h-[42px] object-contain mr-5
          cursor-pointer"
        />
      </div>
    </div>
  </section>
);

export default Billing;

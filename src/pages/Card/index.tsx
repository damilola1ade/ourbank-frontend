import { Hero } from "./components";
import styles from "../../style";

const Card = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  </div>
);

export default Card;

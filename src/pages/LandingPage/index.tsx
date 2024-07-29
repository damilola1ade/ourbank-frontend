import styles from "../../style";
import { Hero } from "./components";

const LandingPage = () => (
  <div className="w-full overflow-hidden">
    <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  </div>
);

export default LandingPage;

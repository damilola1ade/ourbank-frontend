import styles from "../../style";
import { Business, Hero } from "./components";

const LandingPage = () => (
  <div className="w-full overflow-hidden">
    <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <Business />
      </div>
    </div>
  </div>
);

export default LandingPage;

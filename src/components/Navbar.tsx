import { useEffect } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import styles from "@/style";
import { LogoutButton } from "./LogoutButton";
import { useAppSelector } from "@/hooks/RTKHooks";
import { Icon } from "./assets/Icon";

export const Navbar = () => {
  const { user } = useAppSelector((store) => store.auth);

  useEffect(() => {
    // Function to send a ping request
    const sendPing = () => {
      fetch("https://ourbank-backend.onrender.com")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Ping successful:", data);
        })
        .catch((error) => {
          console.error("Ping failed:", error);
        });
    };

    // Send a ping immediately when the component mounts
    sendPing();

    // // Set an interval to send ping every 10 minutes
    // const intervalId = setInterval(sendPing, 600000);

    // Set an interval to send ping every 30 minutes
    const intervalId = setInterval(sendPing, 100000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <Icon name='logo' className="w-32 h-12" />

          <div className="flex flex-row gap-4">
            {user && <LogoutButton />}

            {!user && (
              <>
                <SignInForm />
                <SignUpForm />
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

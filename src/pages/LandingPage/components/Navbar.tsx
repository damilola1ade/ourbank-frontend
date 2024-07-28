import { useEffect } from "react";
import { SignInForm, SignUpForm } from "../../../components";

const Navbar = () => {
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
    const intervalId = setInterval(sendPing, 1800000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src="/images/logo.webp" alt="ourbank" className="w-[120px] h-[32px]" />

      <div className="flex flex-row gap-4">
        <SignInForm />

        <SignUpForm />
      </div>
    </nav>
  );
};

export default Navbar;

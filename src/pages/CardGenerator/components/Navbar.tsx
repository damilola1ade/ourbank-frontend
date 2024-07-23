import React, { useState } from "react";

import { close, logo, menu } from "../../../assets";
import { LogoutButton } from "../../../components";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="ourbank" className="w-[124px] h-[32px]" />

      <div className="sm:flex hidden">
        <LogoutButton />
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

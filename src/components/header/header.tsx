"use client";
import { FaMoon, FaSun } from "react-icons/fa";

import React from "react";

const Header = () => {
  const [dark, setDark] = React.useState(false);

  return (
    <div className="flex justify-between items-center py-5 px-10 shadow-gray-100	 shadow-lg fixed top-0 left-0 right-0 z-10 bg-white   ">
      <h1 className="text-3xl font-bold">Where in the world?</h1>

      <button className="text-xl font-semibold" onClick={() => setDark(!dark)}>
        {dark ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default Header;

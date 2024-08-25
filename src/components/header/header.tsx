"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";

const Header = () => {
  const [dark, setDark] = React.useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    if (dark) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <div
      className={`flex justify-between items-center py-5 px-10 fixed top-0 left-0 right-0 z-10 shadow-lg ${
        dark
          ? "bg-gray-800 text-white shadow-gray-700"
          : "bg-white text-black shadow-gray-300"
      }`}>
      <h1 className="text-3xl font-bold">Where in the world?</h1>
      <button className="text-xl font-semibold" onClick={toggleDarkMode}>
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Header;

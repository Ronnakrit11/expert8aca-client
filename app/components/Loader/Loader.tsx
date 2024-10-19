import React from "react";
import "./Loader.css";

const Loader = ({text = ''}) => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="loader"></div>
      <p className="text-gray-500 mt-2">{text}</p>
    </div>
  );
};

export default Loader;

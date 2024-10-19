import React from "react";
import "./Loader.css";

const LoadingBackDrop = () => {
  return (
    <div className="flex justify-center items-center h-screen loadingBlackDrop">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingBackDrop;

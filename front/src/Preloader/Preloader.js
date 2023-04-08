import React from "react";
import "./Preloader.css";

// eslint-disable-next-line react/prop-types
function Preloader({ isLoading }) {
  return (
    <div className={`preloader ${isLoading ? "" : "block__hide"}`}>
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
}

export default Preloader;

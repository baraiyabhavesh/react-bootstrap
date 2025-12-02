"use client";
import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const GoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goTo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <div className="go-top">
          <FaAngleUp className="goto-top-btn" onClick={goTo} />
        </div>
      )}{" "}
    </>
  );
};

export default GoToTop;

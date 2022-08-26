import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Arrow() {
  const dispatch = useDispatch();
  const showScroll = useSelector((state) => state.arrow);

  const checkScrolling = () => {
    if (!showScroll && window.pageYOffset > 100) {
      dispatch({
        type: "arrow/showArrowTrue",
        payload: true,
      });
    } else if (showScroll && window.pageYOffset <= 100) {
      dispatch({
        type: "arrow/showArrowTrue",
        payload: false,
      });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrolling);

  return (
    <FaArrowCircleUp
      style={{
        display: showScroll ? "flex" : "none",
      }}
      className="scrollingTop responsive-arrow"
      onClick={scrollTop}
    />
  );
}

export default Arrow;

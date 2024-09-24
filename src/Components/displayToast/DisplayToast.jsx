import React, { useEffect } from "react";
import "./display-toast.css";

const DisplayToast = ({ text, show, onToastFinish }) => {
  useEffect(() => {
    let timer = null;
    if (show) {
      timer = setTimeout(() => {
        const toastStatus = show ? false : true;
        onToastFinish(toastStatus);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      {show && (
        <div className="display-toast">
          <h4>{text}</h4>
        </div>
      )}
    </>
  );
};

export default DisplayToast;

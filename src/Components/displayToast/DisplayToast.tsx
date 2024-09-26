import React, { useEffect } from "react";
import "./display-toast.css";

interface DisplayToastProps {
  text: string;
  show: boolean;
  onToastFinish: (status: boolean) => void;
}

const DisplayToast: React.FC<DisplayToastProps> = ({
  text,
  show,
  onToastFinish,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (show) {
      timer = setTimeout(() => {
        const toastStatus = show ? false : true;
        onToastFinish(toastStatus);
      }, 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show]);

  return (
    <div>
      {show && (
        <div className="display-toast">
          <h4>{text}</h4>
        </div>
      )}
    </div>
  );
};

export default DisplayToast;

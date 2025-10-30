import { useEffect } from "react";
import type { dateAndTime } from "../types/dateAndTimeType";

const DateAndTimeButton = ({ text, left, onClick, isActive }: dateAndTime) => {
  const formattedDate = new Date(text).toLocaleString("en-Us", {
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    console.log(typeof new Date());
  }, []);

  return (
    <button
      disabled={left === 0}
      onClick={onClick}
      className={`${
        isActive ? "bg-button text-active" : "border border-border text-muted"
      } rounded-sm text-[14px] py-2 px-3 disabled:bg-disabled disabled:text-muted disabled:cursor-not-allowed`}
    >
      {formattedDate.length < 7 && formattedDate}
      {formattedDate.length > 7 && (
        <div className="flex items-center gap-1.5">
          <p>{text}</p>{" "}
          <p
            className={`text-[10px] text-alert font-medium ${
              left === 0 && "text-muted"
            }`}
          >
            {left === 0 ? "sold out" : left + " left"}
          </p>
        </div>
      )}
    </button>
  );
};

export default DateAndTimeButton;

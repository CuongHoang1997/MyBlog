import React from "react";

const Toggle = (props) => {
  const { on, onClick, ...rest } = props;

  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[125px] h-[64px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-green-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-14 h-14 bg-white rounded-full inline-block ${
            on ? "translate-x-[60px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;

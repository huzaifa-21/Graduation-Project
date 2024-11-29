import React from "react";

const Input = ({ type, label, placeholder, id ,eye}) => {
  return (
    <div className="input-holder">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          className="main-input"
        />
      </div>
    </div>
  );
};

export default Input;

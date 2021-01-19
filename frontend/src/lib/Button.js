import React from 'react';

const Button = ({ type, onClick, disabled, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  );
};
export default Button;

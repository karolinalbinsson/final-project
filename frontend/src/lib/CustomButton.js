import React from 'react';
import Button from '@material-ui/core/Button';

const CustomButton = ({
  button,
  onClick,
  disabled,
  // value,
  text,
  color,
  variant,
  size,
  className,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      type={button}
      onClick={onClick}
      disabled={disabled}
      // value={value}
      className={className}
    >
      {text}
    </Button>
  );
};
export default CustomButton;

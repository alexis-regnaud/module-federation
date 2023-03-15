import React from 'react';

type ButtonProps = {
  size: 'small' | 'large';
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return <button>App Remote Large Button</button>;
  }
  return <button>App Remote Small Button</button>;
};

export default Button;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  let classes = 'btn';
  
  if (variant === 'primary') classes += ' btn-primary';
  if (variant === 'secondary') classes += ' btn-secondary';
  if (variant === 'ghost') classes += ' btn-ghost';
  
  if (size === 'lg') classes += ' btn-lg';
  if (fullWidth) classes += ' btn-full';
  
  if (className) classes += ' ' + className;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
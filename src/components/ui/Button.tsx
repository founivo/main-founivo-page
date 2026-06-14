// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200';
  
  const variants = {
    primary: 'bg-[#0F6E56] text-white hover:bg-[#085041] px-5 py-2.5',
    outline: 'border border-[#e5e7eb] text-[#3a6b57] hover:bg-gray-50 px-5 py-2.5',
    ghost: 'text-[#3a6b57] hover:bg-gray-50 px-5 py-2.5',
    white: 'bg-white text-[#0F6E56] border border-[#e5e7eb] hover:bg-gray-50 px-5 py-2.5',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
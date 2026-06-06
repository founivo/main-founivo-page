// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition transform duration-150';
  const defaultVisual = 'bg-[var(--brand-600)] px-4 py-3 hover:bg-[var(--brand-700)]';

  return (
    <button className={`${base} ${defaultVisual} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
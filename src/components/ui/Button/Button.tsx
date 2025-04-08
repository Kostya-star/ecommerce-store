import { ReactNode } from 'react';

import cls from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  children: ReactNode;
  variant?: 'standard' | 'red'
}

export function Button({ children, variant = 'standard', ...rest }: ButtonProps) {

  return <button 
    className={`${cls.btn} ${cls[variant]}`} 
    {...rest}>
      {children}
    </button>
} 
import { ReactNode } from 'react';

import cls from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  children: ReactNode;
  styling?: 'standard'
}

export function Button({ children, styling = 'standard', ...rest }: ButtonProps) {

  return <button 
    className={`${cls.btn} ${cls[styling]}`} 
    {...rest}>
      {children}
    </button>
} 
import cls from './Input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ type = 'text', ...rest }: InputProps) {
  return <input 
    type={type}
    className={cls.customInput} 
    {...rest}
  />
}
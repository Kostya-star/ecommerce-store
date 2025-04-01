import cls from './Loader.module.scss'

interface LoaderProps {
  center?: true;
  right?: true;
}

export function Loader({ center, right }: LoaderProps) {
  const additionalClasses = [];

  if (center) additionalClasses.push(cls.loaderCenter)
  if (right) additionalClasses.push(cls.loaderRight)

  return <div className={`${cls.loader} ${additionalClasses.join(' ')}`}></div>
}
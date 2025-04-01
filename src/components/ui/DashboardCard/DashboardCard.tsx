import cl from './DashboardCard.module.scss'

interface DashboardCardProps {
  title: string;
  subTitle: string;
  body: string;
}

export default function DashboardCard({ title, subTitle, body }: DashboardCardProps) {
  return <div className={cl.DashboardCard}>
    <div className={cl.title}>{title}</div>
    <span className={cl.subTitle}>{subTitle}</span>
    <p className={cl.body}>{body}</p>
  </div>
}
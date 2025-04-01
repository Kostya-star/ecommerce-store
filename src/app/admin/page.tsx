import DashboardCard from '@/components/ui/DashboardCard/DashboardCard';
import { db } from '@/db/db';
import { formatCurrency, formatNumber } from '@/util/formatter';

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  }
}

const getUserData = async () => {
  const [usersCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true }
    })
  ])

  return {
    usersCount,
    averageValuePerUser: !usersCount ? 0 : (orderData._sum.pricePaidInCents || 0) / usersCount / 100
  }
}

const getProductData = async () => {
  const [active, inactive] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return { active, inactive }
}

export default async function AdminPage() {
  const [salesData, customersData, productsData] = await Promise.all([getSalesData(), getUserData(), getProductData()]) 

  return <div>Dashboard cards...

    <DashboardCard 
      title='Sales' 
      subTitle={`${formatNumber(salesData.numberOfSales)} Orders`} 
      body={formatCurrency(salesData.amount)}
    />

    <DashboardCard 
      title='Customers' 
      subTitle={`${formatCurrency(customersData.averageValuePerUser)} Average Value`} 
      body={formatNumber(customersData.usersCount)}
    />

    <DashboardCard 
      title='Products' 
      subTitle={`${formatNumber(productsData.active)} Active Products`} 
      body={`${formatNumber(productsData.inactive)} Inactive Products`}
    />
  </div>
}
import { Button } from '@/components/ui/Button/Button'
import cls from './page.module.scss'
import Link from 'next/link';

export default function AdmingProductsPage() {
  return <div>
    <div className={cls.pageHeader}>
      <h1>Products</h1>
      <Button>
        <Link href='/admin/products/new'>Add product</Link>
      </Button>
    </div>

    <Table/>
  </div>
}

function Table() {
  return (
    <div className={cls.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows can go here */}
        </tbody>
      </table>
    </div>
  );
};
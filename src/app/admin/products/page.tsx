import { Button } from '@/components/ui/Button/Button'
import cls from './page.module.scss'
import Link from 'next/link';
import { db } from '@/db/db';
import CircleCheck from '@/app/svgs/circle-check.svg'
import CircleCross from '@/app/svgs/circle-cross.svg'
import ElipsisVertical from '@/app/svgs/ellipsis-vertical.svg'
import Image from 'next/image';
import { formatCurrency, formatNumber } from '@/util/formatter';
import { DropdownMenu } from '@/components/ui/DropdownMenu/DropdownMenu';
import { AvailableForPurchaseToggleDropdownItem, DeleteDropdownItem } from './_components/ProductActions/ProductActions';

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

async function Table() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } } 
    }
  })

  if (!products.length) return <div className={cls.noProducts}>No products yet</div>

  return (
    <div className={cls.tableContainer}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(p => (
              <tr key={p.id}>
                <td>
                  <Image 
                    src={p.isAvailableForPurchase ? CircleCheck : CircleCross} 
                    height={20} 
                    alt='product availability'
                  />
                </td>
                <td>{p.name}</td>
                <td>{formatCurrency(p.priceInCents / 100)}</td>
                <td>{formatNumber(p._count.orders)}</td>
                <td>
                  <DropdownMenu
                    trigger={
                      <Image
                        src={ElipsisVertical}
                        height={20} 
                        alt='Elipsis Vertical'
                      />}
                    >
                    <a download href={`/admin/products/${p.id}/download`}>Download</a>
                    <Link href={`/admin/products/${p.id}/edit`}>Edit</Link>
                    <AvailableForPurchaseToggleDropdownItem id={p.id} isAvailableForPurchase={p.isAvailableForPurchase} />
                    <DeleteDropdownItem id={p.id} isDisabled={p._count.orders > 0} />
                  </DropdownMenu>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
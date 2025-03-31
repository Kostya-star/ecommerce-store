'use client';

import Link from 'next/link';
import cl from './Nav.module.scss'
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    href: '/admin',
    content: 'Dashboard'
  },
  {
    href: '/admin/products',
    content: 'Products'
  },
  {
    href: '/admin/customers',
    content: 'Customers'
  },
  {
    href: '/admin/sales',
    content: 'Sales'
  }
]

export default function Nav() {
  const pathname = usePathname();

  return <nav className={cl.Nav}>
    {
      navLinks.map(link => 
          <Link 
            key={link.href} 
            href={link.href} 
            className={`${cl.link} ${pathname === link.href ? cl.active : ''}`}>
              {link.content}
          </Link>
        )
    }
  </nav>
}
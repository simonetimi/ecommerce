import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Nav, { NavLink } from '@/components/Nav';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { checkRole } from '@/utils/roles';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // check if it has permission to access admin dashboard
  if (!checkRole('admin')) {
    redirect('/');
  }

  return (
    <>
      <Nav>
        <NavLink href="/admin" main="/admin">
          Dashboard
        </NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/customers">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
        <div className="ml-auto flex items-center gap-x-2">
          <NavLink href="/">Back to the shop</NavLink>
          <ThemeSwitcher className="ml-2" />
          <UserButton
            appearance={{
              elements: { rootBox: 'justify-end' },
            }}
          />
        </div>
      </Nav>
      <main className="flex flex-col p-6">{children}</main>
    </>
  );
}

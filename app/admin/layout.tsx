import Nav, { NavLink } from '@/components/Nav';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin/dashboard">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
        <ThemeSwitcher className="ml-auto" />
      </Nav>
      <main className="flex flex-col p-6">{children}</main>
    </>
  );
}

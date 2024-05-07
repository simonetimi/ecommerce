import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import {
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

import SigninButton from '@/app/(shop)/_components/signin-button';
import { NavLink } from '@/components/Nav';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { checkRole } from '@/utils/roles';

const Header = async () => {
  const { userId } = auth();
  const isAdmin = checkRole('admin');

  return (
    <header
      className="sticky top-0 z-40 flex h-20 w-screen items-center border-b-1 border-gray-300 bg-white/20 p-6 backdrop-blur-md dark:border-white/10
         dark:bg-gray-800/10 dark:backdrop-blur"
    >
      <nav className="flex gap-x-4">
        <NavLink href="/" main="/">
          <HomeIcon className="h-4 w-4" />
          Home
        </NavLink>
        <NavLink href="/products">
          <BuildingStorefrontIcon className="h-4 w-4" />
          Products
        </NavLink>
        <NavLink href="/orders">
          <ShoppingBagIcon className="h-4 w-4" />
          My orders
        </NavLink>
      </nav>
      <div className="ml-auto flex items-center gap-x-2">
        {isAdmin && (
          <Button as={Link} color="secondary" href="/admin">
            Admin dashboard
          </Button>
        )}
        <ThemeSwitcher className="ml-2" />
        {userId ? (
          <>
            <UserButton
              appearance={{
                elements: { rootBox: 'justify-end' },
              }}
            />
          </>
        ) : (
          <SigninButton />
        )}
      </div>
    </header>
  );
};

export default Header;

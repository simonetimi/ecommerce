'use client';

import { ComponentProps } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      className="sticky top-0 z-40 flex h-20 w-screen items-center gap-4 border-b-1 border-gray-300 bg-white/20 p-6 backdrop-blur-md
         dark:border-white/20 dark:bg-gray-800/10 dark:backdrop-blur"
    >
      {children}
    </nav>
  );
};

export default Nav;

export const NavLink = (
  props: Omit<ComponentProps<typeof Button>, 'className'>,
) => {
  const pathname = usePathname();

  return (
    <Button
      {...props}
      color={
        props.href && pathname.startsWith(props.href) ? 'primary' : 'default'
      }
      size="md"
      variant="solid"
      as={Link}
    ></Button>
  );
};

import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

import SigninButton from '@/app/(shop)/_components/signin-button';
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
      <div className="ml-auto flex items-center gap-x-2">
        {isAdmin && (
          <Button as={Link} color="secondary" href="/admin/dashboard">
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

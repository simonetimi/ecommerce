'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SigninButton = () => {
  const pathname = usePathname();
  return (
    <Button
      as={Link}
      color="primary"
      href={`/sign-in?redirect_url=${pathname}`}
    >
      Sign in
    </Button>
  );
};

export default SigninButton;

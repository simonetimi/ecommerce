import { CardBody, CardHeader } from '@nextui-org/card';
import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <Card className="flex h-[600] w-2/3 gap-y-8 rounded-xl p-6 md:w-[400px]">
        <CardHeader className="flex-col items-center justify-center">
          <h1 className="text-2xl">Store Splash Screen</h1>
        </CardHeader>
        <CardBody className="flex-col items-center justify-center">
          <Button as={Link} variant="solid" color="secondary" href="/shop">
            Go to the store
          </Button>
        </CardBody>
      </Card>
    </main>
  );
}

'use client';

import { useEffect, useState, useTransition } from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button, Image, Skeleton } from '@nextui-org/react';
import { Product } from '@prisma/client';
import Link from 'next/link';

const ProductGrid = ({
  title,
  fetchFn,
}: {
  title: string;
  fetchFn: () => Promise<Product[]>;
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetchFn();
      setProducts(response);
    })();
  }, []);

  return (
    <Card className="w-4/5 p-4 lg:w-[800px]" radius="lg">
      <CardHeader className="flex gap-x-4">
        <p className="text-2xl">{title}</p>
        <Button as={Link} variant="ghost" href="/products">
          View all <ArrowLongRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <Skeleton className="h-64 rounded-lg" isLoaded={!!products}>
        <CardBody className="flex-row flex-wrap gap-4">
          {products &&
            products.map((product) => (
              <Card key={product.id} className="h-[230px] w-[210px] shadow-md">
                <CardBody className="items-center justify-center">
                  <Image
                    alt={product.name}
                    src={product.imagePath}
                    className="h-[150px] w-[150px] object-contain"
                  />
                </CardBody>
                <CardFooter>
                  <p className="p-1">{product.name}</p>
                </CardFooter>
              </Card>
            ))}
        </CardBody>
      </Skeleton>
    </Card>
  );
};

export default ProductGrid;

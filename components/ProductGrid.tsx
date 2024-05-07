'use client';

import { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Image } from '@nextui-org/react';
import { Product } from '@prisma/client';
import Link from 'next/link';

import SkeletonProductCard from '@/components/SkeletonProductCard';
import { formatCurrency } from '@/lib/formatters';

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
  }, [fetchFn]);

  return (
    <div className="w-full px-14 py-4">
      <div className="flex gap-x-4 pb-4">
        <p className="text-2xl">{title}</p>
        <Button as={Link} variant="ghost" href="/products">
          View all <ArrowLongRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-6 pb-6">
        {!products
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))
          : products?.map((product) => (
              <Card key={product.id} className="h-[270px] w-[310px] shadow-md">
                <CardBody className="items-center justify-center">
                  <Image
                    alt={product.name}
                    src={product.imagePath}
                    className="h-[110px] w-[110px] rounded-lg object-contain"
                  />
                </CardBody>
                <CardFooter className="flex flex-col items-start">
                  <p className="p-1 font-bold">{product.name}</p>
                  <p className="p-1">
                    {formatCurrency(product.priceInCents / 100)}
                  </p>
                  <Button color="primary" className="w-full rounded-md">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;

'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

import PageHeader from '@/app/admin/_components/PageHeader';

const ProductsSection = () => {
  return (
    <section className="flex w-full items-center justify-between">
      <PageHeader>Products</PageHeader>
      <Button href="/admin/products/new" as={Link} color="primary">
        <PlusIcon height={22} width={22} />
        Add product
      </Button>
    </section>
  );
};

export default ProductsSection;

import ProductsSection from '@/app/admin/_components/ProductSection';
import ProductsTable from '@/app/admin/_components/ProductsTable';
import prisma from '@/utils/db';

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { Orders: true } },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <main className="w-full self-center lg:w-[900px]">
      <ProductsSection />
      <section className="flex w-full items-center justify-center py-6">
        <ProductsTable products={products} />
      </section>
    </main>
  );
};

export default ProductsPage;

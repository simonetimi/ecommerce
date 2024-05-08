import ProductsSection from '@/app/admin/_components/ProductSection';
import ProductsTable from '@/app/admin/_components/ProductsTable';
import prisma from '@/utils/db';

const ProductsPage = async () => {
  const productsShownPerPage = 15;
  const getProducts = async (page: number = 1) => {
    'use server';
    return prisma.product.findMany({
      select: {
        id: true,
        name: true,
        priceInCents: true,
        isAvailableForPurchase: true,
        _count: { select: { Orders: true } },
      },
      orderBy: { name: 'asc' },
      take: productsShownPerPage,
      skip: (page - 1) * productsShownPerPage,
    });
  };

  const totalPages = Math.ceil(
    (await prisma.product.count()) / productsShownPerPage,
  );

  return (
    <main className="w-full self-center lg:w-[900px]">
      <ProductsSection />
      <section className="flex w-full items-center justify-center py-6">
        <ProductsTable fetchFn={getProducts} pages={totalPages} />
      </section>
    </main>
  );
};

export default ProductsPage;

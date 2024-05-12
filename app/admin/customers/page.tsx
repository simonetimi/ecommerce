import CustomersTable from '@/app/admin/_components/CustomersTable';
import ProductsSection from '@/app/admin/_components/ProductSection';
import prisma from '@/utils/db';

const CustomersPage = async () => {
  const usersShownPerPage = 15;
  const getUsers = async (page: number = 1) => {
    'use server';
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        Orders: { select: { pricePaidInCents: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: usersShownPerPage,
      skip: (page - 1) * usersShownPerPage,
    });
  };

  const totalPages = Math.ceil((await prisma.user.count()) / usersShownPerPage);

  return (
    <main className="w-full self-center lg:w-[900px]">
      <ProductsSection />
      <section className="flex w-full items-center justify-center py-6">
        <CustomersTable fetchFn={getUsers} pages={totalPages} />
      </section>
    </main>
  );
};

export default CustomersPage;

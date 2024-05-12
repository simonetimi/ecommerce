import OrdersTable from '@/app/admin/_components/OrdersTable';
import prisma from '@/utils/db';

const OrdersPage = async () => {
  const ordersShownPerPage = 15;
  const getOrders = async (page: number = 1) => {
    'use server';
    return prisma.order.findMany({
      select: {
        id: true,
        pricePaidInCents: true,
        product: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: ordersShownPerPage,
      skip: (page - 1) * ordersShownPerPage,
    });
  };

  const totalPages = Math.ceil(
    (await prisma.user.count()) / ordersShownPerPage,
  );

  return (
    <main className="w-full self-center lg:w-[900px]">
      <h1 className="text-3xl">Sales</h1>
      <section className="flex w-full items-center justify-center py-6">
        <OrdersTable fetchFn={getOrders} pages={totalPages} />
      </section>
    </main>
  );
};

export default OrdersPage;

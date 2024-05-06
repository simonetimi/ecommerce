'use server';

import prisma from '@/utils/db';

const getSales = async () => {
  const sales = await prisma.order.aggregate({
    _sum: { pricePaidInCent: true },
    _count: true,
  });

  return {
    amount: (sales._sum.pricePaidInCent || 0) / 100,
    numberOfSales: sales._count,
  };
};

export default getSales;

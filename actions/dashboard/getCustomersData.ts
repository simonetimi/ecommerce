'use server';

import prisma from '@/utils/db';

const getCustomersData = async () => {
  const [userCount, orderData] = await Promise.all([
    await prisma.user.count(),
    await prisma.order.aggregate({
      _sum: { pricePaidInCent: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCent || 0) / userCount / 100,
  };
};

export default getCustomersData;

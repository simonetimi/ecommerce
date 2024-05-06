'use server';

import prisma from '@/utils/db';

const getProductsData = async () => {
  const [activeProducts, inactiveProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return { activeProducts, inactiveProducts };
};

export default getProductsData;

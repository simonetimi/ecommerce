'use server';

import prisma from '@/utils/db';

export const userOrderExists = async (email: string, productId: string) => {
  return prisma.order.findFirst({
    where: { user: { email }, productId },
    select: { id: true },
  });
};

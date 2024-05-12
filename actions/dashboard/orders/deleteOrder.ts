'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/utils/db';
import { checkRole } from '@/utils/roles';

interface Response {
  success: string;
}

export const deleteOrder = async (orderData: {
  id: string;
}): Promise<Response> => {
  try {
    if (!checkRole('admin')) throw new Error('Unauthorized');

    await prisma.order.delete({
      where: {
        id: orderData.id,
      },
    });

    revalidatePath('/admin/orders');

    return { success: 'Order deleted successfully!' };
  } catch (error) {
    throw error;
  }
};

'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

import prisma from '@/utils/db';
import { checkRole } from '@/utils/roles';

interface Response {
  success: string;
}

export const deleteProduct = async (productData: {
  id: string;
}): Promise<Response> => {
  try {
    if (!checkRole('admin')) throw new Error('Unauthorized');

    const product = await prisma.product.delete({
      where: {
        id: productData.id,
      },
    });

    await fs.unlink(product.filePath);
    await fs.unlink(product.imagePath);

    revalidatePath('/admin/products');

    return { success: 'Product deleted successfully!' };
  } catch (error) {
    throw error;
  }
};

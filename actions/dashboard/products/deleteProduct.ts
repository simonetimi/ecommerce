'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

import prisma from '@/utils/db';

interface Response {
  success: string;
}

export const deleteProduct = async (productData: {
  id: string;
}): Promise<Response> => {
  try {
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

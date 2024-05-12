'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/utils/db';
import { checkRole } from '@/utils/roles';

interface Response {
  success: string;
}

export const deleteUser = async (userData: {
  id: string;
}): Promise<Response> => {
  try {
    if (!checkRole('admin')) throw new Error('Unauthorized');

    await prisma.user.delete({
      where: {
        id: userData.id,
      },
    });

    revalidatePath('/admin/customers');

    return { success: 'User deleted successfully!' };
  } catch (error) {
    throw error;
  }
};

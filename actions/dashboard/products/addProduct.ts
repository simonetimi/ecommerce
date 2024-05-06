'use server';

import { Prisma } from '@prisma/client';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

import { AddProductSchema } from '@/schemas/schemas';
import prisma from '@/utils/db';

interface Response {
  success: string;
}

export const addProduct = async (formData: FormData): Promise<Response> => {
  try {
    // get data from formData
    const values = Object.fromEntries(formData.entries());

    const validatedFields = AddProductSchema.parse(values);
    const { name, description, price, cents, file, image } = validatedFields;

    const priceInCents = price * 100 + cents;

    // create folder at specified path, if it doesn't exist
    const productsDir = 'products';
    await fs.mkdir(productsDir, { recursive: true });
    // convert file to buffer and write it to the right path
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filePath = `${productsDir}/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(filePath, fileBuffer);

    // same but with the image file
    await fs.mkdir(`public/${productsDir}`, { recursive: true });
    // writes to public folder, but the link doesn't contain the public directory (it's automatically served by next.js)
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imagePath = `${productsDir}/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(`public/${imagePath}`, imageBuffer);

    await prisma.product.create({
      data: {
        name,
        description,
        priceInCents,
        filePath,
        imagePath,
      },
    });

    revalidatePath('/admin/products');

    return { success: 'Product added successfully!' };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Product exists already in database!');
    }
    throw error;
  }
};

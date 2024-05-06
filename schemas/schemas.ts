import * as z from 'zod';

const FileSchema = z.instanceof(File, { message: 'File is required' });

const ImageSchema = FileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/'),
  'Image must be an image format',
);

export const AddProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z
    .string()
    .min(
      5,
      'Product description is required and should be at least 5 characters long',
    ),
  price: z.coerce.number({ message: 'Numbers only' }).int().gte(0),
  cents: z.coerce
    .number({ message: 'Numbers only' })
    .int()
    .gte(0)
    .lte(99, "Cents can't be higher than 99"),
  file: FileSchema.refine((file) => file.size > 0, 'File is required'),
  image: ImageSchema.refine((file) => file.size > 0, 'Image is required'),
});

export const EditProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z
    .string()
    .min(
      5,
      'Product description is required and should be at least 5 characters long',
    ),
  price: z.coerce.number({ message: 'Numbers only' }).int().gte(0),
  cents: z.coerce
    .number({ message: 'Numbers only' })
    .int()
    .gte(0)
    .lte(99, "Cents can't be higher than 99"),
  file: z.any().optional(),
  image: z.any().optional(),
});

export const ProductIdSchema = z.object({
  id: z.string().min(1),
  filePath: z.string().min(1),
  imagePath: z.string().min(1),
});

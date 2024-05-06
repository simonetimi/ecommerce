'use client';

import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody } from '@nextui-org/card';
import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { toast } from 'sonner';
import * as z from 'zod';

import { addProduct } from '@/actions/dashboard/products/addProduct';
import { editProduct } from '@/actions/dashboard/products/editProduct';
import FileInput from '@/components/FileInput';
import { AddProductSchema, EditProductSchema } from '@/schemas/schemas';

const ProductForm = ({ product }: { product: Product | null }) => {
  const [isPending, startTransition] = useTransition();
  const [resetFileUploadComponent, setResetFileUploadComponent] =
    useState(false);

  const onSubmit = async (
    values: z.infer<typeof AddProductSchema | typeof EditProductSchema>,
  ) => {
    // encapsulating in formData is necessary to send file in a server action
    const formData = new FormData();
    // creates the keys pairing name and data
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      formData.append(
        key,
        typeof value === 'number' ? value.toString() : value,
      );
    });
    // add id if product exists
    if (product) {
      formData.append('id', product.id);
      formData.append('filePath', product.filePath);
      formData.append('imagePath', product.imagePath);
    }
    // sends data
    startTransition(() => {
      (async () => {
        toast.promise(product ? editProduct(formData) : addProduct(formData), {
          loading: product ? 'Updating...' : 'Adding...',
          success: (data) => {
            if (!product) {
              reset();
              setResetFileUploadComponent(true);
            }
            return data.success;
          },
          error: (error) => error.message,
        });
      })();
    });
  };

  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof AddProductSchema | typeof EditProductSchema>
  >({
    resolver: zodResolver(product ? EditProductSchema : AddProductSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: Math.floor(product.priceInCents / 100),
          cents: product.priceInCents % 100,
          file: undefined,
          image: undefined,
        }
      : {
          name: '',
          description: '',
          price: undefined,
          cents: undefined,
          file: undefined,
          image: undefined,
        },
  });

  const handleResetComplete = () => {
    setResetFileUploadComponent(false);
  };

  return (
    <Card className="flex w-full flex-col items-center justify-center py-4">
      <CardBody className="w-full md:w-2/3">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Input
                isInvalid={fieldState.invalid}
                errorMessage={formState.errors?.name?.message?.toString()}
                value={field.value}
                onChange={field.onChange}
                label="Product name"
                disabled={isPending}
              />
            )}
          />
          <div className="flex items-start gap-1">
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState, formState }) => (
                <Input
                  isInvalid={fieldState.invalid}
                  errorMessage={formState.errors?.price?.message?.toString()}
                  value={
                    field.value === undefined ? '' : field.value?.toString()
                  }
                  onChange={field.onChange}
                  label="Price in $"
                  type="tel"
                  disabled={isPending}
                />
              )}
            />
            <Controller
              name="cents"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  isInvalid={fieldState.invalid}
                  value={
                    field.value === undefined ? '' : field.value?.toString()
                  }
                  onChange={field.onChange}
                  label="Cents (0-99)"
                  type="tel"
                  disabled={isPending}
                />
              )}
            />
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Textarea
                isInvalid={fieldState.invalid}
                errorMessage={formState.errors?.description?.message?.toString()}
                value={field.value}
                onChange={field.onChange}
                label="Description"
                disabled={isPending}
              />
            )}
          />
          <Controller
            name="file"
            control={control}
            render={({ field, fieldState }) => (
              <FileInput
                name="file"
                description={
                  product
                    ? `${product.filePath.slice(0, 22)}...`
                    : 'Upload the product file'
                }
                buttonName="Select file"
                disabled={isPending}
                onChange={(file) => {
                  field.onChange(file);
                }}
                isInvalid={fieldState.invalid}
                reset={resetFileUploadComponent}
                onResetComplete={handleResetComplete}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ fieldState, field }) => (
              <FileInput
                name="image"
                description={
                  product
                    ? `${product.imagePath.slice(0, 22)}...`
                    : 'Upload the product image'
                }
                buttonName="Select image"
                disabled={isPending}
                onChange={(file) => {
                  field.onChange(file);
                }}
                isInvalid={fieldState.invalid}
                reset={resetFileUploadComponent}
                onResetComplete={handleResetComplete}
              />
            )}
          />
          {product && (
            <Image
              alt="Product image"
              src={`/${product.imagePath}`}
              className="h-auto w-[400px]"
            />
          )}
          <Button className="self-center" type="submit" color="primary">
            {product ? 'Edit product' : 'Add product'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProductForm;

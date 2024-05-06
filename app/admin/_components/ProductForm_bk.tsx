'use client';

import { useTransition } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Button, Input, Textarea } from '@nextui-org/react';
import { toast } from 'sonner';

import { addProduct } from '@/actions/dashboard/products/addProduct';
import FileInput from '@/components/FileInput';

const ProductForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }
    const formData = new FormData(event.target);
    startTransition(() => {
      (async () => {
        toast.promise(addProduct(formData), {
          loading: 'Adding...',
          success: (data) => {
            return data.success;
          },
          error: (error) => error.message,
        });
      })();
    });
  };

  return (
    <Card className="flex w-full flex-col items-center justify-center">
      <CardBody className="w-full md:w-2/3">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Product name"
            name="name"
            minLength={1}
            maxLength={254}
            disabled={isPending}
            required
          />
          <div className="flex items-end gap-1">
            <Input
              type="tel"
              label="Price ($)"
              name="price"
              min={0}
              disabled={isPending}
              required
            />
            <p>,</p>
            <Input
              className="w-2/3"
              type="tel"
              label="Cents"
              name="cents"
              max={99}
              min={0}
              disabled={isPending}
              required
            />
          </div>
          <Textarea
            name="description"
            label="Description"
            disabled={isPending}
            required
          />
          <FileInput
            name="file"
            description="Upload the product file"
            buttonName="Select file"
            disabled={isPending}
            required
          />
          <FileInput
            name="image"
            description="Upload the product image"
            buttonName="Select image"
            disabled={isPending}
            required
          />
          <Button className="self-center" type="submit" color="primary">
            Add product
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProductForm;

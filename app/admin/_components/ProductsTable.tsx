'use client';

import React, { useEffect, useState, useTransition } from 'react';
import {
  ArrowDownOnSquareIcon,
  CheckCircleIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Pagination } from '@nextui-org/pagination';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import { Product } from '@prisma/client';
import { toast } from 'sonner';

import { changeProductAvailability } from '@/actions/dashboard/products/changeProductAvailability';
import { deleteProduct } from '@/actions/dashboard/products/deleteProduct';
import ConfirmModal from '@/components/ConfirmModal';
import { formatCurrency, formatNumber } from '@/lib/formatters';

interface ProductsProp {
  id: string;
  name: string;
  priceInCents: number;
  isAvailableForPurchase: boolean;
  _count: { Orders: number };
}

const ProductsTable = ({
  fetchFn,
  pages,
}: {
  fetchFn: (page?: number) => Promise<ProductsProp[]>;
  pages?: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [products, setProducts] = useState<ProductsProp[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchFn(currentPage);
      setProducts(response);
    })();
  }, [fetchFn, currentPage]);

  const handleProductDelete = async () => {
    const productData = {
      id: selectedProductId,
    };
    startTransition(() => {
      (async () => {
        toast.promise(deleteProduct(productData), {
          loading: 'Deleting...',
          success: (data) => {
            return data.success;
          },
          error: (error) => error.message,
        });
      })();
    });
  };

  if (!products) return <p>No products found.</p>;

  return (
    <div className="flex w-full flex-col items-center">
      <ConfirmModal
        action={handleProductDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <Table
        aria-label="Products table"
        classNames={{
          wrapper: 'dark:bg-slate-700/60',
          th: 'dark:bg-slate-600',
        }}
      >
        <TableHeader>
          <TableColumn className="w-0">
            <span className="sr-only">Available</span>
          </TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Orders</TableColumn>
          <TableColumn className="w-0">
            <span className="sr-only">Actions</span>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <CheckCircleIcon
                    aria-label="Available"
                    className="h-6 w-6 text-success-500"
                  />
                ) : (
                  <XCircleIcon
                    aria-label="Not available"
                    className="h-6 w-6 text-danger-500"
                  />
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}
              </TableCell>
              <TableCell>{formatNumber(product._count.Orders)}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="light" isIconOnly>
                      <EllipsisVerticalIcon
                        aria-label="Action"
                        className="h-6 w-6"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Actions"
                    disabledKeys={product._count.Orders > 0 ? ['delete'] : ''}
                  >
                    <DropdownItem
                      key="download"
                      startContent={
                        <ArrowDownOnSquareIcon className="mb-0.5 h-5 w-5" />
                      }
                      href={`/admin/products/${product.id}/download`}
                    >
                      Download
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      startContent={
                        <PencilSquareIcon className="mb-0.5 h-4 w-4" />
                      }
                      href={`/admin/products/${product.id}/edit`}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="activation"
                      isReadOnly={isPending}
                      color={
                        product.isAvailableForPurchase ? 'danger' : 'success'
                      }
                      startContent={
                        product.isAvailableForPurchase ? (
                          <XCircleIcon className="mb-0.5 h-4 w-4" />
                        ) : (
                          <CheckCircleIcon className="mb-0.5 h-4 w-4" />
                        )
                      }
                      onPress={() => {
                        const productData = {
                          isAvailableForPurchase:
                            product.isAvailableForPurchase,
                          id: product.id,
                        };
                        startTransition(() => {
                          (async () => {
                            toast.promise(
                              changeProductAvailability(productData),
                              {
                                loading: 'Updating...',
                                success: (data) => {
                                  return data.success;
                                },
                                error: (error) => error.message,
                              },
                            );
                          })();
                        });
                      }}
                    >
                      {product.isAvailableForPurchase
                        ? 'Disable purchase'
                        : 'Enable purchase'}
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      isReadOnly={isPending}
                      color="danger"
                      startContent={<TrashIcon className="mb-0.5 h-4 w-4" />}
                      onPress={() => {
                        setSelectedProductId(product.id);
                        onOpen();
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pages && (
        <Pagination
          total={pages || 1}
          color="primary"
          page={currentPage}
          onChange={setCurrentPage}
          className="mt-4 self-center"
          classNames={{ item: 'dark:bg-slate-600/60' }}
        />
      )}
    </div>
  );
};

export default ProductsTable;

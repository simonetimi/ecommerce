'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
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
import { toast } from 'sonner';

import { deleteOrder } from '@/actions/dashboard/orders/deleteOrder';
import ConfirmModal from '@/components/ConfirmModal';
import { formatCurrency } from '@/lib/formatters';

interface OrdersProps {
  id: string;
  pricePaidInCents: number;
  product: { name: string };
  user: { email: string };
}

const OrdersTable = ({
  fetchFn,
  pages,
}: {
  fetchFn: (page?: number) => Promise<OrdersProps[]>;
  pages?: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectOrderId, setSelectOrderId] = useState('');
  const [orders, setOrders] = useState<OrdersProps[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchFn(currentPage);
      setOrders(response);
    })();
  }, [fetchFn, currentPage]);

  const handleOrderDelete = async () => {
    const orderData = {
      id: selectOrderId,
    };
    startTransition(() => {
      (async () => {
        toast.promise(deleteOrder(orderData), {
          loading: 'Deleting...',
          success: (data) => {
            return data.success;
          },
          error: (error) => error.message,
        });
      })();
    });
  };

  if (!orders) return <p>No orders found.</p>;

  return (
    <div className="flex w-full flex-col items-center">
      <ConfirmModal
        action={handleOrderDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <Table
        aria-label="Orders table"
        classNames={{
          wrapper: 'dark:bg-slate-700/60',
          th: 'dark:bg-slate-600',
        }}
      >
        <TableHeader>
          <TableColumn>Product</TableColumn>
          <TableColumn>Customer</TableColumn>
          <TableColumn>Value</TableColumn>
          <TableColumn className="w-0">
            <span className="sr-only">Actions</span>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>
                {formatCurrency(order.pricePaidInCents / 100)}
              </TableCell>
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
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem
                      key="delete"
                      isReadOnly={isPending}
                      color="danger"
                      startContent={<TrashIcon className="mb-0.5 h-4 w-4" />}
                      onPress={() => {
                        setSelectOrderId(order.id);
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

export default OrdersTable;

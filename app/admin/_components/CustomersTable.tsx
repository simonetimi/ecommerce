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

import { deleteUser } from '@/actions/dashboard/users/deleteUser';
import ConfirmModal from '@/components/ConfirmModal';
import { formatCurrency, formatNumber } from '@/lib/formatters';

interface CustomersProp {
  id: string;
  email: string;
  Orders: {
    pricePaidInCents: number;
  }[];
}

const CustomersTable = ({
  fetchFn,
  pages,
}: {
  fetchFn: (page?: number) => Promise<CustomersProp[]>;
  pages?: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [customers, setCustomers] = useState<CustomersProp[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchFn(currentPage);
      setCustomers(response);
    })();
  }, [fetchFn, currentPage]);

  const handleCustomerDelete = async () => {
    const customerData = {
      id: selectedUserId,
    };
    startTransition(() => {
      (async () => {
        toast.promise(deleteUser(customerData), {
          loading: 'Deleting...',
          success: (data) => {
            return data.success;
          },
          error: (error) => error.message,
        });
      })();
    });
  };

  if (!customers) return <p>No customers found.</p>;

  return (
    <div className="flex w-full flex-col items-center">
      <ConfirmModal
        action={handleCustomerDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <Table
        aria-label="Customers table"
        classNames={{
          wrapper: 'dark:bg-slate-700/60',
          th: 'dark:bg-slate-600',
        }}
      >
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Orders</TableColumn>
          <TableColumn>Value</TableColumn>
          <TableColumn className="w-0">
            <span className="sr-only">Actions</span>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{formatNumber(customer.Orders.length)}</TableCell>
              <TableCell>
                {formatCurrency(
                  customer.Orders.reduce(
                    (acc, order) => order.pricePaidInCents + acc,
                    0,
                  ) / 100,
                )}
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
                        setSelectedUserId(customer.id);
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

export default CustomersTable;

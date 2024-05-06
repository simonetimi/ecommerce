import { Spinner } from '@nextui-org/react';

import getCustomersData from '@/actions/dashboard/getCustomersData';
import getProductsData from '@/actions/dashboard/getProductsData';
import getSalesData from '@/actions/dashboard/getSalesData';
import DashboardCard from '@/app/admin/_components/DashboardCard';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const DashboardPage = async () => {
  const sales = await getSalesData();
  const customersData = await getCustomersData();
  const productsData = await getProductsData();

  if (!sales || !customersData || !productsData) {
    return (
      <div className="flex items-center justify-center">
        <Spinner label="Loading data..." size="md" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Products"
        description={`Inactive products: ${formatNumber(productsData.inactiveProducts)}`}
        content={`Total active products: ${formatNumber(productsData.activeProducts)}`}
      />
      <DashboardCard
        title="Customers"
        description={`Average sales value: ${formatCurrency(customersData.averageValuePerUser)}`}
        content={`Total customers: ${formatNumber(customersData.userCount)}`}
      />
      <DashboardCard
        title="Sales"
        description={`Number of orders: ${formatNumber(sales.numberOfSales)}`}
        content={`Total sales: ${formatCurrency(sales.amount)}`}
      />
    </div>
  );
};

export default DashboardPage;

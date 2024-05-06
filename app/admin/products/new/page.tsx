import PageHeader from '@/app/admin/_components/PageHeader';
import ProductForm from '@/app/admin/_components/ProductForm';

const NewProductPage = () => {
  return (
    <main className="w-full self-center sm:w-2/3 lg:w-[600px]">
      <PageHeader>Add product</PageHeader>
      <ProductForm />
    </main>
  );
};

export default NewProductPage;

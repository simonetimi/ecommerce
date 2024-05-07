import {
  getMostPopularProducts,
  getNewestProducts,
} from '@/actions/shop/products/getProducts';
import ProductGrid from '@/components/ProductGrid';

const ShopPage = () => {
  return (
    <main className="flex flex-col items-center py-10">
      <ProductGrid title="Newest products" fetchFn={getNewestProducts} />
      <ProductGrid title="Most popular" fetchFn={getMostPopularProducts} />
    </main>
  );
};

export default ShopPage;

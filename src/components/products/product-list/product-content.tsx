import Loader from "@/components/shared/loader/loader";
import ErrorMessage from "@/components/shared/errors/error-message";
import ProductList from "./product-list";
import ProductNotFound from "./product-not-found";
import type { Product } from "@/mapper/product.mapper";
import { useProductFilter } from "@/hooks/use-product-filter";

interface IProductContentProps {
  products?: Product[];
  query: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const ProductContent = ({ products, query, isLoading, isError, isSuccess }: IProductContentProps) => {

  const { filteredProducts, isFiltering } = useProductFilter(products, query);

  const hasProducts = filteredProducts.length > 0;


  if (isLoading || isFiltering) return <Loader message="Loading products..." />;
  if (isError) return <ErrorMessage message="Error loading products. Please try again." />;
  if (isSuccess && !hasProducts) return <ProductNotFound />;

  return (
    <div className="w-full flex justify-start">
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductContent;


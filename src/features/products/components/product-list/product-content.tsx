import type { IApiError } from "@/lib/axios";

import ProductList from "./product-list";
import ProductNotFound from "./product-not-found";
import type { IProduct } from "@/features/products/mappers/product.mapper";
import { useProductFilter } from "@/features/products/hooks/use-product-filter";
import Loader from "@/shared/loader/loader";
import ErrorMessage from "@/shared/errors/error-message";

interface IProductContentProps {
  products?: IProduct[];
  query: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: IApiError;
}

const ProductContent = ({ products, query, isLoading, isError, isSuccess, error }: IProductContentProps) => {

  const { filteredProducts, isFiltering } = useProductFilter(products, query);

  const hasProducts = filteredProducts.length > 0;


  if (isLoading || isFiltering) return <Loader message="Loading products..." />;
  if (isError) return <ErrorMessage
    message={error?.message || "Error loading products. Please try again."}
  />
  if (isSuccess && !hasProducts) return <ProductNotFound />;

  return (
    <div className="w-full flex justify-start">
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductContent;


import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import ProductDetailsWrapper from "@/components/products/product-details/product-details.wrapper";
import { useBreadcrumb } from "@/contexts/breadcrumb.context";
import { useProduct } from "@/hooks/query/use-product";
import Loader from "@/components/shared/loader/loader";
import ProductDetailsNotFound from "@/components/products/product-details/product-details-not-found";
import ErrorMessage from "@/components/shared/errors/error-message";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { setLabel } = useBreadcrumb();

  const { data: product, isLoading, isError, error } = useProduct(id || "");

  useLayoutEffect(() => {
    if (!product) return;

    setLabel(`/${id}`, product.model);
  }, [id, product, setLabel]);

  if (isLoading) return <Loader message="Loading product..." />
  if (isError) return <ErrorMessage message={error?.message || "Error loading product. Please try again."} />;
  if (!product) return <ProductDetailsNotFound />

  return (
    <ProductDetailsWrapper product={product} />
  )
}

export default ProductDetailsPage

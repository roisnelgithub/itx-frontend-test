import { useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

import ProductDetailsWrapper from "@/components/products/product-details/product-details.wrapper";
import { useBreadcrumb } from "@/contexts/breadcrumb.context";
import { useProduct } from "@/hooks/query/use-product";
import Loader from "@/components/shared/loader/loader";
import ProductDetailsNotFound from "@/components/products/product-details/product-details-not-found";
import ErrorMessage from "@/components/shared/errors/error-message";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { setLabel } = useBreadcrumb();

  const { data: product, isLoading, isError, error } = useProduct(id || "");

  useLayoutEffect(() => {
    if (!product) return;

    setLabel(`/${id}`, product.model);
  }, [id, product, setLabel]);

  return (
    <section>
      <div className="w-full gap-8 px-4 flex justify-between md:justify-start">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Product details
        </h1>
        <Link to="/">
          <Button variant="outline" size="sm" className="pr-4  justify-center items-center">
            <ArrowLeft className="w-4 h-4" />
            <span className="mt-0.5">
              Back
            </span>
          </Button>
        </Link>
      </div>
      {isLoading ?
        <Loader message="Loading product..." /> :
        isError ? <ErrorMessage message={error?.message || "Error loading product. Please try again."} /> :
          !product ? <ProductDetailsNotFound /> : <ProductDetailsWrapper product={product} />}
    </section>
  )
}

export default ProductDetailsPage

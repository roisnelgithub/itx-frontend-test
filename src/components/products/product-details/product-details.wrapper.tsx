import type { ProductResume } from "@/mapper/product.mapper";
import ProductDetailsActions from "./product-details-actions"
import ProductDetailsImage from "./product-details-image"
import ProductDetailsInfo from "./product-details-info"

interface IProductDetailsWrapperProps {
  product: ProductResume;
}
const ProductDetailsWrapper = ({ product }: IProductDetailsWrapperProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Product details
      </h1>
      <main className="flex justify-center py-12 px-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
          <div className="shrink-0 max-w-2xs min-w-2xs justify-center">
            <ProductDetailsImage alt={product.model} imageURL={product.imageURL} />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <ProductDetailsInfo product={product} />
            <ProductDetailsActions />
          </div>
        </div>
      </main>
    </section>
  );
}

export default ProductDetailsWrapper

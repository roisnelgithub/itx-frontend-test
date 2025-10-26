import type { Product } from "@/mapper/product.mapper"
import ProductItem from "./product-item"
import React from "react";


interface IProductListProps {
  products: Product[]
}

const ProductList = React.memo(({ products }: IProductListProps) => {
  return (
    <div className="mx-auto max-w-[1900px] grid gap-6 
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        return <ProductItem product={product} key={product.id} />
      }
      )}
    </div>
  );
});

export default ProductList

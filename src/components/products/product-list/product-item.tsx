import { Card, CardContent } from "@/components/ui/card";

import type { Product } from "@/mapper/product.mapper";
import PriceTag from "@/components/shared/price-tag/price-tag";
import ProductImage from "./product-image,";
import { ProductModel } from "./product-model";

interface IProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg w-52 h-96 transition-shadow duration-300 group hover:cursor-pointer">
      <div className="p-3 bg-gray-50">
        <ProductImage
          src={product.imageURL}
          alt={`${product.brand} ${product.model}`}
          className="rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col gap-1 p-4">
        <span className="text-sm text-gray-400 uppercase">{product.brand}</span>
        <ProductModel model={product.model} />
        {product.price !== 0 ?
          (
            <PriceTag value={product.price} currency="EUR" />
          ) :
          (
            <span className="inline-block px-2 py-1 text-sm font-medium text-red-600 ">
              Price not available
            </span>)
        }

      </CardContent>
    </Card>
  );
};

export default ProductItem;

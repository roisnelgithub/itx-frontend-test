import type { Product } from "@/mapper/product.mapper"

interface IProductItemProps {
  product: Product
}
const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div>
      {product.brand}
    </div>
  )
}

export default ProductItem

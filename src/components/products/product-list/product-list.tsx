import type { Product } from "@/mapper/product.mapper"
import ProductItem from "./product-item"


interface IProductListProps {
  products: Product[]
}
const ProductList = ({ products }: IProductListProps) => {
  return (
    <div>
      {products.map((product) => {
        return (<ProductItem product={product} key={product.id} />)
      })}
    </div>
  )
}

export default ProductList

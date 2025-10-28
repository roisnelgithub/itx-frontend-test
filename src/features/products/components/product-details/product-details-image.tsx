import ProductImage from "../product-list/product-image,"

interface IProductDetailsImage {
  imageURL: string,
  alt: string;
}
const ProductDetailsImage = ({ imageURL, alt }: IProductDetailsImage) => {
  return (
    <ProductImage alt={alt} src={imageURL} />
  )
}

export default ProductDetailsImage

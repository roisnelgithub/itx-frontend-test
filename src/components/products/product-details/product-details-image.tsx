import ProductImage from "../product-list/product-image,"

interface IProductDetailsImage {
  imageURL: string,
  alt: string;
}
const ProductDetailsImage = ({ imageURL, alt }: IProductDetailsImage) => {
  return (
    <div >
      <ProductImage alt={alt} src={imageURL} />
    </div>
  )
}

export default ProductDetailsImage

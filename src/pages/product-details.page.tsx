import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      Product Details {id}
    </div>
  )
}

export default ProductDetailsPage

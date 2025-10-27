import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const ProductDetailsNotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10">
      <p className="text-gray-500 text-sm italic">
        Products not found.
      </p>
      <Link to="/">
        <Button variant="outline">Return to the list.</Button>
      </Link>
    </div>
  )
}

export default ProductDetailsNotFound

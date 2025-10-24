import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  return (
    <div className="relative">
      <Badge
        className="h-5 pt-1 min-w-5 rounded-full px-1 font-mono tabular-nums items-center justify-center absolute -top-3.5 -right-3.5"
        variant='blueLight'
      >
        8
      </Badge>
      <ShoppingCart size={26} color="#000" strokeWidth={1} />
    </div>
  )
}

export default Cart

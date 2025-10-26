import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  return (
    <div className="relative">
      <Badge
        className="h-4.5 min-w-4.5 px-1 pt-1 text-[12px] font-mono flex items-center justify-center absolute -top-2.5 -right-2.5 rounded-full"
        variant='blueLight'
      >
        8
      </Badge>
      <ShoppingCart size={26} color="#000" strokeWidth={1} />
    </div>
  )
}

export default Cart

import ProductImage from "@/components/products/product-list/product-image,"
import type { ICartItem } from "@/store/cart.store"
import { useCartStore } from "@/store/cart.store"
import { Plus, Minus, HardDrive, Palette, Layers } from "lucide-react"

interface ICartItemProps {
  item: ICartItem
}

const CartItem = ({ item }: ICartItemProps) => {
  const { increaseQuantity, decreaseQuantity } = useCartStore()

  return (
    <div className="flex gap-4 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="w-12 h-12 md:w-16 md:h-16 shrink-0">
        <ProductImage
          src={item.imageURL}
          alt={item.name}
          className="rounded-md hidden md:flex"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="font-semibold text-gray-800 truncate w-max-[150px] md:w-max-[180px]">
          {item.name}
        </div>

        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            <span className="font-medium">{item.color}</span>
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />:
            <span className="font-medium">{item.storage}</span>
          </span>
        </div>

        <div className="text-xs text-gray-600 items-center flex gap-2">
          <Layers className="w-3 h-3" />
          <span className="font-medium">
            {item.quantity} x ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="relative flex flex-col justify-between items-end">
        <div className="font-semibold text-gray-800 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <div className="items-center flex gap-1 mt-2">
          <Minus
            size={14}
            onClick={() => decreaseQuantity(item.uniqueId!)}
            className="hover:cursor-pointer"
          />
          <span className="px-2 text-sm font-medium">{item.quantity}</span>
          <Plus
            size={14}
            onClick={() => increaseQuantity(item.uniqueId!)}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </div>

  )
}

export default CartItem

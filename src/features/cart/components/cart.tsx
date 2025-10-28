import { Badge } from "@/components/ui/badge";
import { Inbox, ShoppingCart, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart.store";
import CartItem from "./cart-item";

import { useCartStore } from "@/store/cart.store";
import CartItem from "./cart-item";

const Cart = () => {
  const { count, resetCart, items } = useCartStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          {count > 0 && (
            <Badge
              className="h-4.5 min-w-4.5 px-1 pt-1 text-[12px] font-mono flex items-center justify-center absolute -top-2.5 -right-2.5 rounded-full"
              variant="blueLight"
            >
              {count}
            </Badge>
          )}
          <ShoppingCart size={26} color="#000" strokeWidth={1} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="p-4" >
        {count === 0 ? (
          <DropdownMenuItem disabled>
            <Inbox />
            Cart empty
          </DropdownMenuItem>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.uniqueId} className={index < items.length - 1 ? "mb-2" : ""}>
                <CartItem item={item} />
              </div>
            ))}
            <div className="mt-2 border-t pt-2 flex justify-between ">
              <DropdownMenuItem onClick={resetCart} className="justify-center">
                <Trash2 /> <span className="pr-2">
                  Reset cart
                </span>
              </DropdownMenuItem>
              <div className="flex flex-row items-center gap-2 font-bold">
                <span>Total:</span>
                <span>${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;

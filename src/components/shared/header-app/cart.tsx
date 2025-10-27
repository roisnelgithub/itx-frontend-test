import { useCart } from "@/contexts/cart.context";
import { Badge } from "@/components/ui/badge";
import { Inbox, ShoppingCart, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Cart = () => {
  const { count, setCount } = useCart();

  const resetCart = () => {
    if (count > 0) setCount(0);
  };

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

      <DropdownMenuContent side="bottom" align="end" className="w-36">
        {count === 0 ? (
          <DropdownMenuItem disabled>
            <Inbox />
            Cart empty
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={resetCart}>
            <Trash2 />
            Reset cart
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;

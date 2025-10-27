import { useMutation } from "@tanstack/react-query";

import { useCart } from "../../contexts/cart.context";
import { addProductToCart, type AddProductToCartRequest, type AddProductToCartResponse } from "@/services/product.service";
import { showSuccessToast } from "@/lib/toast";

export const useAddProductToCart = () => {
  const { setCount } = useCart();

  return useMutation<AddProductToCartResponse, Error, AddProductToCartRequest>({
    mutationFn: addProductToCart,
    onSuccess: (data) => {
      setCount((pre) => pre + data.count);
      showSuccessToast("Product added to cart successfully");
    },
  });
};

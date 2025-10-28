import { useMutation } from "@tanstack/react-query";

import { addProductToCart, type AddProductToCartRequest, type AddProductToCartResponse } from "@/services/product.service";
import { showSuccessToast } from "@/lib/toast";
import { useCartStore } from "@/store/cart.store";

export const useAddProductToCart = () => {
  const { addItem } = useCartStore();

  return useMutation<AddProductToCartResponse, Error, AddProductToCartRequest>({
    mutationFn: addProductToCart,
    onSuccess: () => {
      addItem()
      showSuccessToast("Product added to cart successfully");
    },
  });
};

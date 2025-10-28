import { useMutation } from "@tanstack/react-query";

import { addProductToCart, type AddProductToCartRequest, type AddProductToCartResponse } from "@/services/product.service";
import { showSuccessToast } from "@/lib/toast";
import { useCartStore } from "@/store/cart.store";
import type { ProductResume } from "@/mapper/product.mapper";


interface IAddProductLocalData {
  product: ProductResume;
  formData: {
    color: string;
    storage: string;
  };
}

export const useAddProductToCart = () => {
  const { addItem } = useCartStore();

  return useMutation<AddProductToCartResponse, Error, AddProductToCartRequest & IAddProductLocalData>({
    mutationFn: (data) => addProductToCart(data),
    onSuccess: (_, variables) => {
      const { product, formData } = variables;

      addItem({
        id: product.id,
        name: product.model,
        price: product.price,
        imageURL: product.imageURL,
        color: formData.color,
        storage: formData.storage,
      });

      showSuccessToast(`${product.model} added to cart`);
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import {
  addProductToCart,
  type AddProductToCartRequest,
  type AddProductToCartResponse,
} from "@/services/product.service";
import type { ProductResume } from "@/mapper/product.mapper";

interface IAddProductLocalData {
  product: ProductResume;
  formData: {
    color: string;
    storage: string;
  };
}

interface UseAddProductToCartOptions {
  onSuccess?: (
    data: AddProductToCartResponse,
    variables: AddProductToCartRequest & IAddProductLocalData
  ) => void;
  onError?: (error: Error) => void;
}

export const useAddProductToCart = ({
  onSuccess,
  onError,
}: UseAddProductToCartOptions = {}) => {
  return useMutation<
    AddProductToCartResponse,
    Error,
    AddProductToCartRequest & IAddProductLocalData
  >({
    mutationFn: (data) => addProductToCart(data),
    onSuccess,
    onError,
  });
};

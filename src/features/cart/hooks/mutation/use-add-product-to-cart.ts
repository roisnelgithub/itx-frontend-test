import { useMutation } from "@tanstack/react-query";

import type { IProductResume } from "@/features/products/mappers/product.mapper";
import {
  addProductToCart,
  type IAddProductToCartRequest,
  type IAddProductToCartResponse
} from "../../services/cart.service";

interface IAddProductLocalData {
  product: IProductResume;
  formData: {
    color: string;
    storage: string;
  };
}

interface UseAddProductToCartOptions {
  onSuccess?: (
    data: IAddProductToCartResponse,
    variables: IAddProductToCartRequest & IAddProductLocalData
  ) => void;
  onError?: (error: Error) => void;
}

export const useAddProductToCart = ({
  onSuccess,
  onError,
}: UseAddProductToCartOptions = {}) => {
  return useMutation<
    IAddProductToCartResponse,
    Error,
    IAddProductToCartRequest & IAddProductLocalData
  >({
    mutationFn: (data) => addProductToCart(data),
    onSuccess,
    onError,
  });
};

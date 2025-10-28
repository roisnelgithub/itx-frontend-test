import type { IActionFormValues } from "@/features/products/forms/product-details-actions.form";
import type { IAddProductToCartRequest } from "../services/cart.service";

export const mapFormToAddProductRequest = (
  productId: string,
  formData: IActionFormValues
): IAddProductToCartRequest => {
  return {
    id: productId,
    colorCode: formData.color,
    storageCode: formData.storage,
  };
};
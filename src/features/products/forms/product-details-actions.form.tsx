import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HardDrive, Loader2, Palette, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { actionFormSchema } from "./product.schema";
import { useAddProductToCart } from "@/features/cart/hooks/mutation/use-add-product-to-cart";
import { type IProductResume } from "@/features/products/mappers/product.mapper";
import { useCartStore } from "@/store/cart.store";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { ISelectOption } from "@/shared/select/dynamic-select";
import DynamicSelectField from "@/shared/fields/dynamic-select.field";
import { mapFormToAddProductRequest } from "@/features/cart/mappers/cart.mapper";


export type IActionFormValues = z.infer<typeof actionFormSchema>;

interface IProductDetailsFormProps {
  product: IProductResume;
  colorOptions: ISelectOption[];
  storageOptions: ISelectOption[];
}

const ProductDetailsForm = ({ product, colorOptions, storageOptions }: IProductDetailsFormProps) => {
  const {
    handleSubmit,
    control,
  } = useForm<IActionFormValues>({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      color: "",
      storage: "",
    },
  });

  const { addItem } = useCartStore();

  const { mutate, isPending } = useAddProductToCart({
    onSuccess: (_, { product, formData }) => {
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
    onError: () => {
      showErrorToast("Failed to add product to cart");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const payload = mapFormToAddProductRequest(product.id, data);
    const colorLabel = colorOptions.find(c => c.value === data.color)?.label || data.color;
    const storageLabel = storageOptions.find(s => s.value === data.storage)?.label || data.storage;

    mutate({
      ...payload,
      product,
      formData: {
        color: colorLabel,
        storage: storageLabel,
      },
    });
  });


  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-6">
      <div className="flex w-full flex-row gap-4 justify-between">
        <div className="flex-1">
          <DynamicSelectField
            name="color"
            control={control}
            options={colorOptions}
            label={<div className="flex items-center gap-1"><Palette className="h4 w-4" />Color</div>}
          />
        </div>
        <div className="flex-1">
          <DynamicSelectField
            name="storage"
            control={control}
            options={storageOptions}
            label={<div className="flex items-center gap-1"><HardDrive className="h4 w-4" />Storage</div>}
          />
        </div>
      </div>

      <Button type="submit" className="w-full max-w-44 mt-2" disabled={isPending || product.price === 0}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            <span>
              Adding...
            </span>
          </>) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>
              Add to cart
            </span>
          </>
        )}
      </Button>
      {product.price === 0 && (
        <div className="text-xs text-red-500">
          You can’t add this product to the cart because the price is not available.
        </div>
      )}
    </form>
  );
};

export default ProductDetailsForm;

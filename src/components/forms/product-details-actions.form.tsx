import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";

import { actionFormSchema } from "./product.schema";
import DynamicSelectField from "../shared/fields/dynamic-select.field";
import type { SelectOption } from "../shared/select/dynamic-select";
import { useAddProductToCart } from "@/hooks/mutation/use-add-product-to-cart";
import { mapFormToAddProductRequest, type ProductResume } from "@/mapper/product.mapper";


export type IActionFormValues = z.infer<typeof actionFormSchema>;

interface IProductDetailsFormProps {
  product: ProductResume;
  colorOptions: SelectOption[];
  storageOptions: SelectOption[];
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

  const { mutate, isPending } = useAddProductToCart();

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
            label="Color"
          />
        </div>
        <div className="flex-1">
          <DynamicSelectField
            name="storage"
            control={control}
            options={storageOptions}
            label="Storage"
          />
        </div>
      </div>

      <Button type="submit" className="w-full max-w-44 mt-2" disabled={isPending}>
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
    </form>
  );
};

export default ProductDetailsForm;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import type z from "zod";

import { actionFormSchema } from "./product.schema";
import DynamicSelectField from "../shared/fields/dynamic-select.field";
import type { SelectOption } from "../shared/select/dynamic-select";


type IActionFormValues = z.infer<typeof actionFormSchema>;

interface IProductDetailsFormProps {
  productId: string;
  colorOptions: SelectOption[];
  storageOptions: SelectOption[];
}

const ProductDetailsForm = ({ productId, colorOptions, storageOptions }: IProductDetailsFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IActionFormValues>({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      productId,
      color: "",
      storage: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("Data:", data);
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

      <Button type="submit" className="w-full max-w-44 mt-2" disabled={isSubmitting}>
        <ShoppingCart className="w-4 h-4" />
        {isSubmitting ? "Adding..." : "Add to cart"}
      </Button>
    </form>
  );
};

export default ProductDetailsForm;

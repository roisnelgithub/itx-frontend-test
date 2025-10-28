import { Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  mapColorOptionsToSelect,
  mapStorageOptionsToSelect,
  type IProductResume
} from "@/features/products/mappers/product.mapper";
import ProductDetailsImage from "./product-details-image"
import ProductDetailsInfo from "./product-details-info"
import ProductDetailsForm from "../../forms/product-details-actions.form";

interface IProductDetailsWrapperProps {
  product: IProductResume;
}
const ProductDetailsWrapper = ({ product }: IProductDetailsWrapperProps) => {
  const { options: { colors, storages } } = product;

  const colorSelectOptions = mapColorOptionsToSelect(colors);
  const storageSelectOptions = mapStorageOptionsToSelect(storages);

  return (
    <main className="flex justify-center py-12 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        <div className="shrink-0 max-w-2xs min-w-2xs justify-center">
          <ProductDetailsImage alt={product.model} imageURL={product.imageURL} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <ProductDetailsInfo product={product} />
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Settings2 />
                ACTIONS
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <ProductDetailsForm
                product={product}
                colorOptions={colorSelectOptions}
                storageOptions={storageSelectOptions}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsWrapper

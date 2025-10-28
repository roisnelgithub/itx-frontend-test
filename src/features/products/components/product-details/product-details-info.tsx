import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { mapProductToAttributes, type IProductResume } from "@/features/products/mappers/product.mapper";

interface IProductDetailsInfoProps {
  product: IProductResume;
}

const ProductDetailsInfo = ({ product }: IProductDetailsInfoProps) => {
  const attributes = mapProductToAttributes(product);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Icons.FileText />
          DESCRIPTION
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="grid pt-4 grid-cols-1 sm:grid-cols-2 gap-4">
          {attributes.map((attr) => {
            const IconComponent = attr.icon ? (Icons as any)[attr.icon] : null;
            return (
              <div key={attr.label} className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    {IconComponent && <IconComponent className="h-5 w-5 text-gray-400" />}

                    <span className="text-gray-500 text-sm font-medium">{attr.label}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{attr.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsInfo;

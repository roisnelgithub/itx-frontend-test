import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mapProductToAttributes, type ProductResume } from "@/mapper/product.mapper";

interface ProductDetailsInfoProps {
  product: ProductResume;
}

const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  const attributes = mapProductToAttributes(product);

  return (
    <Card>
      <CardHeader>
        <CardTitle>DESCRIPTION</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="grid pt-4 grid-cols-1 sm:grid-cols-2 gap-4">
          {attributes.map((attr) => {
            return (
              <div key={attr.label} className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium">{attr.label}</span>
                <span className="text-gray-900 font-semibold">{attr.value}</span>
              </div>
            )
          }
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsInfo;

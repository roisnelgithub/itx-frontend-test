import { parseCurrencyValue } from "@/utils/format-price";
import { capitalize } from "@/utils/capitalize";
import type { AddProductToCartRequest, ApiProductOptions, ProductApiResponse, ProductDetailsApiResponse } from "@/services/product.service";
import type { SelectOption } from "@/components/shared/select/dynamic-select";
import type { IActionFormValues } from "@/components/forms/product-details-actions.form";

export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number;
  imageURL: string;
}

export const mapProduct = (apiProduct: ProductApiResponse): Product => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: parseCurrencyValue(apiProduct.price),
  imageURL: apiProduct.imgUrl,
});

export const mapProducts = (apiProducts: ProductApiResponse[]): Product[] =>
  apiProducts.map(mapProduct);


export interface ProductResume {
  id: string;
  brand: string;
  model: string;
  price: number;
  imageURL: string;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCamera: string[];
  dimensions: string;
  weight: string;
  options: Options
}
export interface ColorOption {
  code: number;
  name: string;
}
export interface StorageOption {
  code: number;
  name: string;
}
export interface Options {
  colors: ColorOption[];
  storages: StorageOption[];
}
export const mapProductOptions = (options?: ApiProductOptions): Options => ({
  colors: options?.colors?.map((c) => ({
    code: c.code,
    name: c.name,
  })) || [],
  storages: options?.storages?.map((s) => ({
    code: s.code,
    name: s.name,
  })) || [],
});

export const mapProductDetailsToResume = (
  apiProduct: ProductDetailsApiResponse
): ProductResume => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: parseCurrencyValue(apiProduct.price),
  imageURL: apiProduct.imgUrl,
  cpu: apiProduct.cpu,
  ram: apiProduct.ram,
  os: apiProduct.os,
  displayResolution: apiProduct.displayResolution,
  battery: apiProduct.battery,
  primaryCamera: apiProduct.primaryCamera,
  secondaryCamera: apiProduct.secondaryCmera,
  dimensions: apiProduct.dimentions,
  weight: apiProduct.weight,
  options: mapProductOptions(apiProduct.options),
});


export interface Attribute {
  label: string;
  value: string;
  icon?: string;
}

export const mapProductToAttributes = (product: ProductResume): Attribute[] => {
  const cameras = [...(product.primaryCamera || []), ...(product.secondaryCamera || [])].join(" / ");

  const attributeKeys: { key: keyof ProductResume; label: string; formatter?: (val: any) => string; icon?: string }[] = [
    { key: "brand", label: "Brand", icon: "Tag" },
    { key: "model", label: "Model", icon: "Smartphone" },
    { key: "price", label: "Price", formatter: (v) => `${v} €`, icon: "DollarSign" },
    { key: "cpu", label: "CPU", icon: "Cpu" },
    { key: "ram", label: "RAM", icon: "Microchip" },
    { key: "os", label: "Operative system", icon: "Monitor" },
    { key: "displayResolution", label: "Display resolution", icon: "Proportions" },
    { key: "battery", label: "Battery", icon: "BatteryFull" },
    { key: "dimensions", label: "Dimensions", icon: "Ruler" },
    { key: "weight", label: "Weight", formatter: (v) => `${v} g`, icon: "Scale" },
  ];

  const attributes = attributeKeys
    .map(({ key, label, formatter, icon }) => {
      const value = product[key];
      if (!value) return null;
      return { label, value: formatter ? formatter(value) : value, icon };
    })
    .filter(Boolean) as Attribute[];

  if (cameras) attributes.push({ label: "Camera", value: cameras, icon: "Camera" });

  return attributes;
};


export const mapColorOptionsToSelect = (options: ColorOption[]): SelectOption[] => {
  return options.map((opt) => ({
    label: capitalize(opt.name),
    value: opt.code.toString(),
  }));
};

export const mapStorageOptionsToSelect = (options: StorageOption[]): SelectOption[] => {
  return options.map((opt) => ({
    label: capitalize(opt.name),
    value: opt.code.toString(),
  }));
};


export const mapFormToAddProductRequest = (
  productId: string,
  formData: IActionFormValues
): AddProductToCartRequest => {
  return {
    id: productId,
    colorCode: formData.color,
    storageCode: formData.storage,
  };
};
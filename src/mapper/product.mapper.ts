import { parseCurrencyValue } from "@/utils/format-price";
import { capitalize } from "@/utils/capitalize";
import type { ApiProductOptions, ProductApiResponse, ProductDetailsApiResponse } from "@/services/product.service";
import type { SelectOption } from "@/components/shared/select/dynamic-select";

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
}

export const mapProductToAttributes = (product: ProductResume): Attribute[] => {
  const cameras = [...(product.primaryCamera || []), ...(product.secondaryCamera || [])].join(" / ");

  const attributeKeys: { key: keyof ProductResume; label: string; formatter?: (val: any) => string }[] = [
    { key: "brand", label: "Brand" },
    { key: "model", label: "Model" },
    { key: "price", label: "Price", formatter: (v) => `${v} €` },
    { key: "cpu", label: "CPU" },
    { key: "ram", label: "RAM" },
    { key: "os", label: "Operative system" },
    { key: "displayResolution", label: "Display resolution" },
    { key: "battery", label: "Battery" },
    { key: "dimensions", label: "Dimensions" },
    { key: "weight", label: "Weight", formatter: (v) => `${v} g` },
  ];

  const attributes = attributeKeys
    .map(({ key, label, formatter }) => {
      const value = product[key];
      if (!value) return null;
      return { label, value: formatter ? formatter(value) : value };
    })
    .filter(Boolean) as Attribute[];

  if (cameras) attributes.push({ label: "Camera", value: cameras });

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

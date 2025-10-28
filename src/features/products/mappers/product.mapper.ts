import { parseCurrencyValue } from "@/utils/format-price";
import { capitalize } from "@/utils/capitalize";
import type {
  IApiProductOptions,
  IProductApiResponse,
  IProductDetailsApiResponse
} from "@/features/products/services/product.service";
import type { ISelectOption } from "@/shared/select/dynamic-select";

export interface IProduct {
  id: string;
  brand: string;
  model: string;
  price: number;
  imageURL: string;
}

export const mapProduct = (apiProduct: IProductApiResponse): IProduct => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: parseCurrencyValue(apiProduct.price),
  imageURL: apiProduct.imgUrl,
});

export const mapProducts = (apiProducts: IProductApiResponse[]): IProduct[] =>
  apiProducts.map(mapProduct);


export interface IProductResume {
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
  options: IOptions
}
export interface IColorOption {
  code: number;
  name: string;
}
export interface IStorageOption {
  code: number;
  name: string;
}
export interface IOptions {
  colors: IColorOption[];
  storages: IStorageOption[];
}
export const mapProductOptions = (options?: IApiProductOptions): IOptions => ({
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
  apiProduct: IProductDetailsApiResponse
): IProductResume => ({
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


export interface IAttribute {
  label: string;
  value: string;
  icon?: string;
}

export const mapProductToAttributes = (product: IProductResume): IAttribute[] => {
  const cameras = [...(product.primaryCamera || []), ...(product.secondaryCamera || [])].join(" / ");

  const attributeKeys: { key: keyof IProductResume; label: string; formatter?: (val: any) => string; icon?: string }[] = [
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
    .filter(Boolean) as IAttribute[];

  if (cameras) attributes.push({ label: "Camera", value: cameras, icon: "Camera" });

  return attributes;
};


export const mapColorOptionsToSelect = (options: IColorOption[]): ISelectOption[] => {
  return options.map((opt) => ({
    label: capitalize(opt.name),
    value: opt.code.toString(),
  }));
};

export const mapStorageOptionsToSelect = (options: IStorageOption[]): ISelectOption[] => {
  return options.map((opt) => ({
    label: capitalize(opt.name),
    value: opt.code.toString(),
  }));
};


import { api } from "@/lib/axios";

export interface ProductApiResponse {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
}

export const getProducts = async (): Promise<ProductApiResponse[]> => {
  const { data } = await api.get("/api/product");
  return data;
};


export interface ProductDetailsApiResponse {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  networkTechnology: string;
  networkSpeed: string;
  gprs: string;
  edge: string;
  announced: string;
  status: string;
  dimentions: string;
  weight: string;
  sim: string;
  displayType: string;
  displayResolution: string;
  displaySize: string;
  os: string;
  cpu: string;
  chipset: string;
  gpu: string;
  externalMemory: string;
  internalMemory: string[];
  ram: string;
  primaryCamera: string[];
  secondaryCmera: string[];
  speaker: string;
  audioJack: string;
  wlan: string[];
  bluetooth: string[];
  gps: string;
  nfc: string;
  radio: string;
  usb: string;
  sensors: string[];
  battery: string;
  colors: string[];
  options: ApiProductOptions;
}
export interface ApiColorOption {
  code: number;
  name: string;
}
export interface ApiStorageOption {
  code: number;
  name: string;
}
export interface ApiProductOptions {
  colors: ApiColorOption[];
  storages: ApiStorageOption[];
}
export const getProductById = async (id: string): Promise<ProductDetailsApiResponse> => {
  const { data } = await api.get(`/api/product/${id}`);
  return data;
};

export interface AddProductToCartResponse {
  count: number;
}
export interface AddProductToCartRequest {
  id: string;
  colorCode: string;
  storageCode: string;
}

export const addProductToCart = async (data: AddProductToCartRequest): Promise<AddProductToCartResponse> => {
  const response = await api.post(`/api/cart`, { ...data });
  return response.data;
};
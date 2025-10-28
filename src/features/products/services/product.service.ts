import { api } from "@/lib/axios";

export interface IProductApiResponse {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
}

export const getProducts = async (): Promise<IProductApiResponse[]> => {
  const { data } = await api.get("/api/product");
  return data;
};


export interface IProductDetailsApiResponse {
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
  options: IApiProductOptions;
}
export interface IApiColorOption {
  code: number;
  name: string;
}
export interface IApiStorageOption {
  code: number;
  name: string;
}
export interface IApiProductOptions {
  colors: IApiColorOption[];
  storages: IApiStorageOption[];
}
export const getProductById = async (id: string): Promise<IProductDetailsApiResponse> => {
  const { data } = await api.get(`/api/product/${id}`);
  return data;
};

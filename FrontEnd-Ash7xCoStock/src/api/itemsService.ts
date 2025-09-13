import axios from "./axiosInstance";
import type { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("/products/");
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`/products/${id}/`);
  return data;
};

export const createProduct = async (payload: Partial<Product>) => {
  const { data } = await axios.post("/products/", payload);
  return data;
};

import { useQuery } from "@tanstack/react-query";
import { GetCategory, GetProducts } from "../endpoints";

export interface Root1 {
  id: number;
  img: string;
  title: string;
}

export interface Root2 {
  id: number;
  category: string;
  img: string;
  name: string;
  price: number;
}

export const useGetCategory = () => {
  return useQuery<Root1[]>({
    queryKey: ["GetCategory"],
    queryFn: GetCategory,
  });
};

export const useGetProduct = () => {
  return useQuery<Root2[]>({
    queryKey: ["GetProducts"],
    queryFn: GetProducts,
  });
};

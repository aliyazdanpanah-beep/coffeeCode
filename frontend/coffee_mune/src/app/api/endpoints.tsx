import axios from "axios";

export async function GetCategory() {
  const data = await axios("http://127.0.0.1:8000/categorys");

  return data
}

export async function GetProducts() {
  const data = await axios("http://127.0.0.1:8000/product");

  return data
}
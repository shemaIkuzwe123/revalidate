"use server";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Product, User } from "../types";
import { revalidatePath, revalidateTag } from "next/cache";
export async function getUsers(): Promise<User[]> {
  "use cache";
  cacheTag("users");
  const res = await fetch(
    "https://674d82ee635bad45618ba52d.mockapi.io/api/users"
  );
  const users = await res.json();
  return users as User[];
}

export async function getProducts() {
  "use cache";
  cacheTag("products");
  const res = await fetch(
    "https://674d82ee635bad45618ba52d.mockapi.io/api/products"
  );

  const prods = (await res.json()) as Product[];
  return prods;
}

export async function RevalidateAll() {
  revalidatePath("/", "layout");
}

export async function revalidateUsers() {
  revalidateTag("users");
}
export async function revalidateProducts() {
  revalidateTag("products");
}

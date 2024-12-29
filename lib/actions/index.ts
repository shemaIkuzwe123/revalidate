"use server";

import { db } from "../db";
import { productsTable } from "../db/schema";
import {  User } from "../types";
import {
  revalidatePath,
  revalidateTag,
  unstable_cacheTag as cacheTag,
} from "next/cache";
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
  const prods=await db.select().from(productsTable); 
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

export async function addProduct(formData: FormData) {
  const prodName = formData.get("name") as string;
  const price = formData.get("price") as string;
  await db.insert(productsTable).values({
    productName: prodName,
    price: parseInt(price),
  });

  revalidateTag("products");
}

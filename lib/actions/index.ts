"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { productsTable, User, usersTable } from "../db/schema";
import {
  revalidateTag,
  unstable_cacheTag as cacheTag,
} from "next/cache";
export async function getUsers(): Promise<User[]> {
  "use cache";
  cacheTag("users");
  const users = await db.select().from(usersTable);
  return users;
}

export async function getProducts() {
  "use cache";
  cacheTag("products");
  const prods = await db.select().from(productsTable);
  return prods;
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

export async function createUser(user: User) {
  await db.insert(usersTable).values({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    imageUrl: user.imageUrl,
    email: user.email,
  });
  revalidateTag("users");
}

export async function updateUser(user: User) {
  await db
    .update(usersTable)
    .set({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      imageUrl: user.imageUrl,
    })
    .where(eq(usersTable.id, user.id));
  revalidateTag("users");
}

export async function deleteUser(id: string) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
  revalidateTag("users");
}

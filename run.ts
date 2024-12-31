import { db } from "./lib/db";
import { productsTable, usersTable } from "./lib/db/schema";

export async function addUser() {
  const products = await db.select().from(productsTable);
  const users = await db.select().from(usersTable);

  console.log(products);
  console.log(users); 
}
addUser();

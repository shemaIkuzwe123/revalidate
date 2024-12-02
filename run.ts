import { db } from "./lib/db";
import { usersTable } from "./lib/db/schema";

export async function addUser() {
  const newUser = await db
    .insert(usersTable)
    .values({ email: "eshemaikuzwe@gmail.com", name: "ikuzwe shema elie" })
    .returning();
  console.log(newUser);
}

export async function selectUser(){
const users=await db.select().from(usersTable);
console.log(users);

}
selectUser()

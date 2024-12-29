import { uuid, pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").defaultNow();
const updatedAt = timestamp("updatedAt")
  .defaultNow()
  .$onUpdate(() => new Date());
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt,
  updatedAt,
});

export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  productName:varchar("productName",{length:100}).notNull(),
  price:integer().notNull(),
  createdAt,
  updatedAt,
});

export const User = typeof usersTable.$inferInsert;
export const Product =typeof productsTable.$inferInsert;


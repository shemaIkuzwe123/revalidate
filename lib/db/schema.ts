import { uuid, pgTable, varchar, timestamp, integer} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").defaultNow();
const updatedAt = timestamp("updatedAt")
  .defaultNow()
  .$onUpdate(() => new Date());
export const usersTable = pgTable("users", {
  id: varchar("id").primaryKey(),
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name:varchar("last_name",{length:100}),
  email: varchar("email", { length: 100 }).notNull().unique(),
  imageUrl:varchar("imageUrl"),
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

export type User = typeof usersTable.$inferInsert;
export type Product =typeof productsTable.$inferInsert;


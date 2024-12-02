import { uuid, pgTable, varchar, timestamp, json } from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").defaultNow();
const updatedAt = timestamp("updatedAt")
  .defaultNow()
  .$onUpdate(() => new Date());
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt,
  updatedAt,
});

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid().references(() => usersTable.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  order: json("orders"),
  createdAt,
  updatedAt,
});

export const User = typeof usersTable.$inferInsert;
export const Orders = typeof ordersTable.$inferInsert;

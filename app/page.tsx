import { Users } from "../components/users";
import { Orders } from "../components/orders";
import { Button } from "@/components/ui/button";
import { addProduct, RevalidateAll } from "@/lib/actions";
import {  UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import TableSkeleton from "@/components/skelton/table";

export default function Dashboard() {
  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <form action={RevalidateAll}>
        <Button type="submit" size="lg">
          Revalidate All
        </Button>
      </form>
      <div className=" flex  gap-2 justify-center items-center w-full">
        <form className=" flex flex-col gap-2" action={addProduct}>
          <h2>Add Product</h2>
          <Input name="name" type="text" placeholder="Enter ProductName" />
          <Input name="price" type="number" placeholder="Enter ProductPrice" />
          <Button type="submit">Add</Button>
        </form>
      </div>

      <div>
        <UserButton />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<TableSkeleton/>}>
          <Users />
        </Suspense>
        <Suspense fallback={<TableSkeleton/>}>
          <Orders />
        </Suspense>
      </div>
    </div>
  );
}

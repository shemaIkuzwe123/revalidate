import { Orders } from "../components/orders";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import TableSkeleton from "@/components/skelton/table";

export default function Dashboard() {
  return (
    <div className="flex justify-between gap-5">
      <Suspense fallback={<TableSkeleton />}>
        <Orders />
      </Suspense>
      <form className=" flex flex-col gap-2 w-96 mt-10" action={addProduct}>
        <h2 className="text-xl">Add Product</h2>
        <Input name="name" type="text" placeholder="Enter ProductName" />
        <Input name="price" type="number" placeholder="Enter ProductPrice" />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

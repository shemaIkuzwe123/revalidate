import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts, revalidateProducts } from "@/lib/actions";

export async function Orders() {
  const products = await getProducts();
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <form action={revalidateProducts}>
          <Button type="submit">Revalidate Products</Button>
        </form>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>{prod.id}</TableCell>
              <TableCell>{prod.name}</TableCell>
              <TableCell>${prod.price}</TableCell>
              <TableCell>{new Date(prod.createdAt).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

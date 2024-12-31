import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts } from "@/lib/actions";

export async function Orders() {
  const products = await getProducts();
  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
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
              <TableCell>{prod.id.slice(0,3)}...{prod.id.slice(-3)}</TableCell>
              <TableCell>{prod.productName}</TableCell>
              <TableCell>${prod.price}</TableCell>
              <TableCell>{prod.createdAt ? new Date(prod.createdAt).toLocaleDateString() :""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

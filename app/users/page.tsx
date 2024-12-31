import TableSkeleton from "@/components/skelton/table";
import { Suspense } from "react";

export default function Users() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Users />
    </Suspense>
  );
}

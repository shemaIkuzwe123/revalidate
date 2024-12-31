import TableSkeleton from "@/components/skelton/table";
import { Users } from "@/components/users";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <Users />
      </Suspense>
    </div>
  );
}

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
export default function Navbar() {
  return (
    <div className=" flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold mb-4">Ppr</h1>
      </Link>
      <Link href={"/"}>Products</Link>
      <Link href={"/users"}>Users</Link>
      <Suspense fallback={<span>Loading</span>}>
        <UserButton />
      </Suspense>
    </div>
  );
}

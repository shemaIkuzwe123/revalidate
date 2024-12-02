import { Users } from "../components/users"
import { Orders } from "../components/orders"
import { Button } from "@/components/ui/button"
import { RevalidateAll } from "@/lib/actions"
import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <form className="mb-8" action={RevalidateAll}>
        <Button type="submit" size="lg">Revalidate All</Button>
      </form>
      <div>
        <UserButton/>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Users />
        <Orders />
      </div>
    </div>
  )
}


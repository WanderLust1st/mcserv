import auth from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminGuard from "@/components/AdminGuard"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth(authOptions)

  return (
    <AdminGuard session={session}>
      {children}
    </AdminGuard>
  )
}

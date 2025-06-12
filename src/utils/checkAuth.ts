import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"

export async function checkAuthRole(expectedRole: "admin" | "owner" | "tenant") {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user.id
  const { data: user, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single()

  if (error || !user || user.role !== expectedRole) {
    redirect("/unauthorized")
  }

  return user
}

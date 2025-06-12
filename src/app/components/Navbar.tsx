'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="w-full px-6 py-4 shadow flex items-center justify-between bg-background text-foreground">
      {/* Logo / Titre */}
      <Link href="/" className="text-xl font-bold tracking-tight text-primary">
        Luwé Admin
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </header>
  )
}

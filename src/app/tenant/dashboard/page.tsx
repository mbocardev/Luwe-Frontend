'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

export default function TenantDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/login')
      }
    }
    checkAuth()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord Locataire</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          Bienvenue sur votre espace locataire. Consultez vos locations, paiements et messages ici.
        </CardContent>
      </Card>
    </div>
  )
}

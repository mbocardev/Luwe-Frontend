'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TenantDashboardPage() {
  const [rental, setRental] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
    }
  }
  checkAuth()
  }, [])

  useEffect(() => {
    const fetchRental = async () => {
      const { data: user } = await supabase.auth.getUser()
      const userId = user.user?.id

      const { data } = await supabase
        .from("rentals")
        .select("*, property:properties(*)")
        .eq("tenant_id", userId)
        .eq("status", "active")
        .single()

      setRental(data)
    }
    fetchRental()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Tableau de bord Locataire</h1>

      <Card>
        <CardContent className="p-4 space-y-2">
          {rental ? (
            <>
              <h2 className="text-xl font-semibold text-foreground">Votre logement</h2>
              <p className="text-muted">
                {rental.property.title} - {rental.property.location}
              </p>
              <p className="text-muted">
                Loyer : {rental.property.price} €/mois
              </p>
              <Button className="mt-2" onClick={() => router.push("/tenant/payments")}>
                Voir les paiements
              </Button>
            </>
          ) : (
            <p className="text-muted">Aucune location active.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OwnerDashboardPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [issues, setIssues] = useState<any[]>([])
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
    const fetchData = async () => {
      const { data: user } = await supabase.auth.getUser()
      const userId = user.user?.id

      const { data: props } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", userId)

      const { data: issueData } = await supabase
        .from("issues")
        .select("*")
        .in("property_id", props?.map(p => p.id) || [])

      setProperties(props || [])
      setIssues(issueData || [])
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Tableau de bord Propriétaire</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-foreground">Mes propriétés</h2>
            <p className="text-3xl mt-2 text-primary">{properties.length}</p>
            <Button className="mt-4" onClick={() => router.push("/owner/properties")}>
              Voir les propriétés
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-foreground">Incidents en cours</h2>
            <p className="text-3xl mt-2 text-primary">{issues.length}</p>
            <Button className="mt-4" onClick={() => router.push("/owner/issues")}>
              Gérer les incidents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const router = useRouter();

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
      const { data: usersData } = await supabase.from("users").select("*");
      const { data: propertiesData } = await supabase.from("properties").select("*");
      setUsers(usersData || []);
      setProperties(propertiesData || []);
    };
    fetchData();
  }, []);

  return (
  <main className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
      <Button variant="destructive" onClick={async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
      }}>
        Se déconnecter
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ... (le reste inchangé) */}
    </div>

    <section>
      <h2 className="text-2xl font-semibold mb-4">Activité récente</h2>
      <ul className="space-y-2">
        {users.slice(0, 5).map((user) => (
          <li key={user.id} className="bg-white text-black p-3 rounded-xl shadow">
            {user.email} inscrit le {new Date(user.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  </main>
  );
}

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
      <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">Utilisateurs</h2>
            <p className="text-3xl mt-2">{users.length}</p>
            <Button className="mt-4" onClick={() => router.push("/admin/users")}>Voir les utilisateurs</Button>
          </CardContent>
        </Card>

        <Card> 
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">Propriétés</h2>
            <p className="text-3xl mt-2">{properties.length}</p>
            <Button className="mt-4" onClick={() => router.push("/admin/properties")}>Voir les propriétés</Button>
          </CardContent>
        </Card>
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

import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <Card>
        <CardContent>
          Bienvenue sur votre espace administrateur. Gérez les utilisateurs, propriétés et incidents ici.
        </CardContent>
      </Card>
    </div>
  );
}

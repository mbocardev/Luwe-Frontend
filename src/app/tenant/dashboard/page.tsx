import { Card, CardContent } from "@/components/ui/card";

export default function TenantDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Locataire</h1>
      <Card>
        <CardContent>
          Bienvenue sur votre espace locataire. Consultez vos locations, paiements et messages ici.
        </CardContent>
      </Card>
    </div>
  );
}
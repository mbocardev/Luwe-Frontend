import { Card, CardContent } from "@/components/ui/card";

export default function OwnerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Propriétaire</h1>
      <Card>
        <CardContent>
          Bienvenue sur votre espace propriétaire. Consultez vos biens, locataires et incidents ici.
        </CardContent>
      </Card>
    </div>
  );
}

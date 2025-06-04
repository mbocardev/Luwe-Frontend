import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur Luwé</h1>
      <Card>
        <CardContent>
          Parcourez les annonces de location, connectez-vous ou inscrivez-vous pour gérer vos biens et locations.
        </CardContent>
      </Card>
    </div>
  );
}

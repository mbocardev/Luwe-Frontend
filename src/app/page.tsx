import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur Luwé</h1>
      <Card className="mb-4">
        <CardContent className="pt-6">
          Parcourez les annonces de location, connectez-vous ou inscrivez-vous pour gérer vos biens et locations.
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/auth/login">Se connecter</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/signup">Créer un compte</Link>
        </Button>
      </div>
    </div>
  );
}
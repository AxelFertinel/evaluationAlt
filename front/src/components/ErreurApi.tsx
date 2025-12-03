import { TriangleAlert } from "lucide-react";

export const ErreurApi = () => {
  return (
    <div className="bg-red-300 inline-block p-4 rounded-lg">
      <div className="flex gap-2 ">
        <TriangleAlert />
        <p>Une erreur est survenue pendant le chargement des données</p>
      </div>
    </div>
  );
};

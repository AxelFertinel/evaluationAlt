import type { Tool } from "@/interfaces/tools";
import { Badge } from "./ui/badge";

interface ToolCardProps {
  tools: Tool[] | null;
}

const ToolCard = ({ tools }: ToolCardProps) => {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-400">📦 Aucun outil disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool: Tool) => (
        <div
          key={tool.id}
          className="group relative bg-white rounded-xl shadow-sm borde hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          {/* Header avec icône */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">
                  {tool.name?.charAt(0) || "?"}
                </span>
              </div>

              {/* Badge statut */}
              <Badge status={tool.status} />
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-900  ">
              {tool.name}
            </h3>

            {/* description */}
            {tool.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {tool.description}
              </p>
            )}

            {/* Infos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Département</span>
                <span className="font-medium text-gray-900">
                  {tool.owner_department}
                </span>
              </div>
            </div>
            {/* User count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>User</span>
                <span className="font-medium text-gray-900">
                  {tool.active_users_count}
                </span>
              </div>
            </div>
            {/* Infos */}
            {tool.icon_url && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Website</span>
                  <span className="font-medium text-gray-900">
                    <a
                      className="hover:cursor-pointer hover:text-blue-700 "
                      href={tool.website_url}
                      target="_blank"
                    >
                      Voir le site
                    </a>
                  </span>
                </div>
              </div>
            )}

            {/* Monthly cost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Monthly cost</span>
                <span className="font-medium text-gray-900">
                  €{tool.monthly_cost}
                </span>
              </div>
            </div>
          </div>

          {/* Footer avec action */}
          <div className="px-6 pb-6">
            <button className="w-full py-2 bg-gray-50 hover:bg-blue-50 hover:cursor-pointer text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors">
              Voir les détails
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolCard;

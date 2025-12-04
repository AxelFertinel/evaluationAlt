import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTools } from "@/hooks/useTools";
import { ErreurApi } from "@/components/ErreurApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { tools, error, loading } = useTools();

  if (loading) {
    return <div className="container p-8">Chargement...</div>;
  }

  if (error) {
    return <ErreurApi message={error.message} />;
  }

  // Calculer le coût par département
  const departments: { [key: string]: number } = {};

  tools.forEach((tool) => {
    const dept = tool.owner_department || "Non assigné";
    const cost = Number(tool.monthly_cost) || 0;

    if (departments[dept]) {
      departments[dept] += cost;
    } else {
      departments[dept] = cost;
    }
  });

  // Préparer les données pour le graphique
  const chartData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Coût mensuel (€)",
        data: Object.values(departments),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  // Options du graphique
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Coûts mensuels par département",
      },
    },
  };

  return (
    <div className="container">
      <div className="mb-5 mt-5">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Statistiques de vos outils</p>
      </div>

      {/* Graphique */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <Bar options={chartOptions} data={chartData} />
      </div>

      {/* Stats simples */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-600 text-sm">Total d'outils</p>
          <p className="text-3xl font-bold text-blue-600">{tools.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-600 text-sm">Coût mensuel total</p>
          <p className="text-3xl font-bold text-green-600">
            {tools
              .reduce((sum, t) => sum + (Number(t.monthly_cost) || 0), 0)
              .toFixed(2)}
            €
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-600 text-sm">Outils actifs</p>
          <p className="text-3xl font-bold text-purple-600">
            {tools.filter((t) => t.status === "active").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

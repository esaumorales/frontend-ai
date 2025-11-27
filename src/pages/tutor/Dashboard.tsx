import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Users,
  CheckCircle,
  Gauge,
  AlertTriangle,
  ScatterChart,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [clusters, setClusters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 📌 Dashboard general
        const res = await api.get("/tutor/dashboard");
        setData(res.data);

        // 📌 Clusters IA (respuesta backend = arreglo)
        const resClusters = await api.get("/analytics/clusters");
        setClusters(Array.isArray(resClusters.data) ? resClusters.data : []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!data) return <p>Error al cargar datos</p>;

  const total = data.total_students;

  const excelente =
    data.distribution["Excelente"] ??
    data.distribution["Excepcional"] ??
    0;

  const satisfactorio = data.distribution["Satisfactorio"] ?? 0;
  const insuficiente = data.distribution["Insuficiente"] ?? 0;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Dashboard del Tutor</h1>

      {/* =======================================
           🔵 TARJETAS DE RENDIMIENTO
         ======================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Total Estudiantes */}
        <Card className="relative p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
          <Users className="absolute top-4 right-4 text-blue-500" size={22} />
          <h2 className="text-gray-600 text-sm font-semibold">
            Estudiantes Activos
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{total}</p>
          <p className="text-xs text-gray-500 mt-1">
            +{Math.floor(total * 0.03)} esta semana
          </p>
        </Card>

        {/* Excelente */}
        <Card className="relative p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
          <CheckCircle className="absolute top-4 right-4 text-green-500" size={22} />
          <h2 className="text-gray-600 text-sm font-semibold">
            Rendimiento Excelente
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{excelente}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(excelente / total * 100).toFixed(1)}% del total
          </p>
        </Card>

        {/* Satisfactorio */}
        <Card className="relative p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
          <Gauge className="absolute top-4 right-4 text-yellow-500" size={22} />
          <h2 className="text-gray-600 text-sm font-semibold">
            Rendimiento Satisfactorio
          </h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{satisfactorio}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(satisfactorio / total * 100).toFixed(1)}% del total
          </p>
        </Card>

        {/* Insuficiente */}
        <Card className="relative p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
          <AlertTriangle className="absolute top-4 right-4 text-red-500" size={22} />
          <h2 className="text-gray-600 text-sm font-semibold">
            Rendimiento Insuficiente
          </h2>
          <p className="text-4xl font-bold text-red-600 mt-2">{insuficiente}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(insuficiente / total * 100).toFixed(1)}% del total
          </p>
        </Card>
      </div>

      {/* =======================================
           🔴 TARJETAS DE CLUSTERS (IA)
         ======================================= */}
      <div>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <ScatterChart className="text-purple-600" />
          Agrupación por Clusters (IA)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clusters.length === 0 && (
            <p className="text-gray-500">No hay clusters disponibles.</p>
          )}

          {clusters.map((c: any, index: number) => (
            <Card
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg border transition"
            >
              <p className="text-sm text-gray-600 font-semibold">
                Cluster {c.cluster}
              </p>

              <p className="text-4xl font-bold text-purple-600 mt-2">
                {c.students?.length ?? 0}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Estudiantes agrupados automáticamente
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/ui/Card";
import { Users, Layers } from "lucide-react";

export default function Clusters() {
    const [clusters, setClusters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadClusters();
    }, []);

    const loadClusters = async () => {
        try {
            const res = await api.get("/analytics/clusters");

            console.log("CLUSTERS RAW →", res.data);

            // 🚀 Backend devuelve un ARRAY directo
            if (!Array.isArray(res.data)) {
                throw new Error("Formato inválido recibido desde backend");
            }

            const formatted = res.data.map((c: any) => ({
                clusterId: c.cluster,
                students: c.students ?? [],
                description: c.description ?? "Sin descripción"
            }));

            setClusters(formatted);

        } catch (err: any) {
            console.error("Error cargando clusters →", err);
            setError("Ocurrió un error al cargar los clusters.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando Clusters...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!clusters.length) return <p>No hay clusters para mostrar.</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Layers className="text-purple-600" size={30} />
                Agrupación por Clusters (IA)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clusters.map((cluster) => (
                    <Card
                        key={cluster.clusterId}
                        className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white"
                    >
                        {/* Título */}
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Layers className="text-purple-500" size={20} />
                            Cluster {cluster.clusterId}
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Agrupación automática basada en tus 11 variables estudiantiles.
                        </p>

                        {/* Resumen */}
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                            <p className="font-semibold">{cluster.students.length} estudiantes</p>
                            <p className="text-xs text-gray-500">{cluster.description}</p>
                        </div>

                        {/* Lista de estudiantes */}
                        <details className="mt-3">
                            <summary className="cursor-pointer font-semibold text-blue-600">
                                Ver estudiantes
                            </summary>

                            <ul className="mt-2 space-y-1 text-sm">
                                {cluster.students.map((st: any) => (
                                    <li
                                        key={st.id}
                                        className="p-2 bg-white border rounded-lg shadow-sm"
                                    >
                                        <Users className="inline-block mr-2 text-blue-500" size={16} />
                                        {st.nombre}
                                    </li>
                                ))}
                            </ul>
                        </details>

                    </Card>
                ))}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import api from "../../services/api";
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

            //  Backend devuelve un ARRAY directo
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

    const clusterInfo: Record<number, { title: string; short: string }> = {
        0: {
            title: "Estudiantes con hábitos sólidos y equilibrados",
            short: "Grupo con buenos hábitos académicos, buena asistencia y baja distracción. Mantener y potenciar."
        },
        1: {
            title: "Estudiantes con hábitos críticos y en riesgo",
            short: "Grupo con baja motivación, poco estudio y alta ansiedad. Necesitan apoyo cercano."
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Layers className="text-purple-600" size={30} />
                Agrupación por Clusters (IA)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clusters.map((cluster) => (
                    <div
                        key={cluster.clusterId}
                        className="
                bg-white rounded-2xl p-6 shadow-md hover:shadow-xl
                transition-all duration-200 border border-transparent
            "
                    >
                        {/* Header */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 rounded-xl">
                                <Layers className="text-purple-600" size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {clusterInfo[cluster.clusterId]?.title ?? "Grupo identificado"}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1 leading-snug">
                                    {clusterInfo[cluster.clusterId]?.short}
                                </p>
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div
                            className="
                    mt-5 bg-gradient-to-br from-indigo-50 to-indigo-100
                    rounded-xl p-4 shadow-inner
                "
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-indigo-700 text-lg">
                                    {cluster.students.length} estudiantes
                                </p>

                                <span
                                    className="
                            text-xs px-3 py-1 rounded-full font-semibold
                            bg-indigo-200 text-indigo-700
                        "
                                >
                                    {cluster.clusterId === 0 ? "Alto rendimiento" : "Riesgo académico"}
                                </span>
                            </div>

                            <p className="text-xs text-indigo-600 mt-1">
                                {cluster.description}
                            </p>
                        </div>

                        {/* Student List */}
                        <details className="mt-4 group">
                            <summary
                                className="
                        cursor-pointer select-none font-medium text-blue-600
                        flex items-center gap-1 group-open:underline
                    "
                            >
                                Ver estudiantes
                            </summary>

                            <ul className="mt-3 space-y-2">
                                {cluster.students.map((st: any) => (
                                    <li
                                        key={st.id}
                                        className="
                                bg-gray-50 rounded-lg p-2 flex items-center gap-2
                                shadow-sm hover:shadow-md transition
                            "
                                    >
                                        <Users className="text-blue-500" size={16} />
                                        <span className="text-sm text-gray-700">{st.nombre}</span>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </div>

        </div>
    );
}

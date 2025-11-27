import { useEffect, useState } from "react";
import api from "../../services/api";
import { Users, Layers, Eye, X } from "lucide-react";

export default function Clusters() {
    const [clusters, setClusters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // MODAL
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

    useEffect(() => {
        loadClusters();
    }, []);

    const loadClusters = async () => {
        try {
            const res = await api.get("/analytics/clusters");

            if (!Array.isArray(res.data)) throw new Error("Formato inválido");

            const formatted = res.data.map((c: any) => ({
                clusterId: c.cluster,
                students: c.students ?? [],
                description: c.description ?? "Sin descripción",
            }));

            setClusters(formatted);
        } catch (err) {
            setError("Ocurrió un error al cargar los clusters.");
        } finally {
            setLoading(false);
        }
    };

    // ================================
    // 🔵 CARGA DETALLES REALES DEL ALUMNO
    // ================================
    const loadStudentDetails = async (id: number, clusterId: number) => {
        try {
            const res = await api.get(`/students/${id}`);

            // ⬅️ res.data contiene TODAS las variables del estudiante
            setSelectedStudent({
                ...res.data,
                clusterId,
            });

        } catch (err) {
            console.error("Error cargando detalles del estudiante:", err);
        }
    };


    if (loading) return <p>Cargando Clusters...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!clusters.length) return <p>No hay clusters para mostrar.</p>;

    // INFORMACIÓN DEL CLUSTER
    const clusterInfo: Record<number, { title: string; short: string }> = {
        0: {
            title: "Estudiantes con hábitos sólidos y equilibrados",
            short: "Buenos hábitos académicos y constancia.",
        },
        1: {
            title: "Estudiantes con hábitos críticos y en riesgo",
            short: "Baja motivación, poco estudio y ansiedad elevada.",
        },
    };

    const clusterFactors: Record<number, string[]> = {
        0: [
            "Buena asistencia",
            "Horas de estudio adecuadas",
            "Baja ansiedad",
            "Buen manejo del tiempo",
            "Concentración estable",
            "Motivación alta",
        ],
        1: [
            "Sueño insuficiente",
            "Pocas horas de estudio",
            "Alta ansiedad",
            "Mucho uso de redes",
            "Baja motivación",
            "Organización deficiente",
        ],
    };

    const clusterExplanation: Record<number, string> = {
        0: "Este grupo mantiene hábitos saludables que favorecen el aprendizaje.",
        1: "Este grupo presenta hábitos deficientes y requiere acompañamiento cercano.",
    };

    // ============================
    //   SUGERENCIAS AUTOMÁTICAS
    // ============================
    const generateSuggestions = (s: any) => {
        const list: string[] = [];

        if (s.sleep_hours < 7) list.push("Dormir más de 7 horas mejorará su energía y concentración.");
        if (s.study_hours_per_day < 4) list.push("Incrementar las horas de estudio consolida el aprendizaje.");
        if (s.social_media_hours > 2) list.push("Reducir redes sociales puede mejorar su enfoque.");
        if (s.netflix_hours > 2) list.push("Disminuir entretenimiento nocturno mejora el descanso.");
        if (s.attendance_percentage < 90) list.push("Aumentar la asistencia mejora significativamente el rendimiento.");
        if (s.test_anxiety_level > 2) list.push("Requiere apoyo en técnicas de manejo de ansiedad.");
        if (s.academic_motivation < 2) list.push("Trabajar metas pequeñas puede aumentar su motivación.");
        if (s.time_management < 2) list.push("Reforzar gestión del tiempo ayudará a mejorar su organización.");

        if (list.length === 0)
            list.push("No se identifican riesgos importantes. Continúe reforzando sus hábitos actuales.");

        return list;
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
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                    >
                        {/* HEADER */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 rounded-xl">
                                <Layers className="text-purple-600" size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">{clusterInfo[cluster.clusterId].title}</h2>
                                <p className="text-gray-500 text-sm">{clusterInfo[cluster.clusterId].short}</p>
                            </div>
                        </div>

                        {/* RESUMEN */}
                        <div className="mt-5 bg-indigo-50 rounded-xl p-4 shadow-inner">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-indigo-700 text-lg">
                                    {cluster.students.length} estudiantes
                                </p>
                                <span className="text-xs px-3 py-1 rounded-full font-semibold bg-indigo-200 text-indigo-700">
                                    {cluster.clusterId === 0 ? "Alto rendimiento" : "Riesgo académico"}
                                </span>
                            </div>
                            <p className="text-xs text-indigo-600 mt-1">{cluster.description}</p>
                        </div>

                        {/* FACTORES */}
                        <div className="mt-4 bg-white border rounded-xl p-4 shadow-sm">
                            <h4 className="text-sm font-semibold mb-2">Factores influyentes</h4>

                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                {clusterFactors[cluster.clusterId].map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>

                            <p className="text-xs text-gray-500 mt-3">{clusterExplanation[cluster.clusterId]}</p>
                        </div>

                        {/* LISTA DE ESTUDIANTES */}
                        <details className="mt-4 group">
                            <summary className="cursor-pointer font-medium text-blue-600 flex items-center gap-1">
                                Ver estudiantes
                            </summary>

                            <ul className="mt-3 space-y-2">
                                {cluster.students.map((st: any) => (
                                    <li
                                        key={st.id}
                                        className="bg-gray-50 rounded-lg p-2 flex items-center justify-between shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="text-blue-500" size={16} />
                                            <span className="text-sm">{st.nombre}</span>
                                        </div>

                                        {/* BOTÓN VER */}
                                        <button
                                            className="p-2 rounded hover:bg-blue-100 text-blue-600"
                                            onClick={() => {
                                                console.log("🔍 Estudiante recibido desde cluster:", st);
                                                loadStudentDetails(st.id, cluster.clusterId);
                                            }}
                                        >
                                            <Eye size={18} />
                                        </button>

                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </div>

            {/* ============================================================ */}
            {/* ==========================  MODAL  ========================== */}
            {/* ============================================================ */}
            {selectedStudent && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setSelectedStudent(null)}
                    ></div>

                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-3xl z-50 overflow-y-auto max-h-[90vh]">

                        {/* BOTÓN CERRAR */}
                        <button
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => setSelectedStudent(null)}
                        >
                            <X size={20} />
                        </button>

                        {/* TITULO */}
                        <h2 className="text-3xl font-bold mb-1 text-gray-900">
                            {selectedStudent.nombre}
                        </h2>

                        <p className="text-sm text-gray-600 mb-6">
                            Pertenece al{" "}
                            <span className="font-semibold text-indigo-600">
                                {selectedStudent.clusterId === 0
                                    ? "Grupo 0 — Hábitos estables"
                                    : "Grupo 1 — Hábitos en riesgo"}
                            </span>
                        </p>

                        {/* ===================== VARIABLES ===================== */}
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Variables del estudiante</h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-6">
                            <p><strong>Sueño (hrs):</strong> {selectedStudent.sleep_hours}</p>
                            <p><strong>Estudio/día (hrs):</strong> {selectedStudent.study_hours_per_day}</p>
                            <p><strong>Redes (hrs):</strong> {selectedStudent.social_media_hours}</p>
                            <p><strong>Netflix (hrs):</strong> {selectedStudent.netflix_hours}</p>
                            <p><strong>Asistencia (%):</strong> {selectedStudent.attendance_percentage}</p>
                            <p><strong>Ejercicio:</strong> {selectedStudent.exercise_frequency}</p>
                            <p><strong>Ansiedad:</strong> {selectedStudent.test_anxiety_level}</p>
                            <p><strong>Motivación:</strong> {selectedStudent.academic_motivation}</p>
                            <p><strong>Salud mental:</strong> {selectedStudent.mental_health_rating}</p>
                            <p><strong>Concentración:</strong> {selectedStudent.focus_level}</p>
                            <p><strong>Gestión del tiempo:</strong> {selectedStudent.time_management}</p>
                            <p><strong>Autoeficacia:</strong> {selectedStudent.academic_self_efficacy}</p>
                            <p><strong>Técnicas de estudio:</strong> {selectedStudent.study_techniques_usage}</p>
                            <p><strong>Entorno en casa:</strong> {selectedStudent.home_study_environment}</p>
                            <p><strong>Recursos:</strong> {selectedStudent.study_resources_availability}</p>
                            <p><strong>Estrés financiero:</strong> {selectedStudent.financial_stress_level}</p>
                        </div>

                        {/* ===================== INTERPRETACIÓN ===================== */}
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
                            Interpretación personalizada
                        </h3>

                        <p className="text-sm text-gray-700 leading-relaxed">
                            {selectedStudent.clusterId === 0 ? (
                                <>
                                    El estudiante presenta un perfil equilibrado con hábitos saludables en sueño, estudio,
                                    motivación y manejo emocional. Aunque puede existir un margen de mejora en áreas como
                                    concentración o procrastinación, sus patrones generales indican constancia y una buena base
                                    para continuar desarrollándose académicamente.
                                </>
                            ) : (
                                <>
                                    El estudiante muestra señales claras de riesgo académico, asociadas a falta de descanso,
                                    baja motivación, distracciones elevadas, ansiedad y dificultades en manejo del tiempo.
                                    Estos factores combinados reducen su rendimiento y requieren acompañamiento cercano,
                                    monitoreo y estrategias específicas para mejorar su bienestar académico.
                                </>
                            )}
                        </p>

                        {/* ===================== RESULTADO AMPLIADO ===================== */}


                        <p className="text-sm text-gray-700 leading-relaxed">


                            {selectedStudent.clusterId === 0 ? (
                                <>
                                    El modelo clasifica al estudiante dentro de un grupo con patrones positivos, pero
                                    todavía en proceso de consolidación. Sus valores reflejan avances en motivación,
                                    asistencia y técnicas de estudio, aunque es posible que aún experimente niveles moderados
                                    de ansiedad o procrastinación.
                                    <br /><br />
                                    Esto indica que se encuentra en una etapa de transición hacia hábitos académicos más
                                    sólidos, donde pequeños ajustes pueden generar mejoras notables.
                                </>
                            ) : (
                                <>
                                    El modelo ubica al estudiante en el grupo de riesgo, caracterizado por hábitos
                                    inestables. Sus valores reflejan falta de estructura, dificultades emocionales o
                                    uso excesivo de distractores.
                                    <br /><br />
                                    El clustering permite visualizar patrones que explican su bajo rendimiento y ayudan a
                                    orientar intervenciones más precisas para revertir la tendencia negativa.
                                </>
                            )}
                        </p>

                        {/* ===================== RECOMENDACIONES ===================== */}
                        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">
                            Recomendaciones detalladas
                        </h3>

                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            {selectedStudent.clusterId === 0 ? (
                                <>
                                    El estudiante está en una etapa de fortalecimiento, por lo que las recomendaciones se
                                    enfocan en mantener y perfeccionar sus avances. Se sugiere reforzar rutinas de estudio,
                                    registrar progresos, afinar la gestión del tiempo y establecer metas semanales claras.
                                    <br /><br />
                                    La retroalimentación positiva es clave para que sostenga los nuevos hábitos y evite
                                    recaer en prácticas menos saludables. Identificar qué estrategias le funcionan mejor
                                    potenciará su autoeficacia y sensación de control académico.
                                </>
                            ) : (
                                <>
                                    El estudiante necesita una intervención estructurada. Se recomienda crear horarios
                                    simples y realistas, reducir gradualmente distractores digitales y trabajar metas
                                    pequeñas que aumenten su motivación.
                                    <br /><br />
                                    Es importante acompañarlo emocionalmente para manejar ansiedad, fortalecer técnicas
                                    básicas de estudio y enseñarle cómo organizar su tiempo sin sobrecarga. Con seguimiento
                                    semanal y guía personalizada, puede avanzar hacia hábitos más saludables.
                                </>
                            )}
                        </p>

                        {/* ===================== SUGERENCIAS AUTOMÁTICAS ===================== */}
                        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">
                            Sugerencias automáticas
                        </h3>

                        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1 mb-6">
                            {generateSuggestions(selectedStudent).map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>

                        {/* CERRAR */}
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                            onClick={() => setSelectedStudent(null)}
                        >
                            Cerrar
                        </button>

                    </div>
                </>
            )}

        </div>
    );
}

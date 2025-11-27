import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import api from "../../services/api";

import { mapRawForUI } from "../../utils/rawMapper";
import { getPositiveFactors, getNegativeFactors } from "../../utils/factors";

const LABELS_ES: Record<string, string> = {
  sleep_hours: "Horas de sueño",
  attendance_percentage: "Asistencia",
  study_hours_per_day: "Horas de estudio por día",
  exercise_frequency: "Frecuencia de ejercicio",
  social_media_hours: "Uso de redes sociales",
  netflix_hours: "Tiempo en entretenimiento",
  mental_health_rating: "Estado de salud mental",
  academic_motivation: "Motivación académica",
  focus_level: "Nivel de concentración",
  time_management: "Gestión del tiempo",
  test_anxiety_level: "Ansiedad ante exámenes",
  academic_self_efficacy: "Autoeficacia académica",
  study_techniques_usage: "Uso de técnicas de estudio",
  home_study_environment: "Entorno de estudio en casa",
  study_resources_availability: "Disponibilidad de recursos",
  financial_stress_level: "Nivel de estrés financiero",
};


export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  const fetchStudent = async () => {
    const res = await api.get(`/students/${id}`);
    setStudent(res.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) return <p>Cargando...</p>;

  // Convertir los números del raw en categorías entendibles
  const mapped = student.raw ? mapRawForUI(student.raw) : null;

  // Determinar grupo (Cluster 0 / Cluster 1)
  const group = student.academic_performance === "Insuficiente" ? 1 : 0;

  const factors =
    group === 1
      ? getNegativeFactors(mapped)
      : getPositiveFactors(mapped);

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* NOMBRE */}
      <h1 className="text-3xl font-bold mb-2">{student.nombre}</h1>

      {/* CARD PRINCIPAL */}
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Perfil Académico</h2>

        {/* RENDIMIENTO GENERAL */}
        <p className="text-sm mb-4">
          <strong>Rendimiento:</strong>{" "}
          <span
            className={
              student.academic_performance === "Excelente"
                ? "text-green-600"
                : student.academic_performance === "Satisfactorio"
                  ? "text-blue-600"
                  : "text-red-600"
            }
          >
            {student.academic_performance}
          </span>
        </p>

        {/* GRUPO / CLUSTER */}
        <h3 className="text-lg font-bold mt-4">
          {group === 0
            ? "Grupo 0 – Estudiantes con hábitos académicos sólidos y equilibrados"
            : "Grupo 1 – Estudiantes con hábitos críticos y en riesgo académico"}
        </h3>

        {/* INTERPRETACIÓN */}
        <p className="text-gray-700 text-sm mt-3 leading-relaxed">
          {group === 0 && (
            <>
              Este estudiante presenta un perfil académico estable, con hábitos positivos
              que favorecen un buen rendimiento. Entre sus principales fortalezas se
              encuentran: <strong>{factors.join(", ")}</strong>.
              Esto indica constancia, organización y una adecuada adaptación al estudio.
            </>
          )}

          {group === 1 && (
            <>
              El estudiante evidencia varios indicadores asociados a riesgo académico.
              Factores como <strong>{factors.join(", ")}</strong>{" "}
              muestran patrones que pueden afectar su rendimiento si no se interviene a tiempo.
              Este perfil requiere un acompañamiento más cercano.
            </>
          )}
        </p>

        {/* RECOMENDACIONES */}
        <h3 className="text-lg font-semibold mt-6">Recomendaciones para el tutor</h3>

        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1 mt-2">

          {/* Grupo 0 */}
          {group === 0 && (
            <>
              <li>Consolidar las rutinas de estudio ya establecidas.</li>
              <li>Proponer metas académicas progresivas para mantener el avance.</li>
              <li>Reforzar la autoeficacia recordándole sus logros recientes.</li>
              <li>Fomentar técnicas de estudio activas y desafiantes.</li>
              <li>Supervisar el equilibrio entre estudio, descanso y actividades personales.</li>
            </>
          )}

          {/* Grupo 1 */}
          {group === 1 && (
            <>
              <li>Implementar bloques de estudio cortos para reducir la procrastinación.</li>
              <li>Diseñar un plan semanal realista que combine estudio, descanso y ocio.</li>
              <li>Trabajar metas pequeñas para elevar motivación y confianza.</li>
              <li>Aplicar técnicas simples de manejo de ansiedad antes de evaluaciones.</li>
              <li>Revisar y mejorar las técnicas de estudio actuales.</li>
              <li>Acompañar dificultades personales o emocionales que afecten el rendimiento.</li>
            </>
          )}
        </ul>

      </Card>

      {/* DETALLES CRUDOS (MEJORADOS Y EN ESPAÑOL) */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Datos del estudiante</h2>

        {mapped ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.entries(mapped).map(([key, value]: any) => (
              <div
                key={key}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  {LABELS_ES[key] ?? key}
                </p>
                <p className="text-sm text-gray-800 font-medium mt-1">
                  {String(value)}
                </p>
              </div>
            ))}

          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}

      </Card>


    </div>
  );
}

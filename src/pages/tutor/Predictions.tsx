import { useEffect, useState } from "react";
import { getStudentById, getStudents } from "../../services/studentService";
import { Eye, X } from "lucide-react";
import { getPositiveFactors, getNegativeFactors } from "../../utils/factors";
import { mapRawForUI } from "../../utils/rawMapper";

export default function Predictions() {
  const [students, setStudents] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const mapped = selectedStudent?.raw ? mapRawForUI(selectedStudent.raw) : null;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const res = await getStudents(page, 10);
        setStudents(res.results);
        setTotalPages(res.total_pages);
      } catch (error) {
        console.error("Error cargando predicciones:", error);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };

    loadData();
  }, [page]);

  const getPerformanceColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "excelente":
        return "text-green-600 bg-green-50";
      case "satisfactorio":
        return "text-blue-600 bg-blue-50";
      case "insuficiente":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Predicciones</h1>

      {/* TABLA */}
      <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-start">ID</th>
              <th className="py-3 px-4 text-start">Nombre</th>
              <th className="py-3 px-4 text-start">Rendimiento general (%)</th>
              <th className="py-3 px-4 text-start">Predicción</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="py-3 px-4 text-gray-600">{s.id}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{s.nombre}</td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {s.score ? `${s.score}%` : "—"}
                    </span>

                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: s.score ? `${s.score}%` : "0%" }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPerformanceColor(
                      s.academic_performance
                    )}`}
                  >
                    {s.academic_performance}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    className="p-2 rounded hover:bg-blue-50 text-blue-600 transition"
                    onClick={async () => {
                      const full = await getStudentById(s.id);
                      setSelectedStudent(full);
                    }}
                  >
                    <Eye size={20} />
                  </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-4 py-2 rounded border text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Anterior
        </button>

        <p className="font-semibold">Página {page} de {totalPages}</p>

        <button
          disabled={page === totalPages}
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-4 py-2 rounded border text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Siguiente
        </button>
      </div>


      {/* ============================ */}
      {/*     MODAL CENTRADO CLEAN     */}
      {/* ============================ */}
      {selectedStudent && (
        <>
          {/* Fondo difuminado */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSelectedStudent(null)}
          ></div>

          {/* Modal */}
          <div
            className="
              fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg z-50
              animate-fadeScale
            "
          >
            {/* Cerrar */}
            <button
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSelectedStudent(null)}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{selectedStudent.nombre}</h2>
                <p className="text-sm text-gray-500">Estudiante</p>
              </div>

              <span
                className={`
                  ml-auto px-3 py-1 rounded-full text-xs font-semibold
                  ${getPerformanceColor(selectedStudent.academic_performance)}
                `}
              >
                {selectedStudent.academic_performance}
              </span>
            </div>

            {/* Entradas destacadas */}
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Entradas destacadas</h3>

            {/* FACTORES: positivos o negativos */}
            {mapped && (
              <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                {selectedStudent.academic_performance === "Insuficiente"
                  ? getNegativeFactors(mapped).map((f, i) => <li key={i}>{f}</li>)
                  : getPositiveFactors(mapped).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}

            {/* Interpretación */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700">Interpretación</h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {selectedStudent.academic_performance === "Excelente" &&
                  "El estudiante muestra hábitos sólidos y un rendimiento académico muy estable."}

                {selectedStudent.academic_performance === "Satisfactorio" &&
                  "El estudiante mantiene un rendimiento adecuado con margen de mejora en algunos hábitos clave."}

                {selectedStudent.academic_performance === "Insuficiente" &&
                  "Se observan indicadores de riesgo. Requiere acompañamiento para mejorar sus hábitos académicos."}
              </p>
            </div>

            {/* Botón */}
            <div className="mt-7">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                onClick={() => setSelectedStudent(null)}
              >
                Toma acción
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

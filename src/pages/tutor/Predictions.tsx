import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";
import { Eye, X } from "lucide-react";

export default function Predictions() {
  const [students, setStudents] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 📌 Estado del modal
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

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
                    onClick={() => setSelectedStudent(s)}
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
      {/*  MODAL LATERAL PROFESIONAL   */}
      {/* ============================ */}
      {selectedStudent && (
        <>
          {/* Background oscuro */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSelectedStudent(null)}
          ></div>

          {/* Panel del modal */}
          <div className="
            fixed right-0 top-0 h-full w-full md:w-[450px] 
            bg-white shadow-xl z-50 animate-slideLeft
            border-l border-gray-200
          ">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Detalles del Estudiante
              </h2>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setSelectedStudent(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Barra azul decorativa */}
            <div className="w-full h-1 bg-blue-500"></div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
              <p><strong>ID:</strong> {selectedStudent.id}</p>
              <p><strong>Nombre:</strong> {selectedStudent.nombre}</p>
              <p><strong>Rendimiento:</strong> {selectedStudent.academic_performance}</p>
              <p><strong>Puntaje:</strong> {selectedStudent.score ?? "—"}%</p>

              <div className="mt-6">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  onClick={() => setSelectedStudent(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

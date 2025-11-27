import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStudents } from "../../services/studentService";
import { Eye } from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Cargar datos ------------------------------------------------
  useEffect(() => {
    const load = async () => {
      setLoading(true); // activar loading suave

      try {
        const res = await getStudents(page, 10);
        setStudents(res.results);
        setTotalPages(res.total_pages);
      } catch (err) {
        console.error("Error cargando estudiantes:", err);
      } finally {
        // pequeño delay para evitar parpadeos
        setTimeout(() => setLoading(false), 200);
      }
    };

    load();
  }, [page]);


  return (
    <div className="p-2 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Estudiantes</h1>

      {/* TABLA CONTENEDORA */}
      <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Rendimiento</th>
              <th className="py-3 px-4 text-left font-semibold"></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Skeleton loading dentro de la tabla
              [...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100 animate-pulse">
                  <td className="py-4 px-4">
                    <div className="w-8 h-3 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  </td>
                  <td></td>
                </tr>
              ))
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition relative"
                >
                  {/* Barra visual en la izquierda */}
                  <td className="relative py-3 px-4 text-gray-700">
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500/60"></div>
                    {s.id}
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900">
                    {s.nombre}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`
                        px-3 py-1 text-xs font-semibold rounded-full
                        ${s.academic_performance === "Excelente"
                          ? "bg-green-50 text-green-600"
                          : s.academic_performance === "Satisfactorio"
                            ? "bg-blue-50 text-blue-600"
                            : s.academic_performance === "Insuficiente"
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {s.academic_performance}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/tutor/students/${s.id}`}
                      className="p-2 rounded hover:bg-blue-50 text-blue-600 transition"
                    >
                      <Eye size={20} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6 px-1">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-4 py-2 rounded border text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Anterior
        </button>

        <span className="font-semibold text-gray-700">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-4 py-2 rounded border text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

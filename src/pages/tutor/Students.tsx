import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStudents } from "../../services/studentService";
import { Eye } from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const res = await getStudents(page, 10);

        // 👉 YA NO USAMOS mapRawForUI
        setStudents(res.results);
        setTotalPages(res.total_pages);

      } catch (err) {
        console.error("Error cargando estudiantes:", err);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };

    load();
  }, [page]);


  return (
    <div className="p-2 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Estudiantes</h1>

      <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Sueño (hrs)</th>
              <th className="py-3 px-4 text-left">Estudio/día (hrs)</th>
              <th className="py-3 px-4 text-left">Redes (hrs)</th>
              <th className="py-3 px-4 text-left">Netflix (hrs)</th>
              <th className="py-3 px-4 text-left">Asistencia (%)</th>
              <th className="py-3 px-4 text-left">Ansiedad</th>
              <th className="py-3 px-4 text-left">Motivación</th>
              <th className="py-3 px-4 text-left">Rendimiento</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100 animate-pulse">
                  <td className="py-4 px-4"><div className="w-6 h-3 bg-gray-200"></div></td>
                  <td className="py-4 px-4"><div className="w-16 h-3 bg-gray-200"></div></td>
                  {[...Array(8)].map((_, j) => (
                    <td key={j} className="py-4 px-4"><div className="w-12 h-3 bg-gray-200"></div></td>
                  ))}
                  <td></td>
                </tr>
              ))
            ) : (
              students.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition">

                  <td className="py-3 px-4">{s.id}</td>
                  <td className="py-3 px-4 font-medium">{s.nombre}</td>

                  {/* VALORES NUMÉRICOS REALES */}
                  <td className="py-3 px-4">{s.sleep_hours}</td>
                  <td className="py-3 px-4">{s.study_hours_per_day}</td>
                  <td className="py-3 px-4">{s.social_media_hours}</td>
                  <td className="py-3 px-4">{s.netflix_hours}</td>
                  <td className="py-3 px-4">{s.attendance_percentage}%</td>
                  <td className="py-3 px-4">{s.test_anxiety_level}</td>
                  <td className="py-3 px-4">{s.academic_motivation}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${s.academic_performance === "Excelente" ? "bg-green-50 text-green-600" :
                          s.academic_performance === "Satisfactorio" ? "bg-blue-50 text-blue-600" :
                            "bg-red-50 text-red-600"
                        }`}
                    >
                      {s.academic_performance}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/tutor/students/${s.id}`}
                      className="p-2 rounded hover:bg-blue-50 text-blue-600"
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
          className="px-4 py-2 border rounded text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Anterior
        </button>

        <span className="font-semibold">Página {page} de {totalPages}</span>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-4 py-2 border rounded text-blue-600 border-blue-500 hover:bg-blue-50"
        >
          Siguiente
        </button>
      </div>

    </div>
  );
}

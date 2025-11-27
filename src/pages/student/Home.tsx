// src/pages/Home/Home.tsx
import { useEffect, useState } from "react";
import {
  getMyStudent,
  getAvailableTutors,
  chooseTutor,
} from "../../services/studentService";

export default function Home() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [studentHasTutor, setStudentHasTutor] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkTutorStatus();
  }, []);

  const checkTutorStatus = async () => {
    try {
      const res = await getMyStudent();
      if (!res.tutor_id) {
        setStudentHasTutor(false);
        await loadTutors();
      }
    } catch (e) {
      console.error("Error obteniendo estudiante:", e);
    }
    setLoading(false);
  };

  const loadTutors = async () => {
    try {
      const res = await getAvailableTutors();
      setTutors(res);
    } catch (e) {
      console.error("Error cargando tutores:", e);
    }
  };

  const handleChooseTutor = async (tutorId: number) => {
    try {
      await chooseTutor(tutorId);
      setStudentHasTutor(true);
    } catch (e) {
      alert("No se pudo asignar tutor");
      console.error(e);
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  // =============================
  //  UI PARA ELEGIR TUTOR
  // =============================
  if (!studentHasTutor) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-3">Elige tu tutor</h1>
        <p className="text-gray-600 mb-4">
          Solo podrás elegir tu tutor una vez.
        </p>

        <div className="space-y-3">
          {tutors.map((t) => (
            <button
              key={t.id}
              onClick={() => handleChooseTutor(t.id)}
              className="p-4 w-full bg-white shadow rounded-lg border hover:bg-gray-50 text-left transition"
            >
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-600">{t.email}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // =============================
  //  UI NORMAL
  // =============================
  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido</h1>
      <p className="text-gray-600 mt-2">
        Consulta tu rendimiento, hábitos y recomendaciones personalizadas.
      </p>
    </div>
  );
}

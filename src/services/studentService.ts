// src/services/studentService.ts
import api from "./api";

// ================================
//  Obtener mi perfil de estudiante
// ================================
export const getMyStudent = async () => {
  const res = await api.get("/students/me");
  return res.data;
};

// ================================
//  Obtener lista de tutores
// ================================
export const getAvailableTutors = async () => {
  const res = await api.get("/students/available-tutors");
  return res.data;
};

// ================================
//  Elegir tutor (solo 1 vez)
// ================================
export const chooseTutor = async (tutor_id: number) => {
  const res = await api.post("/students/choose-tutor", { tutor_id });
  return res.data;
};

// ================================
//  Obtener lista paginada de estudiantes
// ================================
export const getStudents = async (page: number = 1, limit: number = 10) => {
  const res = await api.get(`/students/?page=${page}&limit=${limit}`);
  return res.data;
};

// ================================
//  Obtener detalle por ID
// ================================
export const getStudentById = async (id: number) => {
  const res = await api.get(`/students/${id}`);
  return res.data;
};

// ================================
//  Obtener predicciones paginadas
// ================================
export const getStudentPredictions = async (
  id: number,
  page: number = 1,
  limit: number = 10
) => {
  const res = await api.get(
    `/students/${id}/predictions?page=${page}&limit=${limit}`
  );
  return res.data;
};

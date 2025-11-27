import api from "./api";

export const getTutorStudents = async () => {
  const res = await api.get("/tutor/students");
  return res.data;
};

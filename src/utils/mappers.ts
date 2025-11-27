// ==============================
// 📌 SUEÑO
// ==============================
export const map_sleep = (v: number) => {
  if (v < 6.5) return "Insuficiente";
  if (v < 8) return "Normal";
  return "Extendido";
};

// ==============================
// 📌 ASISTENCIA
// ==============================
export const map_attendance = (v: number) => {
  if (v < 80) return "Irregular";
  if (v < 95) return "Regular";
  return "Constante";
};

// ==============================
// 📌 HORAS DE ESTUDIO
// ==============================
export const map_study_hours = (v: number) => {
  if (v < 3.5) return "Cortas";
  if (v < 5.5) return "Adecuadas";
  return "Intensas";
};

// ==============================
// 📌 REDES SOCIALES
// ==============================
export const map_social_media = (v: number) => {
  if (v < 1) return "Ligero";
  if (v < 2) return "Moderado";
  return "Excesivo";
};

// ==============================
// 📌 NETFLIX
// ==============================
export const map_netflix = (v: number) => {
  if (v < 1) return "Poco";
  if (v < 2) return "Medio";
  return "Alto";
};

// ==============================
// 📌 EJERCICIO
// ==============================
export const map_exercise = (v: number) => {
  if (v < 3.5) return "Sedentario";
  if (v < 4.5) return "Activo";
  return "Frecuente";
};

// ==============================
// 📌 SALUD MENTAL
// ==============================
export const map_mental_health = (v: number) => {
  if (v < 6.5) return "Delicada";
  if (v < 8) return "Estable";
  return "Óptima";
};

// ==============================
// 📌 ANSIEDAD (TEST)
// ==============================
export const map_anxiety = (v: number) => {
  if (v < 4) return "Leve";
  if (v < 6) return "Moderada";
  return "Severa";
};

// ==============================
// 📌 ESTRÉS FINANCIERO
// ==============================
export const map_financial_stress = (v: number) => {
  if (v < 2) return "Bajo_Estrés";
  if (v < 3) return "Medio_Estrés";
  return "Alto_Estrés";
};

// ==============================
// 📌 ENFOQUE
// ==============================
export const map_focus = (v: number) => {
  if (v < 4) return "Disperso";
  return "Concentrado";
};

// ==============================
// 📌 MOTIVACIÓN
// ==============================
export const map_motivation = (v: number) => {
  if (v < 6) return "Limitada";
  if (v < 8) return "Media";
  return "Alta";
};

// ==============================
// 📌 AUTOEFICACIA
// ==============================
export const map_self_efficacy = (v: number) => {
  if (v < 7) return "Confiado";
  return "Muy_Confiado";
};

// ==============================
// 📌 MANEJO DEL TIEMPO
// ==============================
export const map_time_management = (v: number) => {
  if (v < 3.5) return "Caótico";
  if (v < 4.5) return "Intermedio";
  return "Adecuado";
};

// ==============================
// 📌 TÉCNICAS DE ESTUDIO
// ==============================
export const map_study_techniques = (v: number) => {
  if (v < 3.5) return "Básico";
  if (v < 4.5) return "Intermedio";
  return "Avanzado";
};

// ==============================
// 📌 ENTORNO DE ESTUDIO EN CASA
// ==============================
export const map_resources = (v: number) => {
  if (v < 3.5) return "Escaso";
  if (v < 4.5) return "Suficiente";
  return "Abundante";
};

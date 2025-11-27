export function getPositiveFactors(raw: any) {
    const factors = [];

    if (["Normal", "Extendido"].includes(raw.sleep_hours))
        factors.push("Buen tiempo de sueño");

    if (["Constante", "Regular"].includes(raw.attendance_percentage))
        factors.push("Buena asistencia");

    if (["Adecuado", "Intermedio"].includes(raw.time_management))
        factors.push("Buen manejo del tiempo");

    if (["Alta", "Media"].includes(raw.academic_motivation))
        factors.push("Alta motivación académica");

    if (["Concentrado"].includes(raw.focus_level))
        factors.push("Buen nivel de enfoque");

    if (["Activo", "Frecuente"].includes(raw.exercise_frequency))
        factors.push("Buena actividad física");

    if (["Optima", "Estable"].includes(raw.mental_health_rating))
        factors.push("Salud mental estable");

    // devolver máximo 3
    return factors.slice(0, 3);
}

export function getNegativeFactors(raw: any) {
    const factors = [];

    if (["Insuficiente"].includes(raw.sleep_hours))
        factors.push("Poco tiempo de sueño");

    if (["Irregular"].includes(raw.attendance_percentage))
        factors.push("Baja asistencia");

    if (["Caotico"].includes(raw.time_management))
        factors.push("Manejo del tiempo deficiente");

    if (["Limitada"].includes(raw.academic_motivation))
        factors.push("Motivación académica baja");

    if (["Disperso"].includes(raw.focus_level))
        factors.push("Problemas de concentración");

    if (["Sedentario"].includes(raw.exercise_frequency))
        factors.push("Poca actividad física");

    if (["Delicada"].includes(raw.mental_health_rating))
        factors.push("Salud mental delicada");

    // máximo 3
    return factors.slice(0, 3);
}

import api from "./api";

/* ===========================================================
   🔹 Obtener TODOS los clusters (lista directa)
   GET /analytics/clusters
   =========================================================== */
export const getAllClusters = async () => {
    const res = await api.get("/analytics/clusters");
    return res.data;
    // Ejemplo:
    // [
    //   { cluster: 0, description: "...", students: [...] },
    //   { cluster: 1, description: "...", students: [...] }
    // ]
};

/* ===========================================================
   🔹 Obtener detalles de UN cluster
   GET /analytics/cluster/{cluster_id}
   =========================================================== */
export const getClusterDetails = async (clusterId: number) => {
    const res = await api.get(`/analytics/cluster/${clusterId}`);
    return res.data;
    // { cluster_id, count, students[] }
};

/* ===========================================================
   🔹 Obtener cluster de un estudiante
   GET /analytics/student/{student_id}/cluster
   =========================================================== */
export const getStudentCluster = async (studentId: number) => {
    const res = await api.get(`/analytics/student/${studentId}/cluster`);
    return res.data;
    // { student_id, nombre, cluster }
};

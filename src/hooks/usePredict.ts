import { useState } from "react";
import { api } from "../services/api";

export function usePredict() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function predict(data: any) {
    try {
      setLoading(true);
      const res = await api.post("/predict", data);
      setResult(res.data);
    } catch (error) {
      console.error("Error al predecir:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, result, predict };
}

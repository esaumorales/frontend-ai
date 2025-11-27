import { useState } from "react";
import { sendPredict } from "../services/predictService";

export function usePredict() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const predict = async (payload: any) => {
    setLoading(true);
    try {
      const res = await sendPredict(payload);
      setResult(res.prediction);
    } finally {
      setLoading(false);
    }
  };

  return { predict, result, loading };
}

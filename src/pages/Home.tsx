import { useState } from "react";
import { options } from "../data/options";
import { FormField } from "../components/FormField";
import { Button } from "../components/ui/Button";
import { usePredict } from "../hooks/usePredict";
import { PredictionResult } from "../components/PredictionResult";

export function Home() {
  const { loading, result, predict } = usePredict();

  const [form, setForm] = useState({
    sleep_hours: "",
    attendance_percentage: "",
    time_management: "",
    study_techniques_usage: "",
    study_hours_per_day: "",
    social_media_hours: "",
    mental_health_rating: "",
    test_anxiety_level: "",
    exercise_frequency: "",
    focus_level: "",
    study_resources_availability: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    predict(form);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">Predicción Académica (IA)</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-xl p-6 rounded-xl"
      >
        {Object.entries(options).map(([key, opts]) => (
          <FormField
            key={key}
            label={key.replace(/_/g, " ").toUpperCase()}
            name={key}
            value={(form as any)[key]}
            options={opts}
            onChange={handleChange}
          />
        ))}

        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Predecir"}
          </Button>
        </div>
      </form>

      {result && (
        <PredictionResult
          predicted_class={result.predicted_class}
          probabilities={result.probabilities}
        />
      )}
    </div>
  );
}

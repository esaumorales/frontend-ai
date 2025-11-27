import { useState } from "react";
import { usePredict } from "../../hooks/usePredict";

import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

import { habitOptions } from "../../data/options";
import { habitLabels } from "../../data/habitLabels";
import { habitGroups } from "../../data/habitGroups";

import {
  Moon, Clock, Activity, Brain, Book, BarChart2, Dumbbell,
  Smartphone, Smile, AlertTriangle, Wallet, Tv, Users,
  Timer, Heart
} from "lucide-react";

const icons: any = {
  sleep_hours: <Moon className="text-blue-600" size={20} />,
  study_hours_per_day: <Clock className="text-blue-600" size={20} />,
  exercise_frequency: <Dumbbell className="text-blue-600" size={20} />,
  focus_level: <Brain className="text-blue-600" size={20} />,
  study_resources_availability: <Book className="text-blue-600" size={20} />,
  social_media_hours: <Smartphone className="text-blue-600" size={20} />,
  mental_health_rating: <Heart className="text-blue-600" size={20} />,
  test_anxiety_level: <AlertTriangle className="text-blue-600" size={20} />,
  financial_stress_level: <Wallet className="text-blue-600" size={20} />,
  netflix_hours: <Tv className="text-blue-600" size={20} />,
  academic_motivation: <BarChart2 className="text-blue-600" size={20} />,
  academic_self_efficacy: <Smile className="text-blue-600" size={20} />,
  attendance_percentage: <Users className="text-blue-600" size={20} />,
  time_management: <Timer className="text-blue-600" size={20} />,
  study_techniques_usage: <Book className="text-blue-600" size={20} />,
  procrastination_level: <Activity className="text-blue-600" size={20} />,
  home_study_environment: <Users className="text-blue-600" size={20} />,
};

export default function MyHabits() {
  const [form, setForm] = useState<any>({});
  const { predict, result, loading } = usePredict();

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Mis Hábitos</h1>
      <p className="text-gray-600 mb-6">
        Completa tus hábitos diarios para obtener una predicción personalizada.
      </p>

      {/** AGRUPACIÓN INTUITIVA */}
      {Object.entries(habitGroups).map(([groupName, groupKeys]) => (
        <div key={groupName} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            {groupName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {groupKeys.map((key) => (
              <div
                key={key}
                className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  {icons[key]}
                  <p className="font-medium">{habitLabels[key]}</p>
                </div>

                <Select
                  label={habitLabels[key]}
                  value={form[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  options={habitOptions[key as keyof typeof habitOptions]}
                />


              </div>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={() => predict(form)}
        disabled={loading}
        className="mt-4 px-6 py-3 text-lg"
      >
        {loading ? "Calculando..." : "Predecir rendimiento académico"}
      </Button>

      {result && (
        <div className="mt-6 p-5 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-bold text-gray-800">Resultado:</h2>
          <p className="text-3xl font-semibold text-blue-600 mt-2">{result}</p>
        </div>
      )}
    </div>
  );
}

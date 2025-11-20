import { Card } from "./ui/Card";

type Props = {
  predicted_class: string;
  probabilities: Record<string, number>;
};

export function PredictionResult({ predicted_class, probabilities }: Props) {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-4">
        Resultado: {predicted_class}
      </h2>

      <div className="space-y-3">
        {Object.entries(probabilities).map(([cls, prob]) => (
          <div key={cls}>
            <p className="font-semibold">{cls}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3"
                style={{ width: `${prob * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{(prob * 100).toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

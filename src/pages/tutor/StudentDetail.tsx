import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import api from "../../services/api";

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  const fetchStudent = async () => {
    const res = await api.get(`/students/${id}`);
    setStudent(res.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{student.nombre}</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Información Académica</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(student).map(([key, value]: any) => (
            <p key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}

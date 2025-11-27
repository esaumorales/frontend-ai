import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { register as registerService } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    setError("");

    try {
      await registerService(form);
      navigate("/login");
    } catch (e) {
      setError("No se pudo registrar. Intenta con un correo diferente.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Crear Cuenta</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <Input
          label="Nombre completo"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input
          label="Correo electrónico"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Contraseña"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          type="password"
        />

        <div className="mt-3">
          <label className="font-semibold">Rol</label>
          <select
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="border w-full p-2 rounded-lg mt-1"
          >
            <option value="student">Estudiante</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <Button className="w-full mt-4" onClick={handleRegister}>
          Registrarme
        </Button>

        <p className="text-center mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
}

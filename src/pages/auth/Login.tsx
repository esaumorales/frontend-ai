import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await loginService(email, password);
      login(res.user);
      localStorage.setItem("token", res.access_token);

      if (res.user.role === "tutor") navigate("/tutor");
      else navigate("/student");
    } catch {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#0b0d11] to-[#0a0c10] p-6">
      <div className="
        w-full max-w-md 
        bg-white/10 backdrop-blur-xl 
        shadow-2xl rounded-2xl border border-white/20 
        p-8 text-white
      ">
        
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Bienvenido Nuevamente
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input
              className="
                w-full pl-10 p-3 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-300
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input
              className="
                w-full pl-10 p-3 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-300
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="
            w-full mt-4 py-3 rounded-lg
            bg-blue-600 hover:bg-blue-700 
            text-white font-semibold shadow-lg
            transition-all
          "
        >
          Iniciar Sesión
        </button>

        <p className="text-center mt-6 text-sm text-gray-300">
          ¿No tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300"
          >
            Crear cuenta
          </span>
        </p>
      </div>
    </div>
  );
}

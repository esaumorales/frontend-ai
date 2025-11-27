import { Bell, Moon, Sun, Settings } from "lucide-react";
import { useState } from "react";

export default function ConfigTutor() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3 mb-4">
        <Settings size={30} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Configuración del Tutor</h1>
      </div>

      <p className="text-gray-600">
        Personaliza tus preferencias. (Esto es solo visual, aún sin conexión al backend)
      </p>

      {/* ====================== */}
      {/*     SECCIÓN GENERAL    */}
      {/* ====================== */}
      <div className="bg-white shadow rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="text-xl font-semibold">Preferencias Generales</h2>

        {/* Tema */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Tema del Sistema</h3>
            <p className="text-sm text-gray-600">Elige entre modo claro u oscuro.</p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              darkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            {darkMode ? "Oscuro" : "Claro"}
          </button>
        </div>

        <hr className="border-gray-200" />

        {/* Nombre */}
        <div className="space-y-1">
          <h3 className="font-medium">Nombre del Tutor</h3>
          <input
            type="text"
            placeholder="Ej. Carlos Pérez"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* =========================== */}
      {/*   SECCIÓN NOTIFICACIONES    */}
      {/* =========================== */}
      <div className="bg-white shadow rounded-xl border border-gray-200 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Bell size={22} className="text-blue-600" />
          <h2 className="text-xl font-semibold">Notificaciones</h2>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificaciones por Email</h3>
            <p className="text-sm text-gray-600">Alertas sobre estudiantes y predicciones.</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="sr-only peer"
            />
            <div
              className="w-12 h-6 bg-gray-300 peer-focus:ring-4 
              peer-focus:ring-blue-300 rounded-full 
              peer peer-checked:bg-blue-600
              after:content-[''] after:absolute after:top-1 after:left-1
              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4
              after:transition-all peer-checked:after:translate-x-6"
            />
          </label>
        </div>

        {/* App Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificaciones en la App</h3>
            <p className="text-sm text-gray-600">Mensajes, predicciones y alertas importantes.</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={appNotif}
              onChange={() => setAppNotif(!appNotif)}
              className="sr-only peer"
            />
            <div
              className="w-12 h-6 bg-gray-300 peer-focus:ring-4 
              peer-focus:ring-blue-300 rounded-full 
              peer peer-checked:bg-blue-600
              after:content-[''] after:absolute after:top-1 after:left-1
              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4
              after:transition-all peer-checked:after:translate-x-6"
            />
          </label>
        </div>
      </div>

      {/* ====================== */}
      {/*     OTRAS OPCIONES     */}
      {/* ====================== */}
      <div className="bg-white shadow rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="text-xl font-semibold">Otras Configuraciones</h2>

        <p className="text-gray-600 text-sm">
          Estas opciones estarán disponibles próximamente.
        </p>

        <ul className="list-disc ml-6 text-gray-700 space-y-2 text-sm">
          <li>Integración con calendario y horarios</li>
          <li>Control avanzado de alertas de riesgo</li>
          <li>Preferencias para reportes PDF</li>
          <li>Sincronización entre dispositivos</li>
        </ul>
      </div>
    </div>
  );
}

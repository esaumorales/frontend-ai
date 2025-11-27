import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function IndexPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "tutor") {
      navigate("/tutor");
      return;
    }

    if (user.role === "student") {
      navigate("/student");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="p-4">
      <p className="text-center text-gray-500">
        Redirigiendo...
      </p>
    </div>
  );
}

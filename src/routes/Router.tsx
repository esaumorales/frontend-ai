import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Layouts
import TutorLayout from "../components/layout/TutorLayout";
import StudentLayout from "../components/layout/StudentLayout";

// Tutor pages
import Dashboard from "../pages/tutor/Dashboard";
import Students from "../pages/tutor/Students";
import StudentDetail from "../pages/tutor/StudentDetail";
import Predictions from "../pages/tutor/Predictions";
import ChatIATutor from "../pages/tutor/ChatIA";
import ConfigTutor from "../pages/tutor/Config";
import SupportChatTutor from "../pages/tutor/SupportChat";

// Student pages
import Home from "../pages/student/Home";
import MyHabits from "../pages/student/MyHabits";
import MyProgress from "../pages/student/MyProgress";
import ChatIAStudent from "../pages/student/ChatIA";
import ConfigStudent from "../pages/student/Config";
import SupportChatStudent from "../pages/student/SupportChat";
import Clusters from "../pages/tutor/Clusters";


export default function Router() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TUTOR */}
        <Route
          path="/tutor"
          element={
            user?.role === "tutor" ? <TutorLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="clusters" element={<Clusters />} />
          <Route path="chat" element={<ChatIATutor />} />
          <Route path="support" element={<SupportChatTutor />} />
          <Route path="config" element={<ConfigTutor />} />
        </Route>

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            user?.role === "student" ? <StudentLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Home />} />
          <Route path="habits" element={<MyHabits />} />
          <Route path="progress" element={<MyProgress />} />
          <Route path="chat" element={<ChatIAStudent />} />
          <Route path="support" element={<SupportChatStudent />} />
          <Route path="config" element={<ConfigStudent />} />
        </Route>

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            user
              ? user.role === "tutor"
                ? <Navigate to="/tutor" />
                : <Navigate to="/student" />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
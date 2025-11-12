import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AlunoDashboard from "./pages/AlunoDashboard.jsx";
import ProfessorDashboard from "./pages/ProfessorDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

export default function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Rotas pós-login (ajusta depois se tiver ProtectedRoute) */}
      <Route path="/aluno" element={<AlunoDashboard />} />
      <Route path="/professor" element={<ProfessorDashboard />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: "30px", fontSize: "20px" }}>
            Página não encontrada
          </div>
        }
      />
    </Routes>
  );
}

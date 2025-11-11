import { Routes, Route } from "react-router-dom";
import { Container, Toolbar } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AlunoDashboard from "./pages/AlunoDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      {/* Use este Toolbar como espaçador SE o AppBar estiver position="fixed" */}
      <Toolbar sx={{ mb: 2 }} />
      <Container sx={{ pb: 6 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard/aluno"
            element={
              <ProtectedRoute allowedRoles={["aluno"]}>
                <AlunoDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/professor"
            element={
              <ProtectedRoute allowedRoles={["professor"]}>
                <ProfessorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}
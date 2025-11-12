import React from "react";
import Navbar from "../components/Navbar";

export default function ProfessorDashboard() {
  return (
    <>
      <Navbar />

      <main className="container">
        <section className="card">
          <h1>Área do Professor</h1>
          <p>
            Aqui você poderá gerenciar vagas de monitoria, acompanhar alunos
            inscritos e configurar atendimentos.
          </p>

          <p style={{ marginTop: 16 }}>
            (Depois a gente preenche com as funcionalidades reais do sistema.)
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© 2025 PBE 25.2_8004_II — Professor</small>
        </div>
      </footer>
    </>
  );
}

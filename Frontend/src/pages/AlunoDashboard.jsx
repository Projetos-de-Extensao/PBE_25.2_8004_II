import React from "react";
import Navbar from "../components/Navbar";

export default function AlunoDashboard() {
  return (
    <>
      <Navbar />

      <main className="container">
        <section className="card">
          <h1>Área do Aluno</h1>
          <p>
            Aqui você poderá visualizar vagas de monitoria, inscrições e
            informações das turmas.
          </p>

          <p style={{ marginTop: 16 }}>
            (Por enquanto é só um rascunho visual. Depois a gente coloca a
            listagem real de monitorias aqui.)
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© 2025 PBE 25.2_8004_II — Aluno</small>
        </div>
      </footer>
    </>
  );
}

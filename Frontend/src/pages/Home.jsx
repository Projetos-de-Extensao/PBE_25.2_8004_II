import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="container">
        <section className="card">
          <h1>Plataforma de Monitoria</h1>
          <p>
            Acesse como <strong>Aluno</strong>, <strong>Professor</strong> ou
            <strong> Administração</strong> para gerenciar monitorias, turmas e
            atendimentos.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 12,
            }}
          >
            <Link className="btn" to="/login">
              Acessar Aluno
            </Link>
            <Link className="btn" to="/login?role=professor">
              Acessar Professor
            </Link>
            <Link className="btn btn-outline" to="/admin-login">
              Acessar Administração
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© 2025 PBE 25.2_8004_II — Projeto acadêmico Ibmec</small>
        </div>
      </footer>
    </>
  );
}

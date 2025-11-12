import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }
    if (senha.length < 4) {
      setErro("Senha muito curta.");
      return;
    }

    // Aqui depois você integra com seu backend/AuthContext
    alert("Login de administração realizado (simulação).");
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="card card-narrow">
          <h1>Login — Administração</h1>
          <p>Use seu e-mail institucional para acessar a área administrativa.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">E-mail institucional</label>
              <input
                id="email"
                type="email"
                placeholder="admin@ibmec.edu.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && (
              <p style={{ color: "#c00", fontWeight: 700, margin: 0 }}>
                {erro}
              </p>
            )}

            <button className="btn" type="submit">
              Entrar
            </button>
            <Link className="btn btn-outline" to="/">
              Voltar
            </Link>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© 2025 PBE 25.2_8004_II — Administração</small>
        </div>
      </footer>
    </>
  );
}

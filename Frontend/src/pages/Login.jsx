import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");

  // se tiver ?role=professor vira "Professor", senão "Aluno"
  const isProfessor = roleParam === "professor";
  const titulo = isProfessor ? "Login — Professor" : "Login — Aluno";

  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!identificador.trim()) {
      setErro("Preencha o campo de identificação.");
      return;
    }
    if (senha.length < 4) {
      setErro("Senha muito curta.");
      return;
    }

    // Aqui depois você integra com seu backend / AuthContext
    alert(`${titulo} realizado (simulação).`);
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="card card-narrow">
          <h1>{titulo}</h1>
          <p>
            Informe seus dados para acessar a área de{" "}
            <strong>{isProfessor ? "Professor" : "Aluno"}</strong>.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="id">
                {isProfessor ? "E-mail institucional" : "Matrícula / RA"}
              </label>
              <input
                id="id"
                type={isProfessor ? "email" : "text"}
                placeholder={
                  isProfessor ? "nome.sobrenome@ibmec.edu.br" : "Ex.: 2025XXXX"
                }
                value={identificador}
                onChange={(e) => setIdentificador(e.target.value)}
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
          <small>© 2025 PBE 25.2_8004_II — Acesso</small>
        </div>
      </footer>
    </>
  );
}

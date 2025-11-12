import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/ibmec-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-wrap">
        {/* Logo Ibmec -> Home */}
        <Link
          to="/"
          className="brand"
          aria-label="Ir para Home"
          onClick={close}
        >
          <img src={logo} alt="Ibmec" className="brand-logo" />
        </Link>

        {/* Navegação */}
        <nav className={`nav ${open ? "is-open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={close} end>
            Home
          </NavLink>

          <NavLink to="/login" className="nav-link" onClick={close}>
            Aluno
          </NavLink>

          <NavLink
            to="/login?role=professor"
            className="nav-link"
            onClick={close}
          >
            Professor
          </NavLink>

          <NavLink to="/admin-login" className="nav-link" onClick={close}>
            Administração
          </NavLink>
        </nav>

        {/* Botão mobile */}
        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={open ? "true" : "false"}
          onClick={toggle}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

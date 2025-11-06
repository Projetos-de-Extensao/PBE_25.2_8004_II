import React, { useState } from 'react';

export default function Login({ onLogin, mensagem }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div>
          <label>Usuário: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Senha: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p style={{ color: 'red' }}>{mensagem}</p>
    </div>
  );
}

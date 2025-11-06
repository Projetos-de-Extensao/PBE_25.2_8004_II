import React, { useState } from 'react';

export default function VagaForm({ disciplinas = [], onCreate }) {
  const [nome, setNome] = useState('');
  const [crminimo, setCrminimo] = useState(0.0);
  const [disciplinaId, setDisciplinaId] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!disciplinaId) return;
    onCreate({ nome, crminimo: parseFloat(crminimo), disciplina: parseInt(disciplinaId) });
    setNome('');
    setCrminimo(0.0);
    setDisciplinaId('');
  };

  return (
    <form onSubmit={submit} style={{ marginTop: '1rem' }}>
      <div>
        <label>Nome: </label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>CR mínimo: </label>
        <input type="number" step="0.1" value={crminimo} onChange={(e) => setCrminimo(e.target.value)} />
      </div>
      <div>
        <label>Disciplina: </label>
        <select value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)}>
          <option value="">-- Selecione --</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>{d.nome} ({d.codigo})</option>
          ))}
        </select>
      </div>
      <button type="submit">Criar Vaga</button>
    </form>
  );
}

import React from 'react';

export default function VagaCard({ vaga }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '0.75rem', borderRadius: 6, marginBottom: '0.5rem' }}>
      <h3 style={{ margin: '0 0 0.25rem 0' }}>{vaga.nome}</h3>
      <div>CR mínimo: {vaga.crminimo}</div>
      {vaga.disciplina && <div>Disciplina: {vaga.disciplina.nome || vaga.disciplina}</div>}
      <div>Status: {vaga.statusvaga}</div>
    </div>
  );
}

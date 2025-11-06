import React from 'react';
import VagaCard from '../components/VagaCard';
import VagaForm from '../components/VagaForm';

export default function Home({ vagas = [], disciplinas = [], onFetchVagas, onCreateVaga, mensagem }) {
  return (
    <div>
      <h2>Vagas Abertas</h2>
      <button onClick={onFetchVagas}>Atualizar Lista de Vagas</button>
      <p style={{ color: 'blue' }}>{mensagem}</p>

      <div style={{ marginTop: '1rem' }}>
        {vagas.length > 0 ? (
          vagas.map((v) => <VagaCard key={v.id} vaga={v} />)
        ) : (
          <p>Nenhuma vaga encontrada.</p>
        )}
      </div>

      <hr />

      <h2>Criar Nova Vaga</h2>
      <VagaForm disciplinas={disciplinas} onCreate={onCreateVaga} />
    </div>
  );
}

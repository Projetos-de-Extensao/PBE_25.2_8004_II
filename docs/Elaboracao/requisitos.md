# Elicitação de Requisitos  
Equipe: Elon Musk

---

## Requisitos Funcionais

### Alunos
- Candidatar-se para vagas de monitoria
- Visualizar vagas de monitoria
- Acompanhar o status de candidatura

### Professores
- Criar vagas de monitoria
- Gerenciar candidaturas
- Excluir vagas

### Sistema
- Validar critérios para os candidatos se aplicarem à vaga
- Gerar dashboards analíticos para a direção

---

## Requisitos Não Funcionais

- Desenvolvimento em Python, utilizando Django
- Documentação adequada usando MkDocs
- Senhas criptografadas
- Tempo de resposta adequado
- Interface de fácil compreensão e boa usabilidade

---

## Regras de Negócio

1. O email de login deve ser o institucional da IBMEC, sendo validado pelo sistema.
2. Um aluno não pode se candidatar mais de uma vez para a mesma vaga.
3. O aluno deve estar cursando ou ter cursado a disciplina.
4. A aprovação do aluno é feita apenas pelo encarregado da disciplina.
5. Os dashboards são de visualização exclusiva da direção.
6. Cada aluno só pode ser monitor de uma disciplina (a confirmar informação).
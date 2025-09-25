# Slide de Iniciação do Projeto  
Equipe: Elon Musk

---

## O que foi feito?

1. Pesquisa  
2. Mapas mentais, brainstorm e design thinking  
3. Protótipo de baixa fidelidade do projeto  
4. Elicitação de requisitos funcionais e não funcionais  
5. Criação dos casos de uso e elaboração das principais funcionalidades  

---

## 1. Introdução ao Projeto

**Objetivo:**  
Centralizar as informações para facilitar o processo de aplicação, gerenciamento e supervisão de vagas de monitoria para todas as partes envolvidas.

**Documentação:**  
A equipe utilizou brainstorm e documentos de design thinking para iniciar a elicitação das funcionalidades que serão desenvolvidas no site.

---

## 2. Elicitação de Requisitos do Projeto e Regras de Negócio

### Requisitos Funcionais

**Alunos**
- Candidatar-se para vagas de monitoria
- Visualizar vagas de monitoria
- Acompanhar o status de candidatura

**Professores**
- Criar vagas de monitoria
- Gerenciar candidaturas
- Excluir vagas

**Sistema**
- Validar critérios para os candidatos se aplicarem à vaga
- Gerar dashboards analíticos para a direção

### Requisitos Não Funcionais

- Desenvolvimento em Python, utilizando Django
- Documentação adequada usando MkDocs
- Senhas criptografadas
- Tempo de resposta adequado
- Interface de fácil compreensão e boa usabilidade

---

## 3. Criação dos Casos de Uso

### Funcionalidades Gerais (todas as partes)

- Editar perfil
- Esqueci a senha
- Login
- Cadastro

### Funcionalidades do Aluno

- Candidatar-se a vagas
- Visualizar candidatura (aceito/recusado)
- Cancelar candidatura

### Funcionalidades do Professor

- Criar vagas
- Editar vagas
- Gerenciar candidatos
- Excluir vagas

### Funcionalidades da Direção / Sistema

- Gerar relatórios
- Dashboard analítico

---

## 4. Principais Exemplos dos Casos de Uso

### Caso de Uso: Candidatar-se a Vaga

**Ator:** Aluno  
**Descrição:** Permite que o aluno se candidate a uma vaga de monitoria aberta.

**Pré-condição:** O aluno deve estar logado. Deve haver pelo menos uma vaga disponível.

**Fluxo Principal**
1. O aluno busca e visualiza uma vaga de monitoria de interesse.
2. O aluno seleciona a opção "Candidatar-se".
3. O sistema exibe um resumo da vaga e solicita confirmação.
4. O aluno confirma a candidatura.
5. O sistema registra a candidatura com status "Pendente".
6. O sistema notifica o professor responsável pela vaga.

**Fluxos Alternativos**
- **2a - Critérios de candidatura:** A opção candidatar-se só é visível ao aluno cujo CR na disciplina é > 8, ou de acordo com os critérios do professor.

**Pós-condição:** Uma nova candidatura é criada com status "Pendente" e o professor é notificado.

**Regras de Negócio:**
- Um aluno não pode se candidatar mais de uma vez à mesma vaga.
- O aluno deve ter cursado ou estar cursando a disciplina para a qual está se candidatando.

---

### Caso de Uso: Criar Vaga de Monitoria

**Ator:** Professor  
**Descrição:** Permite que o professor publique uma nova vaga de monitoria.

**Pré-condição:** O professor deve estar logado.

**Fluxo Principal**
1. O professor seleciona "Criar Nova Vaga".
2. O sistema exibe um formulário (disciplina, descrição, requisitos, data limite para candidaturas).
3. O professor preenche os dados e publica a vaga.
4. O sistema salva a vaga com status "Ativa" e a disponibiliza para os alunos.

**Pós-condição:** Uma nova vaga de monitoria é criada e visível para os alunos.

**Regras de Negócio:**
- A data limite para candidaturas deve ser posterior ao dia da criação da vaga.

---

### Caso de Uso: Gerar Relatórios

**Ator:** Direção  
**Descrição:** Permite que a direção gere relatórios consolidados sobre as monitorias (ex.: vagas mais procuradas, taxa de aceitação).

**Pré-condição:** O usuário da direção deve estar logado.

**Fluxo Principal**
1. O usuário acessa a seção "Relatórios".
2. O sistema exibe opções de filtros (período, curso, disciplina).
3. O usuário seleciona os filtros desejados e solicita a geração do relatório.
4. O sistema processa os dados e exibe o relatório na tela.
5. O usuário tem a opção de exportar o relatório no modelo que preferir (PDF, XLSX).

**Pós-condição:** Um relatório é gerado com base nos filtros aplicados.
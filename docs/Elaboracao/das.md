---
id: documento_de_arquitetura
title: Documento de Arquitetura
---

# Documento de Arquitetura de Software (DAS)

# Portal de Monitoria

# Introdução

## Proposta

<p align="justify">
Este documento apresenta uma visão geral da arquitetura do sistema <b>Portal de Monitoria</b>, descrevendo suas camadas, componentes e decisões técnicas adotadas durante o desenvolvimento. O documento tem como objetivo servir como referência para desenvolvedores, equipe de manutenção, professores orientadores e demais envolvidos no projeto.
</p>

## Escopo

<p align="justify">
A aplicação <b>Portal de Monitoria</b> tem como objetivo fornecer uma plataforma digital para gerenciar vagas de monitoria acadêmica. Os alunos podem visualizar e se candidatar às vagas disponíveis, enquanto professores podem criar e acompanhar suas vagas. Além disso, administradores podem gerenciar as permissões e usuários do sistema.
</p>

## Definições, Acrônimos e Abreviações

- **MVC** – Model, View, Controller (padrão de arquitetura do backend)
- **SPA** – Single Page Application (arquitetura do frontend React)
- **JWT** – JSON Web Token (autenticação baseada em token)
- **API REST** – Interface de comunicação entre cliente e servidor
- **Portal de Monitoria** – Nome da aplicação

## Visão Geral

<p align="justify">
O Documento de Arquitetura de Software (DAS) apresenta uma visão global da arquitetura do sistema, abordando elementos funcionais, lógicos, estruturais e de implantação. Serão contempladas as seguintes visões:
</p>

- Caso de Uso  
- Lógica  
- Implantação  
- Implementação  
- Dados  

# Representação Arquitetural

## Cliente-Servidor

<p align="justify">
O Portal de Monitoria segue o modelo de arquitetura Cliente-Servidor. O cliente (frontend) é responsável pela interface com o usuário, enviando requisições para o servidor (backend), que processa regras de negócio e realiza operações no banco de dados.
</p>

### Cliente (Frontend):

- **View:** Consiste nas páginas e componentes construídos em React, utilizando Material UI para estilização.
- **Roteamento:** Gerenciado pelo React Router.
- **Autenticação:** Controlada pelo contexto global (AuthContext), utilizando tokens.

### Servidor (Backend):

- **Controller:** Recebe requisições da API e direciona para a camada de serviços.
- **Service:** Contém a lógica de negócio, validações e regras.
- **Model:** Representa as entidades do banco de dados.
- **Repository:** Realiza operações de persistência no banco.
- **Middleware:** Verifica autenticação e autorização com base no papel (aluno, professor, administrador).

# Objetivos de Arquitetura e Restrições

## Objetivos

<p align="justify">

**Segurança:**  
- Autenticação por JWT  
- Autorização baseada em papéis  

**Persistência:**  
- Dados armazenados em banco relacional  

**Privacidade:**  
- Middlewares garantem que cada usuário veja apenas informações relacionadas ao seu papel  

**Desempenho:**  
- Requisições otimizadas, cache do frontend, carregamento rápido via Vite  

**Reusabilidade:**  
- Componentes React reutilizáveis e padronização visual com Material UI  

</p>

## Restrições

<p align="justify">

**Tamanho da tela:**  
Interface desenvolvida de forma responsiva.

**Portabilidade:**  
Compatível com os principais navegadores.
</p>

| IE | Edge | Firefox | Chrome | Safari | Googlebot |
|----|------|---------|--------|--------|-----------|
| 11 | >= 14 | >= 52 | >= 49 | >= 10 | Sim |

<p align="justify">
**Serviços:**  
A aplicação depende de servidor web e banco de dados ativo.

**Acesso à internet:**  
O sistema opera apenas com conexão.
</p>

## Ferramentas Utilizadas

- **React + Vite:** Desenvolvimento do frontend
- **Material UI:** Interface e tematização
- **Node.js / Express:** Backend e API REST
- **PostgreSQL ou MySQL:** Banco relacional
- **GitHub:** Controle de versão
- **JWT:** Autenticação

# Visão de Caso de Uso

<p align="justify">
Os diagramas abaixo representam as interações possíveis entre os atores do sistema e suas funcionalidades.
</p>

*(Aqui você insere o print do diagrama)*

# Visão Lógica

<p align="justify">
A visão lógica descreve como as páginas, componentes e módulos interagem entre si no frontend e como se comunicam com o backend.
</p>

# Visão de Implantação

<p align="justify">
A aplicação é implantada no modelo web, onde o frontend é hospedado em um serviço de entrega de arquivos estáticos e o backend é executado em servidor Node.js conectado ao banco de dados.
</p>

# Visão de Implementação

## Visão Geral

*(Aqui você adiciona o diagrama de componentes)*

# Visão de Dados

## Modelo Entidade Relacionamento (MER)

#### Entidades e Relacionamentos:

- Usuário (Administrador, Aluno ou Professor)
- Vaga (criada por professor)
- Candidatura (realizada por aluno)

## Diagrama Entidade Relacionamento (DER)



# Tamanho e Desempenho

- Baixo consumo de recursos no cliente.
- Respostas rápidas via API REST.

# Qualidade

- Facilidade de manutenção.
- Interface consistente.
- Organização modular.

# Referências Bibliográficas

- Documentação React
- Documentação Express.js
- Documentação PostgreSQL

# Histórico de Versão

| Data       | Versão | Descrição                                                            | Autor(es)                                   |
| ---------- | ------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| 08/11/2020 | 1.0     | Criada estrutura básica do documento                                  | Pedro Araujo, Yago Carvalho, Arthur Riess e Felipe |
| 15/11/2020 | 1.1     | Representação arquitetural e objetivos e restrições arquiteturais. | .................Autores                                     |
| 19/11/2020 | 1.2     | Adição dos diagramas, visões, tamanho e desempenho e qualidade      | Pedro Araujo, Yago Carvalho e Arthur Riess | Autores                                     |
| 20/11/2020 | 1.3     | Adição da descrição de MER e DER                                   | Yago Carvalho e Arthur RiessAutores                                     |
| 20/11/2020 | 1.4     | Adição do tópico de qualidade                                       | .................Autores                                     |
| 20/11/2020 | 1.5     | Revisão                                                               | Pedro Araujo, Yago Carvalho, Arthur Riess e Felipe |
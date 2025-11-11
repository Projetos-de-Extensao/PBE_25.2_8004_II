sequenceDiagram
autonumber
actor Usuário
participant UI as Interface (Login)
participant Auth as AuthContext/Service
participant API as API Backend
participant Router as Router

Usuário->>UI: Abrir /login
Usuário->>UI: Preenche usuário e senha\nEscolhe Papel (aluno|professor)
UI->>Auth: login(username, password, role)
Auth->>API: POST /auth/login {user, pass}
API-->>Auth: 200 OK + token + roles
Auth->>Auth: valida role escolhida
Auth-->>UI: sucesso
UI->>Router: redirect\n/aluno ou /professor
Router-->>Usuário: Dashboard correspondente
Usuário->>UI: Clica "Logout"
UI->>Auth: logout()
Auth->>Router: redirect /login

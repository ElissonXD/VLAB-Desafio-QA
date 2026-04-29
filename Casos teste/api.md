### Testes para a API

Essa aba de testes tem como finalidade testar as rotas da API e garantir seu funcionamento correto

---

#### **CT-01: Verificando a página inicial**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/".
* **Resultado Esperado:** O sistema deve retornar status 200, indicando que a página inicial está acessível.

---

#### **CT-02: Verificando a rota de login**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/login" com corpo {username: 'health', password: 'check'}.
* **Resultado Esperado:** O sistema deve retornar status 401, indicando falha na autenticação.

---

#### **CT-03: Verificando a rota de registro**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/register" com corpo {username: 'healthcheck', password: 'healthcheck', email: 'healthcheck'}.
* **Resultado Esperado:** O sistema deve retornar status 400, indicando dados inválidos no registro.

---

#### **CT-04: Verificando rota de dashboard (não autenticado)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/dashboard".
* **Resultado Esperado:** O sistema deve retornar status 200, permitindo acesso a página de dashboard, porém redirecionando automaticamente para a página inicial, por não estar autenticado.

---

#### **CT-05: Verificando rota de logout**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/logout".
* **Resultado Esperado:** O sistema deve retornar status 200, confirmando o logout.

---

#### **CT-06: Verificando rota de usuário único**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/api/user".
* **Resultado Esperado:** O sistema deve retornar status 404, indicando que o usuário não foi encontrado.

---

#### **CT-07: Verificando rota de usuários (sem admin)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/api/users".
* **Resultado Esperado:** O sistema deve retornar status 403, negando acesso sem permissões administrativas.

---

#### **CT-08: Verificando rota de recuperar senha**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/reset-password" com corpo {username: 'health', newPassword: "check"}.
* **Resultado Esperado:** O sistema deve retornar status 404, indicando que o usuário não foi encontrado.

---

#### **CT-09: Verificando rota de coleta (sem autenticação)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/coleta".
* **Resultado Esperado:** O sistema deve retornar status 200, permitindo acesso à página de coleta, porém redirecionando automaticamente para a página inicial, por não estar autenticado.

---

#### **CT-10: Verificando rota de API de coleta (sem autenticação)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/api/coleta" com corpo vazio.
* **Resultado Esperado:** O sistema deve retornar status 401, negando acesso sem autenticação.

---

#### **CT-11: Verificando rota de API de coleta para lotes (sem autenticação)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição POST para a rota "/api/coleta/lote".
* **Resultado Esperado:** O sistema deve retornar status 401, negando acesso sem autenticação.

---

#### **CT-12: Verificando rota de API de histórico de coletas (sem autenticação)**
* **Pré-condição:** O servidor da API deve estar em execução.
* **Passos:**
    1. Enviar uma requisição GET para a rota "/api/coleta/historico".
* **Resultado Esperado:** O sistema deve retornar status 401, negando acesso sem autenticação.
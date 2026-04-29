### Testes para a página de login

Essa aba de testes tem como finalidade testar a aba de Login e garantir seu funcionamento correto

---

#### **CT-01: Autenticação com credenciais válidas**
* **Pré-condição:** O usuário deve estar na página de login
* **Passos:**
    1. Inserir um nome de usuário que consta da base de dados.
    2. Inserir a senha correspondente a conta do usuário.
    3. Clicar no botão de "Entrar".
* **Resultado Esperado:** O sistema deve permitir o acesso ao usuário, exibir uma mensagem de sucesso e ir para a aba de Dashboard

---

#### **CT-02: Autenticação com Credenciais Inválidas**
* **Pré-condição:** O usuário deve estar na página de login.
* **Passos:**
    1. Inserir um nome de usuário que não consta na base de dados.
    2. Inserir uma senha genérica e clicar no botão "Entrar".
    3. Limpar os campos e inserir um usuário válido, mas com uma senha incorreta.
    4. Clicar no botão "Entrar".
* **Resultado Esperado:** O sistema deve negar o acesso em ambos os casos e exibir uma mensagem genérica de erro. Detalhe: A mensagem
não pode revelar se o usuário ou a senha está incorreto

---

#### **CT-03: Sanitização de Espaços em Branco**
* **Pré-condição:** Estar na página de login e possuir credenciais válidas.
* **Passos:**
    1. Inserir o usuário com espaços no início e no fim, exemplo: `" user "`.
    2. Inserir a senha com espaços no início e no fim, exemplo: `" user123 "`.
    3. Clicar no botão "Entrar".
* **Resultado Esperado:** O sistema recusar o acesso consistimente, exibindo uma mensagem genérica de erro.

---

#### **CT-04: Tentativa de Login com Campos Vazios**
* **Pré-condição:** Estar na página de login.
* **Passos:**
    1. Deixar os campos de "Usuário" e "Senha" totalmente em branco.
    2. Clicar diretamente no botão "Entrar".
* **Resultado Esperado:** O sistema deve bloquear a submissão dos dados e exibir uma mensagem de erro clara indicando a obrigatoriedade do preenchimento.

---

#### **CT-05: Proteção contra Bypass via SQL Injection**
* **Pré-condição:** Estar na página de login.
* **Passos:**
    1. No campo de "Usuário", inserir o payload: `' OR '1'='1`.
    2. Inserir qualquer valor aleatório no campo de senha.
    3. Clicar no botão "Entrar".
* **Resultado Esperado:** O sistema deve sanitizar o input, tratar o código malicioso como texto simples e negar o acesso.

---

#### **CT-06: Proteção após múltiplas tentativas**
* **Pré-condição:** Estar na página de login.
* **Passos:**
    1. Utilizando um usuário válido, insira uma senha incorreta
    2. Clique no botão de "Entrar" 5 vezes
    3. Insira a senha correta
* **Resultado Esperado:** O sistema deve impedir o acesso após essas 5 tentativas, fazendo com que o usuário espere algum tempo para tentar novamente

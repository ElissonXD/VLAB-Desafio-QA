# Bugs encontrados e relatados no Frontend - Dashboard

---

## Bug #1: Exposição Visual da Senha do Usuário na Tela

**Severidade**: Alta

**Categoria**: Segurança 

**Prioridade**: Alta

### Descrição

A interface do dashboard injeta e exibe a senha do usuário autenticado em texto puro diretamente no HTML da página.

### Passos para Reproduzir

1. Faça login na aplicação com qualquer usuário.
2. Observe a seção "Informações do Usuário" no painel principal.
3. A senha estará visível na tela.

### Resultado Esperado

- A senha nunca deve ser retornada para o frontend.

### Resultado Atual

- O código concatena `user.password` diretamente no `innerHTML` da `userDataDiv`.

### Evidências

Arquivo dashboard.js

![alt text](../Prints%20de%20evidências/senhafront.png)

### Impacto

Exposição direta de credenciais, permitindo que qualquer pessoa próxima ou softwares de gravação de tela capturem a senha do usuário.

---

## Bug #2: Segredo Hardcoded no Cliente e Exposição de Dados)

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

A função que carrega todos os usuários possui um token/segredo de administração ("admin123") inserido diretamente no código JavaScript do lado do cliente. Além disso, ela renderiza as senhas de todos os usuários na tela.

### Passos para Reproduzir

1. Inspecione o arquivo `dashboard.js` no navegador.
2. Identifique a query string `?secret=admin123` na chamada `fetch` da função `loadAllUsers()`.
3. Clique em "Carregar Todos os Usuários".

### Resultado Esperado

- Segredos e chaves de API com privilégios administrativos nunca devem ficar no lado do cliente. A autorização deve ser validada via cookie de sessão seguro no backend. A interface não deve renderizar senhas alheias.

### Resultado Atual

- O frontend entrega a "chave mestra" de leitura da API para qualquer pessoa que inspecionar o código e, em seguida, expõe os dados de todo o banco no HTML.

### Evidências

Arquivo dashboard.js

![alt text](../Prints%20de%20evidências/todosuser.png)

### Impacto

Permite que qualquer usuário, mesmo não autenticado, descubra o segredo inspecionando o arquivo JS público e extraia o banco de dados inteiro.

---

## Bug #3: Controle de Acesso Inexistente na Interface

**Severidade**: Alta

**Categoria**: Usabilidade / Controle de Acesso

**Prioridade**: Alta

### Descrição

O HTML do dashboard não faz nenhuma distinção entre usuários comuns e administradores. A seção "Painel Administrativo" e o botão para carregar todos os usuários estão presentes no DOM para qualquer pessoa que acesse a página.

### Passos para Reproduzir

1. Faça login usando uma conta de usuário comum (role "user").
2. Verifique que a seção "Painel Administrativo" está visível e clicável.

### Resultado Esperado

- Elementos administrativos devem ser renderizados condicionalmente apenas se o usuário possuir o `role` adequado.

### Resultado Atual

- A `div.admin-section` está fixa e visível de forma incondicional no arquivo HTML estático.

### Evidências

Arquivo dashboard.html
![alt text](../Prints%20de%20evidências/alluserhtml.png))

### Impacto

Confunde usuários comuns com botões que eles não deveriam acessar e facilita a descoberta de endpoints administrativos por atacantes.

---

## Bug #4: Redirecionamento Cego no Logout

**Severidade**: Média

**Categoria**: Segurança / UX

**Prioridade**: Média

### Descrição

A função `logout()` redireciona o usuário para a página inicial (`/`) de forma incondicional, mesmo que a requisição de logout no backend falhe.

### Passos para Reproduzir

1. No dashboard, desligue a sua conexão com a internet (ou bloqueie a rota `/logout` na aba Network do DevTools) para simular um erro.
2. Clique no botão "Sair".
3. A página será redirecionada para `/`.

### Resultado Esperado

- O redirecionamento só deve ocorrer se a promessa do fetch for bem-sucedida e o servidor confirmar a destruição da sessão.

### Resultado Atual

- O bloco `catch (error)` engole o erro de rede e força o `window.location.href = "/"`, dando a falsa impressão de que o logout foi bem-sucedido.

### Evidências

Arquivo dashboard.js
![alt text](../Prints%20de%20evidências/logouterror.png)

### Impacto

O usuário pode ser redirecionado para a tela de login acreditando que sua sessão foi encerrada com segurança, quando na verdade o cookie/sessão ainda está ativo e vulnerável caso ele abandone o computador.
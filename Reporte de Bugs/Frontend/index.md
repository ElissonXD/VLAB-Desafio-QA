# Bugs encontrados e relatados no Frontend - Página de login, registro e nova senha

---

## Bug #1: Campos obrigatórios sem a tag 'required'

**Severidade**: Baixa

**Categoria**: Lógica / Segurança

**Prioridade**: Média

### Descrição

Os formulários de login, registro e recuperação de senha permitem a submissão no lado do cliente com os campos completamente vazios, pois as tags `<input>` não possuem o atributo nativo `required`.

### Passos para Reproduzir

1. Acesse a página inicial.
2. Tente clicar nos botões "Entrar", "Registrar" ou "Resetar Senha" sem preencher os formulários.
3. A requisição será bloqueada apenas pelo JavaScript ou Backend, não aproveitando a validação nativa do navegador.

### Resultado Esperado

- Todos os campos de input vitais devem conter o atributo `required` no HTML para barrar envios em branco diretamente pelo navegador.

### Resultado Atual

- O envio é processado sem barreira nativa no formulário.

### Evidências

Arquivo index.html
![alt text](Prints de evidências/required.png)

### Impacto

Gera chamadas desnecessárias a funções JavaScript ou à API, diminuindo a eficiência da validação no frontend e prejudicando a experiência do usuário.

---

## Bug #2: Tipo incorreto para o campo de e-mail

**Severidade**: Baixa

**Categoria**: Lógica

**Prioridade**: Baixa

### Descrição

No formulário de registro, o campo destinado ao endereço de e-mail está configurado com `type="text"` em vez de `type="email"`.

### Passos para Reproduzir

1. Vá para a aba "Registrar".
2. No campo "Email", digite um texto qualquer sem o caractere "@".
3. O navegador não alertará sobre o formato inválido antes de chamar o JavaScript.

### Resultado Esperado

- O campo de e-mail deve ser `<input type="email">` para habilitar a validação automática de sintaxe e exibir teclados otimizados em dispositivos móveis.

### Resultado Atual

- O campo é tratado como texto genérico (`<input type="text">`).

### Evidências

Arquivo index.html
![alt text](Prints de evidências/email.png)

### Impacto

Piora a experiência do usuário e permite que erros de digitação passem para a camada de validação via script de forma desnecessária.

---

## Bug #3: Ausência de sanitização básica nos inputs

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

O sistema não utiliza o método `.trim()` para remover espaços em branco no início e no final das strings inseridas pelos usuários na tela de login.

### Passos para Reproduzir

1. Tente realizar o login digitando espaços acidentais antes ou depois do nome de usuário.
2. O sistema validará a string com os espaços incluídos e provavelmente falhará a autenticação.

### Resultado Esperado

- As entradas devem ser higienizadas com `.trim()` antes de serem verificadas ou enviadas ao backend.

### Resultado Atual

- A verificação de `username.length === 0` pode ser burlada se o usuário digitar apenas um espaço, e as credenciais são enviadas sujas.

### Evidências

Arquivo script.js
![alt text](Prints de evidências/trim.png)

### Impacto

Frustração do usuário por falhas de login decorrentes de espaços acidentais invisíveis (comum em "copiar e colar").

---

## Bug #4: Exposição Crítica de Dados no LocalStorage

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

Após o login ou registro bem-sucedido, o script armazena o objeto de usuário retornado pelo backend de forma integral no `localStorage` do navegador.

### Passos para Reproduzir

1. Realize um login ou registro com sucesso.
2. Abra o console do navegador (DevTools) > Application > Local Storage.
3. Verifique a chave "user".

### Resultado Esperado

- Nenhuma informação sensível deve ser salva no `localStorage`. Idealmente, utiliza-se cookies com a flag `HttpOnly` para gerenciar sessões de forma segura.

### Resultado Atual

- Todo o payload do usuário, incluindo dados críticos mapeados do backend, fica gravado no cliente.

### Evidências

Arquivo script.js
![alt text](Prints de evidências/local.png)

### Impacto

Qualquer script malicioso injetado na página pode facilmente ler o `localStorage` e roubar a senha e o e-mail em texto puro do usuário autenticado.

---

## Bug #5: Validações fracas no registro

**Severidade**: Baixa

**Categoria**: Lógica

**Prioridade**: Baixa

### Descrição

- Na função de registro, não existe uma validação adequada para o email e para a senha
- Na etapa de validação que verifica se "Senha" e "Confirmar Senha" são iguais, está sendo utilizado o operador de igualdade solta (`!=`) ao invés da igualdade estrita (`!==`).

### Passos para Reproduzir

1. Inspecione o código da função `register(event)`.

### Resultado Esperado

- Validações adequadas para email (verificar se está no formato correto) e senha (quantidade de caracteres, símbolos, etc.)
- Uso do comparador estrito `!==` para garantir a integridade tanto do valor quanto do tipo em JavaScript.

### Resultado Atual

- Não há validação de email e senha
- Uso do comparador `!=` (que causa coerção de tipo implícita).

### Evidências

Arquivo script.js
![alt text](registro.png)

### Impacto

- Ter uma validação fraca, permite que o sistema aceite emails sem sentido e senhas fracas, prejudicando a segurança do usuário
- Embora campos de input geralmente retornem strings, o uso do comparador não estrito abre brechas para anomalias de tipos e é considerado uma má prática em JavaScript moderno.

---

## Bug #6: Falta de complexidade obrigatória para as novas senhas

**Severidade**: Alta

**Categoria**: Segurança

**Prioridade**: Média

### Descrição

O formulário de redefinição de senha não aplicam regras de complexidade (tamanho mínimo, letras maiúsculas, minúsculas, números e caracteres especiais).

### Passos para Reproduzir

1. Tente alterar a senha de um usuário com a senha "123".
2. O frontend aceita o envio da requisição normalmente.

### Resultado Esperado

- O frontend deve validar a força da senha usando Regex e instruir o usuário antes mesmo de fazer a requisição para o backend.
- Seria interessante uma aba de confirmação para a nova senha

### Resultado Atual

- Nenhuma validação de força de senha existe nas funções `register` ou `resetPassword`.

### Evidências

Arquivo script.js
![alt text](Prints de evidências/novasenha.png)

### Impacto

Facilita que usuários criem credenciais incrivelmente fracas, tornando-as um alvo fácil para ataques de força bruta ou de dicionário.
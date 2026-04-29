# Bugs encontrados e relatados no Backend

---

## Bug #1: Configuração de sessão fraco e com problemas

**Severidade**: Alta

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

Sessão apresenta bugs de configuração:
- Secret fraco
- Secure com valor falso
- Tempo de cookie extenso

### Passos para Reproduzir

Pode ser encontrado no começo do arquivo do servidor

### Resultado Esperado

- O secret deveria ser forte, com uma criptografia, e estar em um arquivo env
- O valor de secure deveria ser true para produção
- O tempo de cookie deveria ser 1 dia, no máximo.

### Resultado Atual

- Secret simples, não criptografado e sem estar em um arquivo env
- Valor falso para secure
- Tempo de cookie de 30 dias

### Evidências

![alt text](./Prints%20de%20evidências/image.png)

### Impacto

[Descreva o impacto do bug nos usuários/sistema]

---

## Bug #2: Problemas com senhas

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

- Senhas estão armazenadas em plaintext, causando risco na segurança dos dados do usuário
- Senhas são fracas, não possuem uma validação forte (como presença de caracteres especiais, números, etc)

### Passos para Reproduzir

Pode ser encontrado no arquivo de usuários do sistema

### Resultado Esperado

- As senhas deviam estar criptografadas por um hash (como o bycrypt)
- As senhas deveriam conter uma verificação rigorosa nas suas criações

### Resultado Atual

- Senhas em plaintext, causando potencial risco a dados dos usuários
- Senhas não são exigentes, podendo ser descobertas

### Evidências

![alt text](./Prints%20de%20evidências/users.png)

### Impacto

Se a base de dados for comprometida, as credenciais de todos os usuários serão roubadas instantaneamente.

---

## Bug #3: Tratamento de entradas no login

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

- Os dados passados de usuário e senha não estão sendo tratados corretamente, estando vulnéravel a ataques de SQL Injection e/ou XSS

### Passos para Reproduzir

1. Envie os dados do login contendo "OR 1 = 1"

### Resultado Esperado

- Os dados recebidos deviam ser limpos e tratar entradas como plaintext, 
evitando ataques

### Resultado Atual

- Os dados recebidos devem ser tratados, para considerar entradas mal-intencionadas como plaintext

### Evidências

![alt text](./Prints%20de%20evidências/logindados.png)

### Impacto

Permite que atacantes contornem o login ou extraiam/destruam dados do banco.

---

## Bug #3: Revelando se o úsuario existe no sistema

**Severidade**: Médio

**Categoria**: Segurança

**Prioridade**: Média

### Descrição

- Senhas estão armazenadas em plaintext, causando risco na segurança dos dados do usuário
- Senhas são fracas, não possuem uma validação forte (como presença de caracteres especiais, números, etc)

### Passos para Reproduzir

Pode ser encontrado no arquivo de usuários do sistema

### Resultado Esperado

- As senhas deviam estar criptografadas por um hash (como o bycrypt)
- As senhas deveriam conter uma verificação rigorosa nas suas criações

### Resultado Atual

- Senhas em plaintext, causando potencial risco a dados dos usuários
- Senhas não são exigentes, podendo ser descobertas

### Evidências

![alt text](./Prints%20de%20evidências/users.png)

### Impacto

[Descreva o impacto do bug nos usuários/sistema]

---

## Bug #4: Probabilidade Crítica no Processo de Autenticação

**Severidade:** Crítico

**Categoria:** Segurança

**Prioridade:** Alta

## Descrição
- O sistema possui uma lógica que permite o login bem-sucedido sem a necessidade da senha correta em aproximadamente 10% das tentativas.

## Passos para Reproduzir
Tente realizar login com um usuário válido e qualquer senha aleatória repetidas vezes.

Em média, a cada 10 tentativas, o acesso será concedido.

## Resultado Esperado
O acesso só deve ser concedido se a senha fornecida corresponder exatamente à armazenada.

## Resultado Atual
O código utiliza Math.random() para conceder acesso se o valor for menor que 0.1.

## Evidências

![alt text](./Prints%20de%20evidências/random.png)

## Impacto
Permite bypass de autenticação por força bruta em pouquíssimas tentativas.

---

## Bug #5: Exposição de Dados Sensíveis na Resposta de Login

**Severidade**: Alta

**Categoria**: Segurança / Privacidade

**Prioridade**: Alta

### Descrição

Ao realizar um login bem-sucedido, o servidor retorna o objeto completo do usuário para o frontend, incluindo senha em texto puro e email.

### Passos para Reproduzir

1. Realize um login com sucesso.
2. Inspecione a resposta JSON enviada pelo servidor.

### Resultado Esperado

- O servidor deve retornar apenas dados não sensíveis necessários (ex: id, username).

### Resultado Atual

- O JSON de resposta inclui os campos de email e senha.

### Evidências

![alt text](./Prints%20de%20evidências/logindados.png)

### Impacto

Exposição de PII e credenciais diretamente no tráfego HTTP.

---

## Bug #6: Rate Limiting Ineficaz no Login

**Severidade**: Média

**Categoria**: Segurança

**Prioridade**: Média

### Descrição

O bloqueio contra tentativas múltiplas de login só ocorre após um número absurdamente alto de tentativas.

### Passos para Reproduzir

1. Dispare requisições de login incorretas repetidas vezes para o mesmo usuário.

### Resultado Esperado

- O bloqueio deveria ocorrer após um número baixo de tentativas (ex: 5 a 10).

### Resultado Atual

- O sistema permite 1000 tentativas antes de bloquear.

### Evidências

![alt text](./Prints%20de%20evidências/1000tentativas.png)

### Impacto

Facilita ataques de força bruta e dictionary attacks.

---

## Bug #7: Validação de Entradas Fraca no Registro

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

A validação de e-mail é extremamente superficial e a comparação de usuário existente usa coerção de tipo fraca.

### Passos para Reproduzir

1. Tente registrar o email `usuario@`.
2. Tente registrar um usuário numérico usando string vs int.

### Resultado Esperado

- Validação com Regex adequado para e-mail e uso estrito de igualdade (`===`).

### Resultado Atual

- Usa `includes("@")` para e-mail e `==` para buscar o usuário.

### Evidências

![alt text](./Prints%20de%20evidências/registrofraco.png)

### Impacto

Permite o registro de dados corrompidos ou em formatos inválidos.

---

## Bug #8: Geração Insegura de IDs e Condição de Corrida

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Baixa

### Descrição

O sistema gera novos IDs baseando-se no tamanho atual do array ou em um contador simples, o que pode gerar IDs duplicados em casos de concorrência ou exclusão.

### Passos para Reproduzir

1. Registre um usuário ou adicione uma coleta simultaneamente com outra requisição.

### Resultado Esperado

- Uso de UUIDs ou IDs gerados de forma segura pelo banco de dados.

### Resultado Atual

- Utiliza o tamanho do array (`+ 1`) ou incremento simples em variáveis globais.

### Evidências

![alt text](./Prints%20de%20evidências/iduser.png)

![alt text](./Prints%20de%20evidências/idcoleta.png)

### Impacto

Risco de colisão de IDs e corrupção de dados.

---

## Bug #9: Autorização Inadequada no Dashboard (Bypass de Admin)

**Severidade**: Alta

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

A rota do dashboard permite acesso baseado apenas em um parâmetro de query string, sem verificar a sessão.

### Passos para Reproduzir

1. Acesse `http://localhost:3000/dashboard?admin=true` sem estar logado.

### Resultado Esperado

- Rota deve exigir sessão válida e validação de permissão no backend.

### Resultado Atual

- O código verifica apenas a presença do parâmetro `admin=true`.

### Evidências

![alt text](./Prints%20de%20evidências/adminquery.png)

### Impacto

Qualquer visitante pode acessar a área autenticada do sistema.

---

## Bug #10: Logout Incompleto e Inseguro

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

A função de logout não destrói a sessão no servidor.

### Passos para Reproduzir

1. Clique em logout.
2. O cookie continua ativo no navegador e a sessão pode ser reaproveitada.

### Resultado Esperado

- Uso de `req.session.destroy()` e limpeza explícita do cookie.

### Resultado Atual

- Apenas altera a variável `req.session.userId` para nulo.

### Evidências

![alt text](./Prints%20de%20evidências/sessao.png)

### Impacto

Risco de sequestro de sessão (Session Hijacking).

---

## Bug #11: Exposição de Dados em API de Usuário

**Severidade**: Alta

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

A rota `/api/user` permite buscar qualquer usuário passando o ID na URL, retornando todos os seus dados.

### Passos para Reproduzir

1. Como usuário logado, acesse `/api/user?userId=1`.

### Resultado Esperado

- Retornar apenas dados do usuário logado na sessão ou ofuscar dados sensíveis de terceiros.

### Resultado Atual

- Busca o ID passado na query string e retorna o objeto completo do banco de dados.

### Evidências

![alt text](./Prints%20de%20evidências/exposiçãouser.png)

### Impacto

Permite a extração de dados de qualquer conta do sistema.

---

## Bug #12: Exposição Total da Base de Dados

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

Existe um endpoint que revela toda a base de usuários.

### Passos para Reproduzir

1. Acesse `GET /api/users?secret=admin123`.

### Resultado Esperado

- A rota não deve existir ou deve exigir autenticação admin rigorosa (não via query string).

### Resultado Atual

- Retorna todos os usuários em plaintext via query string estática.

### Evidências

![alt text](./Prints%20de%20evidências/basedados.png)

### Impacto

Vazamento total da base de dados.

---

## Bug #13: Alteração de Senha Insegura e Revelação de Usuário

**Severidade**: Alta

**Categoria**: Segurança

**Prioridade**: Alta

### Descrição

A rota de reset de senha não exige autenticação e revela se um usuário existe ou não através das respostas. Além disso, a nova senha é armazenada em plaintext

### Passos para Reproduzir

1. Faça POST em `/reset-password` com um `username` qualquer e um `newPassword`.

### Resultado Esperado

- Exigir token de validação e não revelar a existência do usuário em caso de erro.
- Criptografar a nova senha

### Resultado Atual

- Altera a senha diretamente no banco em memória ou devolve status 404 se não achar.
- Senha não é criptografada

### Evidências

![alt text](./Prints%20de%20evidências/reset.png)

### Impacto

Qualquer um pode alterar a senha de qualquer conta do sistema instantaneamente. Enumeração de usuários possível. Além da falta de segurança dos dados armazenados

---

## Bug #14: Falta de Validação em Coletas

**Severidade**: Baixa

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

O endpoint `/api/coleta` aceita dados inválidos ou fora de limites para os indicadores.

### Passos para Reproduzir

1. Submeta uma coleta com os indicadores vazios ou contendo letras.

### Resultado Esperado

- Validação rigorosa dos tipos numéricos e seus respectivos limites.

### Resultado Atual

- Salva os dados processando superficialmente com `parseFloat`, permitindo valores `NaN`.

### Evidências

![alt text](./Prints%20de%20evidências/idcoleta.png)

### Impacto

Corrupção na base de dados de coletas.

---

## Bug #15: Falha de Filtragem no Histórico de Coletas

**Severidade**: Alta

**Categoria**: Privacidade

**Prioridade**: Alta

### Descrição

O histórico retorna coletas de todos os usuários do sistema, ao invés de filtrar apenas pelas do usuário atual.

### Passos para Reproduzir

1. Acesse `/api/coleta/historico` logado como um usuário comum após outra pessoa ter registrado coletas.

### Resultado Esperado

- Filtrar as coletas pelo usuário da sessão.

### Resultado Atual

- Atribui toda a base de coletas para a resposta da API.

### Evidências

![alt text](./Prints%20de%20evidências/todascoletas.png)

### Impacto

Violação de privacidade dos dados registrados.

---

## Bug #16: Funcionalidade Falsa (Lote de Coletas)

**Severidade**: Baixa

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

- A rota de submissão em lote não faz o processamento e inserção dos dados, retornando apenas uma resposta falsa.
- O processamento, também, não faz a verificação de duplicatas corretamente

### Passos para Reproduzir

1. Envie um lote de coletas para `/api/coleta/lote`.

### Resultado Esperado

- Processar, validar e adicionar as coletas reais no array.

### Resultado Atual

- Retorna um número randomizado fingindo que inseriu as coletas, sem alterar a base.

### Evidências

![alt text](./Prints%20de%20evidências/planilha.png)

### Impacto

Perda de dados enviados pelo cliente.

---

## Bug #17: Falta de Integrity Check

**Severidade**: Baixa

**Categoria**: Lógica

**Prioridade**: Baixa

### Descrição

A rota `/health` não realiza nenhuma verificação de integridade do sistema. Ela retorna um status positivo estático, ignorando o estado real das dependências.

### Passos para Reproduzir

1. Acesse o endpoint `GET /health`.
2. Verifique que o status "ok" é retornado independentemente de qualquer falha interna que possa estar ocorrendo na aplicação.

### Resultado Esperado

- O endpoint deveria testar as conexões vitais do sistema e retornar "ok" apenas se todos os serviços essenciais estiverem íntegros.

### Resultado Atual

- O sistema retorna `status: "ok"` de forma fixa, o que gera falsos positivos em ferramentas de monitoramento.

### Evidências

![alt text](./Prints%20de%20evidências/integridade.png)

### Impacto

Ferramentas de monitoramento e balanceadores de carga podem rotear tráfego para uma instância que está com o banco de dados quebrado, pois o health check falsamente afirma que a aplicação está saudável.
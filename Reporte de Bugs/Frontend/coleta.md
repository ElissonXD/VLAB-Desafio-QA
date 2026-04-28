# Bugs encontrados e relatados no Frontend - Coleta

---

## Bug #1: Ausência do atributo 'required' nos formulários

**Severidade**: Baixa

**Categoria**:Lógica

**Prioridade**: Média

### Descrição

Nenhum dos campos essenciais do formulário de coleta individual possui a propriedade nativa `required`, permitindo que a submissão inicial burle o navegador.

### Passos para Reproduzir

1. Acesse a aba "Coleta Individual".
2. Tente clicar no botão "Submeter Coleta" ou "Pré-visualizar" com o formulário em branco.
3. Nenhuma mensagem nativa do navegador de "Preencha este campo" é exibida.

### Resultado Esperado

- O formulário deveria contar com a tag `required` em todos os inputs essenciais para fornecer um feedback rápido e nativo antes do processamento via JavaScript.

### Resultado Atual

- O evento de submit é disparado e a responsabilidade de bloquear campos vazios fica inteiramente no JavaScript.

### Evidências

Arquivo coleta.html
![alt text](../Prints%20de%20evidências/reqhtml.png)

### Impacto

Reduz a eficiência da validação no frontend e prejudica a experiência do usuário, além de exigir lógica extra no JS.

---

## Bug #2: Falta de restrições nos indicadores

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Alta

### Descrição

Os campos numéricos de indicadores não possuem validação de limites nem no HTML e nem no JavaScript, aceitando valores absurdos.

### Passos para Reproduzir

1. No formulário de coleta, digite "-500" no campo "Taxa de Conclusão (%)".
2. Digite "999" na "Nota de Avaliação (0-10)".
3. Submeta a coleta.

### Resultado Esperado

- O HTML deveria ter propriedades como `min="0" max="100"` para porcentagens, e o JS deveria validar se os números estão dentro da regra de negócio esperada.

### Resultado Atual

- O frontend aceita e envia para a API qualquer valor numérico inserido pelo usuário.

### Evidências

![alt text](../Prints%20de%20evidências/limites.png)

### Impacto

Corrupção total da integridade dos dados no sistema. Os relatórios gerados a partir desses indicadores ficarão completamente incorretos.

---

## Bug #3: Tratamento de espaços nulos e comparação fraca no JS

**Severidade**: Média

**Categoria**: Lógica

**Prioridade**: Média

### Descrição

A validação dos campos de texto no JavaScript verifica apenas se a string é igual a vazio (`== ""`), não utilizando o comparador estrito (`===`) e esquecendo do tratamento com `.trim()`.

### Passos para Reproduzir

1. Digite três espaços em branco no campo em todos os campos obrigatórios.
2. Clique em Submeter. 

### Resultado Esperado

- O sistema deveria usar `.trim()` para remover espaços em branco e impedir a submissão de campos aparentemente "preenchidos" apenas com espaços.

### Resultado Atual

- Os condicionais são contornados pelos espaços e o cadastro é enviado com sucesso.

### Evidências

![alt text](../Prints%20de%20evidências/trimval.png)

### Impacto

Gera registros "fantasma" no banco de dados, com IDs e Nomes compostos apenas de espaços, dificultando o rastreamento e quebrando a interface.

---

## Bug #4: Ausência de validação de arquivo no upload em lote

**Severidade**: Média

**Categoria**: Segurança / Lógica

**Prioridade**: Média

### Descrição

A funcionalidade de "Coleta em Lote" verifica apenas se existe um arquivo selecionado, mas não valida se a extensão, o tipo CSV ou o tamanho do arquivo  são permitidos antes de fazer a requisição.

### Passos para Reproduzir

1. Acesse a aba "Coleta em Lote".
2. Selecione um arquivo executável pesado (ex: um `.exe` de 1GB).
3. Clique em "Fazer Upload".

### Resultado Esperado

- O JavaScript deveria abortar o envio se o arquivo fosse maior que um limite estipulado (10MB) ou se não possuísse a extensão CSV correta.

### Resultado Atual

- O arquivo é enviado diretamente para o servidor, gastando banda e possivelmente derrubando a API caso seja um arquivo gigantesco.

### Evidências

![alt text](../Prints%20de%20evidências/fileval.png)

### Impacto

Vulnerabilidade a negação de serviço no cliente/servidor devido ao upload de arquivos gigantescos e envio de arquivos maliciosos à API.

---

## Bug #5: Vulnerabilidade Crítica de XSS no Histórico

**Severidade**: Crítico

**Categoria**: Segurança

**Prioridade**: Urgente

### Descrição

A função `loadHistorico` constrói o HTML da listagem de coletas concatenando os dados recebidos da API diretamente usando `innerHTML`, sem qualquer sanitização.

### Passos para Reproduzir

1. Usando a API, insira uma coleta onde o `beneficiarioNome` seja: `<img src="x" onerror="alert('Fui Hackeado!')">`
2. Acesse a aba "Histórico" e clique em "Carregar Histórico".
3. O script malicioso será executado imediatamente no seu navegador.

### Resultado Esperado

- Dados dinâmicos injetados no DOM devem ser inseridos através de `textContent` ou `innerText`, ou higienizados com bibliotecas de sanitização antes de usar `innerHTML`.

### Resultado Atual

- Qualquer HTML/JavaScript malicioso armazenado na base de dados será renderizado e executado pelo navegador de todos os usuários que abrirem o histórico.

### Evidências

![alt text](../Prints%20de%20evidências/xsshist.png)

### Impacto

Roubo de sessão de todos os usuários do sistema, já que o script injetado pode acessar o `localStorage` onde o objeto do usuário está salvo, enviando os dados para o atacante.
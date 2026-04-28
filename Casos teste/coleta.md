### Testes para a página de coleta

Essa aba de testes tem como finalidade testar a aba de coleta e garantir seu funcionamento correto

---

#### **CT-01: Registro de Coleta com Dados Válidos**
* **Pré-condição:** O usuário deve estar autenticado e na página de formulário de coleta.
* **Passos:**
    1. Preencher o campo "ID do Beneficiário" com um identificador válido.
    2. Preencher "Nome Completo" com `João da Silva`.
    3. Inserir indicadores válidos: Taxa de Conclusão (`85`), Frequência (`90`), Nota (`8.5`) e Progresso (`10`).
    4. Clicar no botão **"Submeter Coleta"**.
* **Resultado Esperado:** O sistema deve processar as informações e exibir a mensagem "Coleta registrada com sucesso!" e armazenar os registros.

---

#### **CT-02: Registro com Dados do Beneficiário Incompletos**
* **Pré-condição:** O usuário deve estar na página de coleta.
* **Passos:**
    1. Deixar o campo "ID do Beneficiário" vazio e preencher o "Nome Completo".
    2. Alternativamente, preencher o ID e deixar o "Nome Completo" vazio, ou vice-versa.
    3. Preencher todos os outros campos de avaliação normalmente.
    4. Clicar no botão **"Submeter Coleta"**.
* **Resultado Esperado:** O sistema deve impedir a submissão e exibir a mensagem de erro: "ID e Nome do beneficiário são obrigatórios.".

---

#### **CT-03: Registro com Dados de Avaliação Incompletos**
* **Pré-condição:** O usuário deve estar na página de coleta.
* **Passos:**
    1. Preencher corretamente o ID e o Nome do Beneficiário.
    2. Deixar pelo menos um dos campos de indicadores (Taxa, Frequência, Nota ou Progresso) vazio.
    3. Clicar no botão **"Submeter Coleta"**.
* **Resultado Esperado:** O sistema deve exibir o alerta: "Todos os campos de avaliação são obrigatórios.".

---

#### **CT-04: Registro de Coleta com Valores Inválidos**
* **Pré-condição:** O usuário deve estar na página de coleta.
* **Passos:**
    1. Preencher os dados do beneficiário corretamente.
    2. Inserir valores fora do intervalo permitido nos indicadores (ex: Taxa de Conclusão `150` ou Nota `-5`).
    3. Inserir caracteres não numéricos em campos que esperam números.
    4. Clicar no botão **"Submeter Coleta"**.
* **Resultado Esperado:** O sistema deve validar os tipos e intervalos de dados e exibir a mensagem: "Valores de avaliação inválidos.".

---

#### **CT-05: Visualização do Preview de Coleta**
* **Pré-condição:** O usuário deve estar na página de coleta.
* **Passos:**
    1. Preencher todos os campos de coleta com dados válidos.
    2. Clicar no botão **"Preview Coleta"**.
* **Resultado Esperado:** O sistema deve exibir o preview da coleta corretamente.

---

#### **CT-06: Submissão de Coleta em Lote via Arquivo CSV**
* **Pré-condição:** O usuário deve estar na seção de "Coleta em Lote" e possuir um arquivo `.csv` formatado corretamente.
* **Passos:**
    1. Clicar em "Escolher arquivo" e selecionar um CSV contendo 7 registros válidos.
    2. Clicar no botão **"Fazer upload"**.
* **Resultado Esperado:** O sistema deve processar o arquivo e exibir a mensagem: "7 coletas registradas com sucesso!" e armazenar os registros.

---

#### **CT-07: Submissão de Lote sem Arquivo Selecionado**
* **Pré-condição:** O usuário deve estar na seção de "Coleta em Lote".
* **Passos:**
    1. Clicar no botão **"Fazer upload"** sem selecionar um arquivo.
* **Resultado Esperado:** O sistema deve exibir a mensagem de erro: "Selecione um arquivo".

---

#### **CT-08: Submissão de Lote com Registros Duplicados**
* **Pré-condição:** Estar na seção de "Coleta em Lote".
* **Passos:**
    1. Selecionar um arquivo CSV contendo 3 registros, onde 2 linhas possuem dados idênticos (duplicatas).
    2. Clicar em **"Fazer upload"**.
* **Resultado Esperado:** O sistema deve processar os registros únicos e ignorar as duplicatas, exibindo: "2 coletas registradas!" e armazenar os registros não duplicados

---

#### **CT-09: Consulta ao Histórico de Coletas**
* **Pré-condição:** O usuário deve ter realizado pelo menos uma coleta previamente.
* **Passos:**
    1. Acessar a aba ou seção de **"Histórico"**.
    2. Clicar no botão **"Carregar Histórico"**.
* **Resultado Esperado:** O sistema deve exibir uma lista ou tabela contendo ID do beneficiário, Nome, Data da coleta, Status e Observações das coletas realizadas pelo próprio usuário.

---

#### **CT-10: Logout do Sistema**
* **Pré-condição:** O usuário deve estar logado no sistema.
* **Passos:**
    1. Clicar no botão "Sair".
* **Resultado Esperado:** O sistema deve deslogar o usuário e redirecionar para a página de login.

---

#### **CT-11: Submissão de Planilha com Tamanho Excedente**
* **Pré-condição:** O usuário deve estar na seção de "Coleta em Lote".
* **Passos:**
    1. Tentar realizar o upload de um arquivo CSV que possua tamanho superior a 10MB.
* **Resultado Esperado:** O sistema deve bloquear o upload imediatamente e exibir a mensagem: "Arquivo muito grande. Limite: 10MB.".
* **Critério de Sucesso:** O servidor não deve processar arquivos que coloquem em risco a estabilidade do sistema por tamanho excessivo.

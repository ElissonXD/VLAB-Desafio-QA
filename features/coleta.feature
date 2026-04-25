language: pt

Funcionalidade: Coleta de Dados
  Como usuário autenticado
  Quero registrar coletas de dados
  Para acompanhar o progresso dos beneficiários

  Contexto:
    Dado que estou autenticado como "user"
    E estou na página do dashboard

  Cenário: Acessar página de coleta
    Quando clico no botão "Coleta de Dados"
    Então devo ser redirecionado para a página de coleta

  Cenário: Registrar coleta com sucesso
    Dado que estou na página de coleta
    Quando preencho os campos obrigatórios:
      | Campo                | Valor              |
      | ID do Beneficiário   | 12345              |
      | Nome Completo        | João da Silva      |
      | Taxa de Conclusão   | 85                 |
      | Frequência           | 50                 |
      | Nota                 | 8                  |
      | Progresso            | 10                 |
      | Observações          | Teste de coleta    |
      | Status               | Concluído          |
    E clico no botão "Submeter Coleta"
    Então devo ver a mensagem "Coleta registrada com sucesso!"

  Cenário: Registrar coleta com dados do beneficiário incompletos
    Dado que estou na página de coleta
    Quando deixo o campo "ID do Beneficiário" ou "Nome Completo" vazio
    E preencho os demais campos
    E clico no botão "Submeter Coleta"
    Então devo ver a mensagem de erro "ID e Nome do beneficiário são obrigatórios."

  Cenário: Registrar coleta com dados de avaliação incompletos
    Dado que estou na página de coleta
    Quando preencho "ID do Beneficiário" e "Nome Completo"
    Mas deixo algum campo de avaliação vazio
    E clico no botão "Submeter Coleta"
    Então devo ver a mensagem de erro "Todos os campos de avaliação são obrigatórios."

  Cenário: Pré-visualizar dados antes de submeter
    Dado que estou na página de coleta
    Quando preencho todos os campos da coleta
    E clico no botão "Pré-visualizar"
    Então devo ver uma pré-visualização em JSON dos dados

  Cenário: Submeter coleta com valores inválidos
    Dado que estou na página de coleta
    Quando preencho valores fora dos intervalos permitidos
    E clico no botão "Submeter Coleta"
    Então devo ver a mensagem de erro "Valores de avaliação inválidos."

  Cenário: Tentar acessar coleta sem autenticação
    Dado que não estou autenticado
    Quando tento acessar a página de coleta
    Então devo ser redirecionado para o login

  Cenário: Submeter coleta em lote
    Dado que estou na página de coleta
    Quando vou para "Coleta em Lote"
    E seleciono um arquivo CSV válido com 7 registros
    E clico em "Fazer upload"
    Então devo ver "7 coletas registradas com sucesso!"

  Cenário: Submeter lote com dados inválidos
    Dado que estou na página de coleta
    Quando seleciono um CSV com dados inválidos
    E clico em "Fazer upload"
    Então devo ver "Dados inválidos no arquivo."

  Cenário: Submeter arquivo muito grande
    Dado que estou na página de coleta
    Quando seleciono um CSV maior que 10MB
    Então devo ver "Arquivo muito grande. Limite: 10MB." e o upload não ocorre

  Cenário: Submeter lote com duplicatas
    Dado que estou na página de coleta
    Quando seleciono um CSV com 4 registros, sendo 2 duplicados
    E clico em "Fazer upload"
    Então devo ver "3 coletas registradas! 1 ignorada por duplicata."

  Cenário: Consultar histórico de coletas
    Dado que estou na página de coleta
    Quando vou para "Histórico"
    E clico em "Carregar Histórico"
    Então devo ver a lista de coletas do usuário, com ID, nome, data, status e observações.
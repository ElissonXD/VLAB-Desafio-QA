# Desafio Técnico de QA - VLAB

Este repositório contém a entrega do desafio técnico para a vaga de testes de software da VLAB. O objetivo do projeto foi auditar a [aplicação base](https://github.com/nuneslg/Desafio-QA), mapear cenários, documentar falhas e implementar testes automatizados E2E utilizando Cypress.

A análise engloba relatórios formais de bugs, casos de teste detalhados, cenários em formato BDD e a cobertura automatizada da aplicação.

---

## Estrutura do Projeto

```text
├── Documentação/
│   ├── Casos teste/         # Casos de teste positivos e negativos detalhados
│   └── features/            # Arquivos .feature escritos em Gherkin (BDD)
├── Reporte de Bugs/
│   ├── Frontend/            # Bugs visuais e de comportamento no navegador
│   ├── Backend.md           # Falhas de API, segurança e regras de negócio
│   └── Prints de evidências/# Screenshots comprovando as falhas reportadas
├── cypress/
│   ├── e2e/                 # Scripts de automação de testes (Login, Coleta, API)
│   ├── fixtures/            # Massa de dados para os testes
│   ├── pages/               # Implementação do padrão Page Objects
│   └── support/             # Comandos customizados do Cypress
├── public/                  # Arquivos estáticos da aplicação base
├── .gitignore
├── Dockerfile               # Configuração para rodar a aplicação em container
├── docker-compose.yml       # Orquestração da aplicação + Cypress
├── README.md
├── package-lock.json        # Pacotes
├── package.json             # Pacotes
├── server.js                # Servidor da aplicação
└── cypress.config.js        # Configurações globais do framework de teste
```
## Documentação e Planejamento
Na pasta `Documentação`, encontra-se o planejamento da qualidade do sistema:

- **Casos de Teste**: Foram elaborados 6 casos para o módulo de Login, 11 para o módulo de Coleta e 12 para validação de API. Todos contemplam caminhos felizes e testes negativos.

- **BDD**: Descrição do comportamento esperado pelo sistema em linguagem natural, servindo como base para os testes automatizados.

## Reporte de Bugs
Na pasta `Reporte de Bugs`, estão documentadas todas as falhas encontradas no sistema, separadas por contexto e acompanhadas de prints.
Ao todo, foram mapeados 33 bugs:

- 18 no **Backend**.

- 15 no **Frontend**:
  - 5 no módulo de coleta.
  - 4 no módulo de dashboard.
  - 6 no módulo index.

## Automação com Cypress

Os testes E2E foram desenvolvidos focando em manutenibilidade e arquitetura limpa. Os scripts cobrem:
- **Módulo de Login:** Validação de acesso, campos obrigatórios e resiliência contra injeção de código.
- **Módulo de Coleta:** Verificação de integridade de dados e limites de campos.
- **Testes de API:** Health check para garantir que a infraestrutura responde corretamente antes de testar a interface.

*Observação: Há comentários no código indicando quais asserts falham propositalmente como reflexo dos bugs mapeados na aplicação base.*

---

## Como Executar o Projeto

O projeto pode ser executado localmente via Node.js ou através de containers isolados utilizando Docker.

### Opção 1: Rodando via Node.js e NPM

1. Instale as dependências:
   `npm install`
2. Inicie a aplicação base na porta 3000:
   `npm start`
3. Com o servidor rodando, escolha como executar os testes:
   - **Para rodar todos os testes em background:**

     ```bash
     npx cypress run
     ```
   - **Para rodar um módulo específico:**

     ```bash
     npx cypress run --spec 'cypress/e2e/coleta.cy.js
     ```
   - **Para abrir a interface visual do Cypress:**

     ```bash
     npx cypress open
     ```

### Opção 2: Rodando via Docker (Recomendado)

O arquivo `docker-compose.yml` está configurado para subir a aplicação e o ambiente de testes de forma orquestrada.

- **Para rodar a bateria de testes uma única vez:**
  Este comando sobe a aplicação, aguarda ela estar disponível, executa todos os testes do Cypress e finaliza o processo entregando o log no terminal.

  ```bash
  docker-compose up --build --exit-code-from cypress
  ```

---

## 📌 Limitações e Melhorias Futuras

Devido ao escopo e tempo de entrega, alguns pontos foram priorizados na arquitetura de testes, deixando margem para as seguintes melhorias:
- Os testes automatizados E2E para o fluxo de **Registro** foram mapeados na documentação, mas não foram implementados em código nesta versão.
- A suíte de Health Check de API está funcional, mas os cenários em Gherkin para ela não foram documentados.
- Testes automatizados de **Acessibilidade** não foram implementados.

---
*Desenvolvido por ElissonXD.*

import ColetaPage from "../pages/coletaPage"
import LoginPage from "../pages/loginPage"

describe('Testes de coleta', () => {
  
  const coletaPage = new ColetaPage()
  const loginPage = new LoginPage()
  
  beforeEach(() => {
    loginPage.visit()
    loginPage.fillEmail('user')
    loginPage.fillPassword('user123')
    loginPage.submit()
    coletaPage.visit()
  })

  it('Deve realizar uma coleta com sucesso', () => {
    const validData = cy.fixture('coleta').then((data) => {
      coletaPage
        .fillId(data.validSubmission.beneficiarioId)
        .fillNome(data.validSubmission.nomeBeneficiario)
        .fillIndicadorConclusao(data.validSubmission.taxaConclusão)
        .fillIndicadorFrequencia(data.validSubmission.freuquência)
        .fillIndicadorNota(data.validSubmission.notaAvaliação)
        .fillIndicadorProgresso(data.validSubmission.progresso)
        .fillObservacoes(data.validSubmission.observacoes)
        .selectStatus(data.validSubmission.status)
        .clickSubmitColeta();
      })
    
      coletaPage.getColetaMessage().invoke('text').should('match', /Coleta submetida com sucesso/i);
    })

  it("Deve mostrar erro ao tentar submeter coleta sem ID ou Nome", () => {
    const invalidData = cy.fixture('coleta').then((data) => {
      coletaPage
        .fillIndicadorConclusao(data.invalidSubmission.taxaConclusão)
        .fillIndicadorFrequencia(data.invalidSubmission.freuquência)
        .fillIndicadorNota(data.invalidSubmission.notaAvaliação)
        .fillIndicadorProgresso(data.invalidSubmission.progresso)
        .fillObservacoes(data.invalidSubmission.observacoes)
        .selectStatus(data.invalidSubmission.status)
        .clickSubmitColeta();
    })
  
    coletaPage.getColetaMessage().invoke('text').should('match', /ID e Nome do beneficiário são obrigatórios/i);
  
  })
})
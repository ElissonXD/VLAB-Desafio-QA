import ColetaPage from "../pages/coletaPage"
import LoginPage from "../pages/loginPage"
import coletaData from "../fixtures/coleta.json"

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

  //ABA INDIVIDUAL

  it('Deve realizar uma coleta com sucesso', () => {

      coletaPage.fillLabels(coletaData).clickSubmitColeta();
    
      coletaPage.getColetaMessage().invoke('text').should('match', /Coleta submetida com sucesso/i);
    })

  it("Deve mostrar erro ao tentar submeter coleta sem ID ou Nome", () => {
    const invalidData = {...coletaData, id: "", nome: ""}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()

    coletaPage.getColetaMessage().invoke('text').should('match', /ID e Nome do beneficiário são obrigatórios/i);
  
  })

  it("Deve mostrar erro ao tentar submeter coleta sem indicadores principais", () => {
    const invalidData = {...coletaData, indicadorConclusao: "", indicadorFrequencia: "", indicadorNota: ""}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()

    coletaPage.getColetaMessage().invoke('text').should('match', /Todos os indicadores principais são obrigatórios/i);
  })

  it("Deve mostrar erro ao tentar submeter coleta com valores fora do intervalo", () => {
    const invalidData = {...coletaData, indicadorConclusao: "150", indicadorFrequencia: "-10", indicadorNota: "200"}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()
    coletaPage.getColetaMessage().invoke('text').should('match', /Valores de indicadores inválidos/i);
  })

  it("Deve mostrar o preview de coleta corretamente", () => {
    const validData = {...coletaData}
    coletaPage.fillLabels(validData).clickPreviewColeta()

    coletaPage.getColetaPreview().should('be.visible')
  })

  // ABA DE LOTE

  it("Deve realizar upload de arquivo de lote com sucesso", () => {
    const filepath = 'cypress/fixtures/lote_test.csv'
    coletaPage.clickTabLote()
    coletaPage.uploadArquivoLote(filepath).clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /3 registros inseridos com sucesso!/i);
  })

  it("Deve mostrar erro ao tentar realizar upload de arquivo de lote sem selecionar um arquivo", () => {
    coletaPage.clickTabLote()
    coletaPage.clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /Selecione um arquivo/i);
  })

  it("Deve realizar a validação de duplicatas corretamente",  () => {
    const filepath = 'cypress/fixtures/lote_test.csv'
    coletaPage.clickTabLote()
    coletaPage.uploadArquivoLote(filepath).checkValidarDuplicatas().clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /2 registros inseridos com sucesso!/i);
  })

  // ABA DE HISTÓRICO

  it("Deve carregar o histórico de coletas corretamente", () => {
    coletaPage.clickTabHistorico()
    coletaPage.clickCarregarHistorico()

    coletaPage.getHistoricoData().should('be.visible')
  })

  // ABA DE LOGOUT

  it("Deve realizar logout corretamente", () => {
    coletaPage.clickLogout()
    cy.url().should('include', '/')
  })
})
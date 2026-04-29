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

  //TESTES POSITIVOS

  it('CT-01: Deve realizar uma coleta com sucesso', () => {

      coletaPage.fillLabels(coletaData).clickSubmitColeta();
    
      coletaPage.getColetaMessage().invoke('text').should('match', /Coleta submetida com sucesso/i);
    })

  //TESTES NEGATIVOS

  it("CT-02: Deve mostrar erro ao tentar submeter coleta sem ID ou Nome", () => {
    const invalidData = {...coletaData, id: "", nome: ""}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()

    coletaPage.getColetaMessage().invoke('text').should('match', /ID e Nome do beneficiário são obrigatórios/i);
  
  })

  it("CT-03: Deve mostrar erro ao tentar submeter coleta sem indicadores principais", () => {
    const invalidData = {...coletaData, indicadorConclusao: "", indicadorFrequencia: "", indicadorNota: ""}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()

    coletaPage.getColetaMessage().invoke('text').should('match', /Todos os indicadores principais são obrigatórios/i);
  })

  it("CT-04 (BACKEND: BUG #14, FRONTEND-COLETA: BUG #2): Deve mostrar erro ao tentar submeter coleta com valores fora do intervalo", () => {
    const invalidData = {...coletaData, indicadorConclusao: "150", indicadorFrequencia: "-10", indicadorNota: "200"}
    
    coletaPage.fillLabels(invalidData).clickSubmitColeta()
    coletaPage.getColetaMessage().invoke('text').should('match', /Valores de indicadores inválidos/i);
  })

  it("CT-05: Deve mostrar o preview de coleta corretamente", () => {
    const validData = {...coletaData}
    coletaPage.fillLabels(validData).clickPreviewColeta()

    coletaPage.getColetaPreview().should('be.visible')
  })

  // ABA DE LOTE

  //TESTES POSITIVOS

  it("CT-06: Deve realizar upload de arquivo de lote com sucesso", () => {
    const filepath = 'cypress/fixtures/lote_test.csv'
    coletaPage.clickTabLote()
    coletaPage.uploadArquivoLote(filepath).clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /3 registros inseridos com sucesso!/i);
  })

  //TESTES NEGATIVOS

  it("CT-07: Deve mostrar erro ao tentar realizar upload de arquivo de lote sem selecionar um arquivo", () => {
    coletaPage.clickTabLote()
    coletaPage.clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /Selecione um arquivo/i);
  })

  it("CT-08 (BACKEND: BUG #16): Deve realizar a validação de duplicatas corretamente",  () => {
    const filepath = 'cypress/fixtures/lote_test.csv'
    coletaPage.clickTabLote()
    coletaPage.uploadArquivoLote(filepath).checkValidarDuplicatas().clickSubmitLote()

    coletaPage.getLoteMessage().invoke('text').should('match', /2 registros inseridos com sucesso!/i);
  })

  it("CT-09 (FRONTEND-COLETA: BUG #4): Deve mostrar erro ao tentar realizar upload de arquivo de lote com mais de 10MB", () => {
    const filepath = 'cypress/fixtures/dummy.csv'
    coletaPage.clickTabLote()
    coletaPage.uploadArquivoLote(filepath).clickSubmitLote()
    coletaPage.getLoteMessage().invoke('text').should('match', /Arquivo muito grande/i);
  })

  // ABA DE HISTÓRICO

  // TESTES POSITIVOS

  it("CT-10: Deve carregar o histórico de coletas corretamente", () => {
    coletaPage.clickTabHistorico()
    coletaPage.clickCarregarHistorico()

    coletaPage.getHistoricoData().should('be.visible')
  })

  // ABA DE LOGOUT

  // TESTES POSITIVOS

  it("CT-11: Deve realizar logout corretamente", () => {
    coletaPage.clickLogout()
    cy.url().should('include', '/')
  })
})
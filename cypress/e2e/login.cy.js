import LoginPage from "../pages/loginPage"
import EsqueceuPage from "../pages/EsqueceuPage"

describe('Testes de Login', () => {

  const loginpage = new LoginPage()
  const esqueceuPage = new EsqueceuPage()

  beforeEach(() => {
    loginpage.visit('/')
  })

  // TESTES POSITIVOS

  it('CT-01: Deve realizar login com credenciais corretas', () => {

    loginpage.fillEmail('user')
    loginpage.fillPassword('user123')
    loginpage.submit()

    cy.url().should('include', '/dashboard')
  })

  // TESTES NEGATIVOS

  it("CT-02.1: Deve exibir mensagem de erro ao inserir usuário incorreto", () => {

    loginpage.fillEmail('invaliduser').fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("CT-02.2: Deve exibir mensagem de erro ao inserir senha incorreta", () => {

    loginpage.fillEmail('user').fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("CT-03: Deve aceitar login com espaços em branco nos campos de usuário e/ou senha", () => {

    loginpage.fillEmail(" user ").fillPassword(" user123 ")
    loginpage.submit()
    cy.url().should('include', '/dashboard')

  })

  it("CT-04: Deve exibir mensagem de erro ao deixar campos vazios", () => {
    
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("CT-05:Deve exibir mensagem de erro ao tentar realizar um ataque SQL Injection", () => {
    
    loginpage.fillEmail("' OR '1'='1").fillPassword("' OR '1'='1")
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("CT-06 (BACKEND: BUG #6): Deve bloquear o acesso após 5 tentativas de login com credenciais incorretas", () => {
    
    for (let i = 0; i < 5; i++){
      loginpage.fillEmail('user').fillPassword('invalidpassword')
      loginpage.submit()
    }

    loginpage.fillEmail('user').fillPassword('user123')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })
})
import LoginPage from "../pages/loginPage"
import EsqueceuPage from "../pages/EsqueceuPage"

describe('Testes de Login', () => {

  const loginpage = new LoginPage()
  const esqueceuPage = new EsqueceuPage()

  beforeEach(() => {
    loginpage.visit('/')
  })

  it('Deve realizar login com credenciais corretas', () => {

    loginpage.fillEmail('user')
    loginpage.fillPassword('user123')
    loginpage.submit()

    cy.url().should('include', '/dashboard')
  })

  it("Deve exibir mensagem de erro ao inserir usuário incorreto", () => {

    loginpage.fillEmail('invaliduser').fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve exibir mensagem de erro ao inserir senha incorreta", () => {

    loginpage.fillEmail('user').fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve exibir mensagem de erro ao deixar campos vazios", () => {
    
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve exibir mensagem de erro ao tentar realizar um ataque SQL Injection", () => {
    
    loginpage.fillEmail("' OR '1'='1").fillPassword("' OR '1'='1")
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve rejeitar login com espaços em branco nos campos de usuário e/ou senha", () => {

    loginpage.fillEmail(" user ").fillPassword(" user123 ")
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve bloquear o acesso após 5 tentativas de login com credenciais incorretas", () => {
    
    for (let i = 0; i < 5; i++){
      loginpage.fillEmail('user').fillPassword('invalidpassword')
      loginpage.submit()
    }

    loginpage.fillEmail('user').fillPassword('user123')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve trocar a senha do usuário e realizar login com a nova senha", () => {

    esqueceuPage.visit()
    esqueceuPage.fillEmail('user').fillPassword('newpassword')
    esqueceuPage.submit()

    cy.url().should('include', '/')

    loginpage.fillEmail('user').fillPassword('newpassword')
    loginpage.submit()
    cy.url().should('include', '/dashboard')

  })

})
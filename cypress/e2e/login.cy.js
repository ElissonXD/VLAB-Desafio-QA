import LoginPage from "../pages/loginPage"
import EsqueceuPage from "../pages/EsqueceuPage"

describe('Testes de Login', () => {

  const loginpage = new LoginPage()
  const esqueceuPage = new EsqueceuPage()

  beforeEach(() => {
    loginpage.visit('/')
  })

  it('Deve realizar login com credenciais corretas', () => {

    loginpage.fillemail('user')
    loginpage.fillPassword('user123')
    loginpage.submit()

    cy.url().should('include', '/dashboard')
  })

  it("Deve exibir mensagem de erro ao inserir usuário incorreto", () => {

    loginpage.fillemail('invaliduser')
    loginpage.fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve exibir mensagem de erro ao inserir senha incorreta", () => {

    loginpage.fillemail('user')
    loginpage.fillPassword('invalidpassword')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve exibir mensagem de erro ao deixar campos vazios", () => {
    
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve exibir mensagem de erro ao tentar realizar um ataque SQL Injection", () => {
    
    loginpage.fillemail("' OR '1'='1")
    loginpage.fillPassword("' OR '1'='1")
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve rejeitar login com espaços em branco nos campos de usuário e/ou senha", () => {

    loginpage.fillemail(" user ")
    loginpage.fillPassword(" user123 ")
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')

  })

  it("Deve bloquear o acesso após 5 tentativas de login com credenciais incorretas", () => {
    
    for (let i = 0; i < 5; i++){
      loginpage.fillemail('user')
      loginpage.fillPassword('invalidpassword')
      loginpage.submit()
    }

    loginpage.fillemail('user')
    loginpage.fillPassword('user123')
    loginpage.submit()
    loginpage.getErrorMessage().should('be.visible')
  })

  it("Deve trocar a senha do usuário e realizar login com a nova senha", () => {

    esqueceuPage.visit()
    esqueceuPage.fillEmail('user')
    esqueceuPage.fillPassword('newpassword')
    esqueceuPage.submit()

    cy.url().should('include', '/')

    loginpage.fillemail('user')
    loginpage.fillPassword('newpassword')
    loginpage.submit()
    cy.url().should('include', '/dashboard')

  })

})
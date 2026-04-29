describe('Health Check de API', () => {
    it('CT-01: Verificando a página inicial', () => {
        cy.request('GET', '/').its('status').should('eq', 200);
    })

    it('CT-02: Verificando a rota de login', () => {
        cy.request({method: 'POST', url: '/login', 
            failOnStatusCode: false,
        body: {username: 'health', password: 'check'}}).then(
            (res) => expect(res.status).to.eq(401)
        )
    })

    it("CT-03: Verificando a rota de registro", () => {
        cy.request({method: 'POST', url: '/register', 
            failOnStatusCode: false,
        body: {username: 'healthcheck', password: 'healthcheck', email: 'healthcheck'}}).then(
            (res) => expect(res.status).to.eq(400)
        )
    })

    it("CT-04: Verificando rota de dashboard(não autenticado)", () => {
        cy.request('/dashboard').its('status').should('eq', 200)
    })

    it("CT-05: Verificando rota de logout", () => {
        cy.request({method: 'POST', url: '/logout'}).then(
            (res) => expect(res.status).to.eq(200)
        )
    })

    it("CT-06: Verificando rota de usuário único", () => {
        cy.request({method: 'GET', failOnStatusCode: false, url: '/api/user'}).its('status').should('eq', 404)
    })

    it("CT-07: Verificando rota de usuários (sem admin)", () => {
        cy.request({method: 'GET', failOnStatusCode: false, url: '/api/users'}).its('status').should('eq', 403)
    })

    it("CT-08: Verificando rota de recuperar senha", () => {
        cy.request({method: 'POST', failOnStatusCode: false, url: '/reset-password', body: {username: 'health', newPassword: "check"}})
        .then((res) => {expect(res.status).to.eq(404)})
    })

    it("CT-09: Verificando rota de coleta (sem autenticação)", () => {
        cy.request({method: 'GET', failOnStatusCode: false, url: '/coleta'}).then((res) => {expect(res.status).to.eq(200)})
    })

    it("CT-10: Verificando rota de API de coleta (sem autenticação)", () => {
        cy.request({method: 'POST', failOnStatusCode: false, url: '/api/coleta', body: {}}).then((res) => {expect(res.status).to.eq(401)})
    })

    it("CT-11: Verificando rota de API de coleta para lotes (sem autenticação)", () => {
        cy.request({method: 'POST', failOnStatusCode: false, url: '/api/coleta/lote'}).then((res) => {expect(res.status).to.eq(401)})
    })

    it("CT-12: Verificando rota de API de histórico de coletas (sem autenticação)", () => {
        cy.request({method: 'GET', failOnStatusCode: false, url: '/api/coleta/historico'}).then((res) => {expect(res.status).to.eq(401)})
    })
})
class LoginPage{
    visit(){
        cy.visit('/')
    }

    fillemail(value){
        const field = cy.get('input[id="loginUsername"]', { timeout: 10000 })
        field.clear()
        field.type(value)
        return this
    }

    fillPassword(value){
        const field = cy.get('input[id="loginPassword"]', { timeout: 10000 })
        field.clear()
        field.type(value)
        return this
    }

    submit(){
        const button = cy.contains("button", "Entrar", {timeout: 10000})
        button.click()
    }

    getErrorMessage(){
        return cy.get('.message.error', { timeout: 10000 })
    }
}


export default LoginPage
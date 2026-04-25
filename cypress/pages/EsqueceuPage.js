class EsqueceuPage {
    visit(){
        cy.contains('a', 'Esqueceu sua senha?', { timeout: 10000 }).click()
    }

    fillEmail(value){
        const field = cy.get('input[id="resetUsername"]', { timeout: 10000 })
        field.clear()
        field.type(value)
        return this
    }

    fillPassword(value){
        const field = cy.get('input[id="resetNewPassword"]', { timeout: 10000 })
        field.clear()
        field.type(value)
        return this
    }

    submit(){
        const button = cy.contains("button", "Resetar Senha", { timeout: 10000 })
        button.click()
        return this
    }
}

export default EsqueceuPage
class EsqueceuPage {

  elements = {
    forgotPasswordLink: () => cy.contains('a', 'Esqueceu sua senha?'),
    usernameInput: () => cy.get('input[data-testid="reset-username"]'),
    newPasswordInput: () => cy.get('input[data-testid="reset-password"]'),
    submitBtn: () => cy.get('button[data-testid="reset-button"]')
  };

  visit() {
    this.elements.forgotPasswordLink().click();
  }

  fillEmail(value) {
    this.elements.usernameInput()
      .clear()
      .type(value);
    
    return this;
  }

  fillPassword(value) {
    this.elements.newPasswordInput()
      .clear()
      .type(value);
    
    return this;
  }

  submit() {
    this.elements.submitBtn().click();
    return this;
  }
}

export default EsqueceuPage;
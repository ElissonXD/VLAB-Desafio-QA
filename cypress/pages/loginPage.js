class LoginPage {
  
  elements = {
    emailInput: () => cy.get('input[data-testid="login-username"]'),
    passwordInput: () => cy.get('input[data-testid="login-password"]'),
    submitBtn: () => cy.get('button[data-testid="login-button"]'),
    errorMessage: () => cy.get('.message.error')
  };

  visit() {
    cy.visit('/');
  }

  fillEmail(value) {

    this.elements.emailInput()
      .clear()
      .type(value);
    
    return this; 
  }

  fillPassword(value) {
    this.elements.passwordInput()
      .clear()
      .type(value);
    
    return this;
  }

  submit() {
    this.elements.submitBtn().click();
  }

  getErrorMessage() {
    return this.elements.errorMessage();
  }
}

export default LoginPage; 
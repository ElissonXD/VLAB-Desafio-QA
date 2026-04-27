class ColetaPage {
    
    elements = {
        coletaButton: () => cy.get('button[data-testid="link-coleta"]'),
        logoutButton: () => cy.get('button[data-testid="logout-button"]'),
        tabIndividual: () => cy.get('button[data-testid="tab-individual"]'),
        tabLote: () => cy.get('button[data-testid="tab-lote"]'),
        tabHistorico: () => cy.get('button[data-testid="tab-historico"]'),
        beneficiarioId: () => cy.get('input[data-testid="beneficiario-id"]'),
        beneficiarioNome: () => cy.get('input[data-testid="beneficiario-nome"]'),
        indicadorConclusao: () => cy.get('input[data-testid="indicador-conclusao"]'),
        indicadorFrequencia: () => cy.get('input[data-testid="indicador-frequencia"]'),
        indicadorNota: () => cy.get('input[data-testid="indicador-nota"]'),
        indicadorProgresso: () => cy.get('input[data-testid="indicador-progresso"]'),
        observacoes: () => cy.get('textarea[data-testid="observacoes"]'),
        coletaStatus: () => cy.get('select[data-testid="coleta-status"]'),
        submitColeta: () => cy.get('button[data-testid="submit-coleta"]'),
        previewColeta: () => cy.get('button[data-testid="preview-coleta"]'),
        coletaMessage: () => cy.get('div[data-testid="coleta-message"]'),
        coletaPreview: () => cy.get('div[data-testid="coleta-preview"]'),
        arquivoLote: () => cy.get('input[data-testid="arquivo-lote"]'),
        validarDuplicatas: () => cy.get('input[data-testid="validar-duplicatas"]'),
        submitLote: () => cy.get('button[data-testid="submit-lote"]'),
        loteMessage: () => cy.get('div[data-testid="lote-message"]'),
        carregarHistorico: () => cy.get('button[data-testid="carregar-historico"]'),
        historicoData: () => cy.get('div[data-testid="historico-data"]')
    }
    
    visit() {
        cy.visit('/coleta.html');
    }

    // Aba de coleta individual
    fillId(value){
        this.elements.beneficiarioId()
            .clear()
            .type(value);
        return this;
    }

    fillNome(value){
        this.elements.beneficiarioNome()
            .clear()
            .type(value);
        return this;
    }

    fillIndicadorConclusao(value) {
        this.elements.indicadorConclusao().clear().type(value);
        return this;
    }

    fillIndicadorFrequencia(value) {
        this.elements.indicadorFrequencia().clear().type(value);
        return this;
    }

    fillIndicadorNota(value) {
        this.elements.indicadorNota().clear().type(value);
        return this;
    }

    fillIndicadorProgresso(value) {
        this.elements.indicadorProgresso().clear().type(value);
        return this;
    }

    fillObservacoes(value) {
        this.elements.observacoes().clear().type(value);
        return this;
    }

    selectStatus(value) {
        this.elements.coletaStatus().select(value);
        return this;
    }

    clickSubmitColeta() {
        this.elements.submitColeta().click();
        return this;
    }

    clickPreviewColeta() {
        this.elements.previewColeta().click();
        return this;
    }

    getColetaMessage() {
        return this.elements.coletaMessage();
    }

    getColetaPreview() {
        return this.elements.coletaPreview();
    }

    // Aba de lote
    uploadArquivoLote(filePath) {
        this.elements.arquivoLote().selectFile(filePath);
        return this;
    }

    checkValidarDuplicatas() {
        this.elements.validarDuplicatas().check();
        return this;
    }

    uncheckValidarDuplicatas() {
        this.elements.validarDuplicatas().uncheck();
        return this;
    }

    clickSubmitLote() {
        this.elements.submitLote().click();
        return this;
    }

    getLoteMessage() {
        return this.elements.loteMessage();
    }

    // Aba de histórico
    clickCarregarHistorico() {
        this.elements.carregarHistorico().click();
        return this;
    }

    getHistoricoData() {
        return this.elements.historicoData();
    }

    // Navegação
    clickTabIndividual() {
        this.elements.tabIndividual().click();
        return this;
    }

    clickTabLote() {
        this.elements.tabLote().click();
        return this;
    }

    clickTabHistorico() {
        this.elements.tabHistorico().click();
        return this;
    }

    clickLogout() {
        this.elements.logoutButton().click();
        return this;
    }

    clickColetaButton() {
        this.elements.coletaButton().click();
        return this;
    }
}

export default ColetaPage;
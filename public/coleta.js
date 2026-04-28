function showTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".nav-tab");

  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

function previewColeta() {
  const coletaData = {
    beneficiario: {
      id: document.getElementById("beneficiarioId").value,
      nome: document.getElementById("beneficiarioNome").value,
    },
    indicadores: {
      taxaConclusao: document.getElementById("indicador1").value,
      frequencia: document.getElementById("indicador2").value,
      nota: document.getElementById("indicador3").value,
      progresso: document.getElementById("indicador4").value,
    },
    observacoes: document.getElementById("observacoes").value,
    status: document.getElementById("status").value,
    timestamp: new Date().toISOString(),
  };

  const preview = document.getElementById("coletaPreview");
  const previewContent = document.getElementById("previewContent");
  previewContent.textContent = JSON.stringify(coletaData, null, 2);
  preview.style.display = "block";
}

function submitColeta(event) {
  event.preventDefault();

  const beneficiarioId = document.getElementById("beneficiarioId").value;
  const beneficiarioNome = document.getElementById("beneficiarioNome").value;
  const indicador1 = document.getElementById("indicador1").value;
  const indicador2 = document.getElementById("indicador2").value;
  const indicador3 = document.getElementById("indicador3").value;
  const status = document.getElementById("status").value;

  const messageDiv = document.getElementById("coletaMessage");

  //BUG: não ocorre validação de espaços vazios, não ocorre validação de limites de cada campo

  if (beneficiarioId == "" || beneficiarioNome == "") {
    showMessage(
      messageDiv,
      "ID e Nome do beneficiário são obrigatórios",
      "error",
    );
    return;
  }

  if (!indicador1 || !indicador2 || !indicador3) {
    showMessage(
      messageDiv,
      "Todos os indicadores principais são obrigatórios",
      "error",
    );
    return;
  }

  const coletaData = {
    beneficiarioId: beneficiarioId,
    beneficiarioNome: beneficiarioNome,
    indicador1: parseFloat(indicador1),
    indicador2: parseFloat(indicador2),
    indicador3: parseFloat(indicador3),
    indicador4: document.getElementById("indicador4").value || 0,
    observacoes: document.getElementById("observacoes").value,
    status: status || "em_progresso",
    timestamp: new Date().toISOString(),
  };

  fetch("/api/coleta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coletaData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showMessage(
          messageDiv,
          data.message || "Coleta submetida com sucesso!",
          "success",
        );
        document.getElementById("coletaForm").reset();
        document.getElementById("indicadoresForm").reset();
        document.getElementById("coletaPreview").style.display = "none";

        setTimeout(() => {
          messageDiv.style.display = "none";
        }, 3000);
      } else {
        showMessage(
          messageDiv,
          data.message || "Erro ao submeter coleta",
          "error",
        );
      }
    })
    .catch((error) => {
      showMessage(messageDiv, "Erro na requisição: " + error.message, "error");
    });
}

function submitLote(event) {
  event.preventDefault();

  const fileInput = document.getElementById("arquivoCSV");
  const file = fileInput.files[0];
  const messageDiv = document.getElementById("loteMessage");

  if (!file) {
    showMessage(messageDiv, "Selecione um arquivo", "error");
    return;
  }

  const formData = new FormData();
  formData.append("arquivo", file);
  formData.append(
    "validarDuplicatas",
    document.getElementById("validarDuplicatas").checked,
  );

  //BUG: Não valida tipo e nem tamanho do arquivo

  fetch("/api/coleta/lote", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showMessage(
          messageDiv,
          `${data.inseridos} registros inseridos com sucesso!`,
          "success",
        );
        fileInput.value = "";
      } else {
        showMessage(
          messageDiv,
          data.message || "Erro ao fazer upload do arquivo",
          "error",
        );
      }
    })
    .catch((error) => {
      showMessage(messageDiv, "Erro na requisição: " + error.message, "error");
    });
}

function loadHistorico() {
  const historicoDiv = document.getElementById("historicoData");
  historicoDiv.innerHTML = "<p>Carregando...</p>";

  fetch("/api/coleta/historico")
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.coletas.length > 0) {
        let html = "";
        data.coletas.forEach((coleta) => {
          html += `
            <div class="user-card">
              <strong>ID: ${coleta.beneficiarioId}</strong><br>
              Nome: ${coleta.beneficiarioNome}<br>
              Status: ${coleta.status}<br>
              Data: ${new Date(coleta.timestamp).toLocaleString("pt-BR")}<br>
              Indicadores: Taxa ${coleta.indicador1}%, Freq ${coleta.indicador2}%, Nota ${coleta.indicador3}<br>
              Coletado por: ${coleta.usuarioColeta}
            </div>
          `;
        });
        historicoDiv.innerHTML = html;
      } else {
        historicoDiv.innerHTML = "<p>Nenhuma coleta encontrada.</p>";
      }
    })
    .catch((error) => {
      historicoDiv.innerHTML = `<p style="color: red;">Erro ao carregar histórico: ${error.message}</p>`;
    });
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message ${type}`;
  element.style.display = "block";
}

function logout() {
  fetch("/logout", { method: "POST" })
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => console.error("Erro ao fazer logout:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const coletaForm = document.getElementById("coletaForm");
  if (coletaForm) {
    coletaForm.addEventListener("submit", submitColeta);
  }
});

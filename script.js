let profissionalSelecionado = "";
let codigosAtivos = [];
let ultimoCodigoGerado = "";

function abrirAgendamento(nome) {
    profissionalSelecionado = nome;
    exibirSecao("pagina-agendamento");
    document.getElementById("titulo-profissional").innerText = "Agendar com " + nome;
    bloquearDatasPassadas();
}

function finalizarAgendamento(event) {
    event.preventDefault();

    const nome = document.getElementById("nomePaciente").value;
    const data = document.getElementById("dataConsulta").value;
    const hora = document.getElementById("horario").value;
    
    ultimoCodigoGerado = "FT-" + Math.floor(100000 + Math.random() * 900000);
    codigosAtivos.push(ultimoCodigoGerado);

    const resumo = document.getElementById("resumo-agendamento");
    resumo.innerHTML = `
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Especialista:</strong> ${profissionalSelecionado}</p>
        <p><strong>Horário:</strong> ${data} às ${hora}</p>
        <p style="margin-top:10px; color:#0B3D3D; font-size: 1.1em;"><strong>Código: ${ultimoCodigoGerado}</strong></p>
    `;

    exibirSecao("pagina-confirmacao");
    event.target.reset();
}

function irParaCheckin() {
    exibirSecao("pagina-checkin");
    document.getElementById("codigoCheckin").value = ultimoCodigoGerado;
    document.getElementById("area-cancelamento").classList.add("hidden");
    document.getElementById("mensagem-checkin").classList.add("hidden");
}

function confirmarPresenca() {
    const cod = document.getElementById("codigoCheckin").value.trim().toUpperCase();
    const msg = document.getElementById("mensagem-checkin");
    msg.classList.remove("hidden");

    if (codigosAtivos.includes(cod)) {
        msg.innerHTML = "✅ Check-in realizado! Presença confirmada no sistema.";
        msg.className = "sucesso";
        codigosAtivos = codigosAtivos.filter(c => c !== cod);
    } else {
        msg.innerHTML = "❌ Código inválido ou já utilizado.";
        msg.className = "erro";
    }
}

function abrirCancelamento() {
    const cod = document.getElementById("codigoCheckin").value.trim().toUpperCase();
    if (!codigosAtivos.includes(cod)) {
        alert("Por favor, insira um código de agendamento válido primeiro.");
        return;
    }
    document.getElementById("area-cancelamento").classList.remove("hidden");
    document.getElementById("mensagem-checkin").classList.add("hidden");
}

function confirmarCancelamentoFinal() {
    alert("Agendamento cancelado. Esperamos ver você em breve!");
    voltarParaInicio();
}

function exibirSecao(id) {
    const secoes = ["pagina-profissionais", "pagina-agendamento", "pagina-confirmacao", "pagina-checkin"];
    secoes.forEach(s => document.getElementById(s).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function voltarParaInicio() {
    exibirSecao("pagina-profissionais");
}

function bloquearDatasPassadas() {
    const hoje = new Date().toISOString().split("T")[0];
    document.getElementById("dataConsulta").setAttribute("min", hoje);
}
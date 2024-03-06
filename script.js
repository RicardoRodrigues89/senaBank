// Variáveis globais
let contas = null; // Objeto que armazena as contas
let contaAtual = null; // Conta em que o usuário está logado

// Função para carregar dados do arquivo JSON
function carregarDados() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'contas.json', false); // Síncrono para simplificar
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contas = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}

// Função para salvar dados no arquivo JSON
function salvarDados() {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'contas.json', false); // Síncrono para simplificar
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(contas));
}

// Função para exibir o Menu Principal
function exibirMenuPrincipal() {
    document.getElementById('menuPrincipal').style.display = 'block';
    document.getElementById('menuAcessarConta').style.display = 'none';
    document.getElementById('menuCriarConta').style.display = 'none';
    document.getElementById('menuRemoverConta').style.display = 'none';
}

// Função para mostrar alerta
function mostrarAlerta(mensagem) {
    const alertasDiv = document.getElementById('alertas');
    const alerta = document.createElement('div');
    alerta.classList.add('alert', 'alert-danger');
    alerta.textContent = mensagem;
    alertasDiv.appendChild(alerta);
}

// Função para mostrar o formulário de Acessar Conta
function showAcessarContaForm() {
    exibirMenuPrincipal();
    document.getElementById('menuAcessarConta').style.display = 'block';
}

// Função para mostrar o formulário de Criar Conta
function showCriarContaForm() {
    exibirMenuPrincipal();
    document.getElementById('menuCriarConta').style.display = 'block';
}

// Função para mostrar o formulário de Remover Conta
function showRemoverContaForm() {
    exibirMenuPrincipal();
    document.getElementById('menuRemoverConta').style.display = 'block';
}

// Função para esconder todos os menus
function hideAllMenus() {
    document.getElementById('menuAcessarConta').style.display = 'none';
    document.getElementById('menuCriarConta').style.display = 'none';
    document.getElementById('menuRemoverConta').style.display = 'none';
}

// Função para acessar a conta
function acessarConta() {
    const numeroConta = parseInt(document.getElementById('numeroConta').value);
    const senha = document.getElementById('senha').value;

    // Verifica se os campos estão preenchidos
    if (!numeroConta || !senha) {
        mostrarAlerta('Por favor, preencha todos os campos.');
        return;
    }

    // Carrega os dados das contas (simulado)
    carregarDados();

    // Verifica se a conta existe
    const contaEncontrada = contas.contas.find(conta => conta.numero === numeroConta && conta.senha === senha);

    if (contaEncontrada) {
        // Define a conta atual
        contaAtual = contaEncontrada;

        // Exibe o menu de operações da conta
        showMenuOperacoesConta();
    } else {
        // Exibe uma mensagem de erro se a conta não for encontrada
        mostrarAlerta('Conta não encontrada. Verifique o número da conta e a senha.');
    }
}

// Função para exibir o menu de operações da conta
function showMenuOperacoesConta() {
    hideAllMenus();
    document.getElementById('menuOperacoesConta').style.display = 'block';
}

// Função para criar uma nova conta
function criarConta() {
    const novoNumero = parseInt(document.getElementById('novoNumeroConta').value);
    const novaSenha = document.getElementById('novaSenha').value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpfCliente = document.getElementById('cpfCliente').value;

    // Verifica se os campos estão preenchidos
    if (!novoNumero || !novaSenha || !nomeCliente || !cpfCliente) {
        mostrarAlerta('Por favor, preencha todos os campos.');
        return;
    }

    // Cria um novo objeto conta
    const novaConta = {
        numero: novoNumero,
        senha: novaSenha,
        cliente: {
            nome: nomeCliente,
            cpf: cpfCliente
        },
        saldo: 0.0
    };

    // Adiciona a nova conta à lista de contas (simulada)
    if (!contas) {
        contas = {
            contas: []
        };
    }
    contas.contas.push(novaConta);

    // Salva os dados (simulando a persistência em um arquivo JSON)
    salvarDados();

    // Exibe uma mensagem de sucesso
    mostrarAlerta('Conta criada com sucesso.');
}

// Função para remover uma conta
function removerConta() {
    const numeroContaRemover = parseInt(document.getElementById('numeroContaRemover').value);

    // Aqui você pode adicionar a lógica para remover a conta
    // Você pode usar um objeto JavaScript para simular contas, em vez de carregar de um arquivo JSON
    mostrarAlerta('Função "removerConta" não implementada.');
}

// Função para sair (voltar ao Menu Principal)
function sair() {
    // Aqui você pode adicionar a lógica para sair
    window.location.href = 'https://www.google.com';
}

// Chame a função para exibir o Menu Principal no início
hideAllMenus();
document.getElementById('menuPrincipal').style.display = 'block';

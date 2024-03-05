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
}

// Função para exibir o Menu Acessar Conta
function exibirMenuAcessarConta() {
    document.getElementById('menuPrincipal').style.display = 'none';
    document.getElementById('menuAcessarConta').style.display = 'block';
}

// Função para acessar a conta
function acessarConta() {
    carregarDados();

    const numeroConta = parseInt(prompt('Digite o número da conta:'));
    const senha = prompt('Digite a senha:');

    const contaEncontrada = contas.contas.find(conta => conta.numero === numeroConta && conta.senha === senha);

    if (contaEncontrada) {
        contaAtual = contaEncontrada;
        exibirMenuAcessarConta();
    } else {
        alert('Número da conta ou senha incorretos. Tente novamente.');
    }
}

// Função para criar uma nova conta
function criarConta() {
    carregarDados();

    const novoNumero = parseInt(prompt('Digite o número da nova conta:'));
    const novaSenha = prompt('Digite a senha da nova conta:');
    const nomeCliente = prompt('Digite o nome do cliente:');
    const cpfCliente = prompt('Digite o CPF do cliente:');

    const novaConta = {
        numero: novoNumero,
        senha: novaSenha,
        cliente: {
            nome: nomeCliente,
            cpf: cpfCliente
        },
        saldo: 0.0
    };

    contas.contas.push(novaConta);

    salvarDados();
}

// Função para remover uma conta
function removerConta() {
    carregarDados();

    const numeroContaRemover = parseInt(prompt('Digite o número da conta a ser removida:'));
    const indiceContaRemover = contas.contas.findIndex(conta => conta.numero === numeroContaRemover);

    if (indiceContaRemover !== -1) {
        contas.contas.splice(indiceContaRemover, 1);
        salvarDados();
    } else {
        alert('Número da conta não encontrado.');
    }
}

// Função para sair (voltar ao Menu Principal)
function sair() {
    contaAtual = null;
    exibirMenuPrincipal();
}

// Chame a função para exibir o Menu Principal no início
exibirMenuPrincipal();
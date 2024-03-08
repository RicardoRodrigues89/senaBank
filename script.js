// Variáveis globais
let contas = []; // Array que armazena as contas
let contaAtual = null; // Conta em que o usuário está logado

// Função para exibir o Menu Principal
function exibirMenuPrincipal() {
  document.getElementById('menuPrincipal').style.display = 'block';
  document.getElementById('menuAcessarConta').style.display = 'none';
  document.getElementById('menuMinhaConta').style.display = 'none';
  document.getElementById('menuCriarConta').style.display = 'none';
  document.getElementById('menuRemoverConta').style.display = 'none';
}

// Função para mostrar alerta
function mostrarAlerta(mensagem, tipo) {
  const alertasDiv = document.getElementById('alertas');

  // Remove todos os alertas existentes
  while (alertasDiv.firstChild) {
    alertasDiv.removeChild(alertasDiv.firstChild);
  }

  const alerta = document.createElement('div');
  alerta.classList.add('alert');
  if (tipo === 'success') {
    alerta.classList.add('alert-success');
  } else if (tipo === 'danger') {
    alerta.classList.add('alert-danger');
  } else if (tipo === 'info') {
    alerta.classList.add('alert-info');
  }
  alerta.textContent = mensagem;
  alertasDiv.appendChild(alerta);

  // Define um tempo para o alerta desaparecer (por exemplo, 3 segundos)
  setTimeout(function () {
    alerta.remove();
  }, 1000);
}

// Funções para mostrar os formulários de Acessar Conta, Criar Conta e Remover Conta
function showAcessarContaForm() {
  exibirMenuPrincipal();
  document.getElementById('menuAcessarConta').style.display = 'block';
}

function showCriarContaForm() {
  exibirMenuPrincipal();
  document.getElementById('menuCriarConta').style.display = 'block';
}

function showRemoverContaForm() {
  exibirMenuPrincipal();
  document.getElementById('menuRemoverConta').style.display = 'block';
}

// Função para acessar a conta
function acessarConta() {
  const numeroConta = parseInt(document.getElementById('numeroConta').value);
  const senha = document.getElementById('senha').value;

  // Verifica se os campos estão preenchidos
  if (!numeroConta || !senha) {
    mostrarAlerta('Por favor, preencha todos os campos.', 'danger');
    return;
  }

  // Verifica se a conta existe
  const contaEncontrada = contas.find(conta => conta.numero === numeroConta && conta.senha === senha);

  if (contaEncontrada) {
    // Define a conta atual
    contaAtual = contaEncontrada;

    // Exibe o menu de operações da conta
    showMenuMinhaConta();
  } else {
    // Exibe uma mensagem de erro se a conta não for encontrada
    mostrarAlerta('Conta não encontrada. Verifique o número da conta e a senha.', 'danger');
  }
}

// Função para criar uma nova conta
function criarConta() {
  const novoNumero = parseInt(document.getElementById('novoNumeroConta').value);
  const novaSenha = document.getElementById('novaSenha').value;
  const nomeCliente = document.getElementById('nomeCliente').value;
  const cpfCliente = document.getElementById('cpfCliente').value;

  // Verifica se os campos estão preenchidos
  if (!novoNumero || !novaSenha || !nomeCliente || !cpfCliente) {
    mostrarAlerta('Por favor, preencha todos os campos.', 'danger');
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

  // Adiciona a nova conta ao array de contas
  contas.push(novaConta);

  // Exibe uma mensagem de sucesso
  mostrarAlerta('Conta criada com sucesso.', 'success');
}

// Função para remover uma conta
function removerConta() {
  const numeroContaRemover = parseInt(document.getElementById('numeroContaRemover').value);

  // Encontra o índice da conta a ser removida
  const index = contas.findIndex(conta => conta.numero === numeroContaRemover);

  if (index !== -1) {
    // Remove a conta do array de contas
    contas.splice(index, 1);
    // Exibe uma mensagem de sucesso
    mostrarAlerta('Conta removida com sucesso.', 'success');
  } else {
    // Exibe uma mensagem de erro se a conta não for encontrada
    mostrarAlerta('Conta não encontrada. Verifique o número da conta.', 'danger');
  }
}
function voltarMenuPrincipal() {
  contaAtual = null;
  hideAllMenus();
  exibirMenuPrincipal();
  // Redirecionar para o Google
  window.location.href = 'https://www.google.com';
}

// Chame a função para exibir o Menu Principal no início
hideAllMenus();
document.getElementById('menuPrincipal').style.display = 'block';

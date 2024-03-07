// Variáveis globais
let contas = []; // Array que armazena as contas
let contaAtual = null; // Conta em que o usuário está logado

// Função para exibir o Menu Principal
function exibirMenuPrincipal() {
  document.getElementById('menuPrincipal').style.display = 'block';
  document.getElementById('menuAcessarConta').style.display = 'none';
  document.getElementById('menuMinhaConta').style.display = 'none'; // Adicionado
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
  } else if (tipo === 'info') { // Adicionado
    alerta.classList.add('alert-info');
  }
  alerta.textContent = mensagem;
  alertasDiv.appendChild(alerta);

  // Define um tempo para o alerta desaparecer (por exemplo, 3 segundos)
  setTimeout(function () {
    alerta.remove();
  }, 3000);
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

// Função para mostrar o Menu Minha Conta
function showMenuMinhaConta() {
  hideAllMenus();
  document.getElementById('menuMinhaConta').style.display = 'block';
  mostrarSaldo(); // Adicionado
}

// Função para esconder todos os menus
function hideAllMenus() {
  document.getElementById('menuAcessarConta').style.display = 'none';
  document.getElementById('menuMinhaConta').style.display = 'none';
  document.getElementById('menuCriarConta').style.display = 'none';
  document.getElementById('menuRemoverConta').style.display = 'none';
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
    showMenuMinhaConta(); // Alterado
  } else {
    // Exibe uma mensagem de erro se a conta não for encontrada
    mostrarAlerta('Conta não encontrada. Verifique o número da conta e a senha.', 'danger');
  }
}

// Função para ver o saldo da conta
function verSaldo() {
  mostrarAlerta(`Saldo Atual: R$ ${contaAtual.saldo.toFixed(2)}`, 'info');
}

// Função para sacar dinheiro da conta
function sacar() {
  const valorSaque = parseFloat(prompt('Digite o valor que deseja sacar:'));
  const saldoElement = document.getElementById('saldoConta');

  if (!isNaN(valorSaque) && valorSaque > 0 && valorSaque <= contaAtual.saldo) {
    contaAtual.saldo -= valorSaque;
    mostrarSaldo();
    mostrarAlerta(`Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso.`, 'success');
  } else {
    mostrarAlerta('Valor inválido ou saldo insuficiente.', 'danger');
  }
}

// Função para depositar dinheiro na conta
function depositar() {
  const valorDeposito = parseFloat(prompt('Digite o valor que deseja depositar:'));
  const saldoElement = document.getElementById('saldoConta');

  if (!isNaN(valorDeposito) && valorDeposito > 0) {
    contaAtual.saldo += valorDeposito;
    mostrarSaldo();
    mostrarAlerta(`Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso.`, 'success');
  } else {
    mostrarAlerta('Valor inválido para depósito.', 'danger');
  }
}

// Função para ver informações do cliente associado à conta
function verInformacoesCliente() {
  const cliente = contaAtual.cliente;
  mostrarAlerta(`Nome: ${cliente.nome}\nCPF: ${cliente.cpf}`, 'info');
}

// Função para alterar a senha da conta
function alterarSenha() {
  const novaSenha = prompt('Digite a nova senha:');
  const saldoElement = document.getElementById('saldoConta');

  if (novaSenha !== null && novaSenha !== '') {
    contaAtual.senha = novaSenha;
    mostrarAlerta('Senha alterada com sucesso.', 'success');
  } else {
    mostrarAlerta('Senha inválida.', 'danger');
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

// Chame a função para exibir o Menu Principal no início
hideAllMenus();
document.getElementById('menuPrincipal').style.display = 'block';

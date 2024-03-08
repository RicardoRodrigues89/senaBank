// Função para mostrar o Menu Minha Conta
function showMenuMinhaConta() {
    hideAllMenus();
    document.getElementById('menuMinhaConta').style.display = 'block';
    mostrarSaldo();
  }
  
  // Função para esconder todos os menus
  function hideAllMenus() {
    document.getElementById('menuAcessarConta').style.display = 'none';
    document.getElementById('menuMinhaConta').style.display = 'none';
    document.getElementById('menuCriarConta').style.display = 'none';
    document.getElementById('menuRemoverConta').style.display = 'none';
  }
  
  // Função para ver o saldo da conta
  function verSaldo() {
    mostrarAlerta(`Saldo Atual: R$ ${contaAtual.saldo.toFixed(2)}`, 'info');
  }
  
  // Função para sacar dinheiro da conta
  function sacar() {
    const valorSaque = parseFloat(prompt('Digite o valor que deseja sacar:'));
  
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
  
    if (novaSenha !== null && novaSenha !== '') {
      contaAtual.senha = novaSenha;
      mostrarAlerta('Senha alterada com sucesso.', 'success');
    } else {
      mostrarAlerta('Senha inválida.', 'danger');
    }
  }
  // Função para sair do Menu Minha Conta e voltar para o Menu Principal
function sairDoMenuMinhaConta() {
  hideAllMenus();
  exibirMenuPrincipal();
}

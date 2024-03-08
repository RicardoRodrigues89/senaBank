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
  
  // Variáveis de controle para os formulários
let sacarFormularioAdicionado = false;
let depositarFormularioAdicionado = false;

// Função para sacar dinheiro da conta
function sacar() {
  // Verificar se o formulário já está presente
  if (sacarFormularioAdicionado) {
    return;
  }

  const form = criarFormulario('valorSaque', 'Digite o valor que deseja sacar:', 'Sacar');
  document.getElementById('menuMinhaConta').appendChild(form);
  sacarFormularioAdicionado = true; // Atualizar a variável de controle

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const valorSaque = parseFloat(document.getElementById('valorSaque').value);

    if (!isNaN(valorSaque) && valorSaque > 0) {
      if (valorSaque <= contaAtual.saldo) {
        contaAtual.saldo -= valorSaque;
        mostrarSaldo();
      } else {
        mostrarAlerta('Saldo insuficiente para o saque.', 'danger');
      }
    } else {
      mostrarAlerta('Valor inválido para saque.', 'danger');
    }

    // Remover o formulário após um intervalo de tempo (por exemplo, 2 segundos)
    setTimeout(() => {
      form.remove(); // Remover o formulário
      sacarFormularioAdicionado = false; // Atualizar a variável de controle
    }, 2000);
  });
}

// Função para depositar dinheiro na conta
function depositar() {
  // Verificar se o formulário já está presente
  if (depositarFormularioAdicionado) {
    return;
  }

  const form = criarFormulario('valorDeposito', 'Digite o valor que deseja depositar:', 'Depositar');
  document.getElementById('menuMinhaConta').appendChild(form);
  depositarFormularioAdicionado = true; // Atualizar a variável de controle

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const valorDeposito = parseFloat(document.getElementById('valorDeposito').value);

    if (!isNaN(valorDeposito) && valorDeposito > 0) {
      contaAtual.saldo += valorDeposito;
      mostrarSaldo();
    } else {
      mostrarAlerta('Valor inválido para depósito.', 'danger');
    }

    // Remover o formulário após um intervalo de tempo (por exemplo, 2 segundos)
    setTimeout(() => {
      form.remove(); // Remover o formulário
      depositarFormularioAdicionado = false; // Atualizar a variável de controle
    }, 2000);
  });
}



// Função para alterar a senha da conta
function alterarSenha() {
  // Verificar se o formulário já está presente
  if (document.getElementById('formAlterarSenha')) {
    return;
  }

  const form = criarFormulario('novaSenha', 'Digite a nova senha:', 'Alterar Senha');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const novaSenha = document.getElementById('novaSenha').value;

    if (novaSenha !== null && novaSenha !== '') {
      contaAtual.senha = novaSenha;
      mostrarAlerta('Senha alterada com sucesso.', 'success');
      form.remove();
    } else {
      mostrarAlerta('Senha inválida.', 'danger');
    }
  });

  document.getElementById('menuMinhaConta').appendChild(form);
}

// Função auxiliar para criar formulário
function criarFormulario(inputId, labelTexto, botaoTexto) {
  const form = document.createElement('form');
  form.id = 'form' + botaoTexto.replace(/\s/g, ''); // Adicionando um ID exclusivo ao formulário
  form.innerHTML = `
    <label for="${inputId}">${labelTexto}</label>
    <input type="number" id="${inputId}" required>
    <button type="submit">${botaoTexto}</button>
  `;

  return form;
}

  
  // Função para ver informações do cliente associado à conta
  function verInformacoesCliente() {
    const cliente = contaAtual.cliente;
    mostrarAlerta(`Nome: ${cliente.nome}\nCPF: ${cliente.cpf}`, 'info');
  }
  
  
  // Função para sair do Menu Minha Conta e voltar para o Menu Principal
function sairDoMenuMinhaConta() {
  hideAllMenus();
  exibirMenuPrincipal();
}

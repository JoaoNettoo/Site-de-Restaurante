let carrinho = [];

function adicionarAoCarrinho(id, nome, preco, imagem) {
  //analisa se o usuario está logado
  //caso esteja procedo com o pedido
  const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Você precisa estar logado para adicionar itens ao carrinho.");
        // Opcional: redirecionar para a página de login
        window.location.href = "#contact";
        return;
    }
 
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }

    salvarCarrinho(); // Salva o carrinho no Local Storage
    atualizarCarrinho();

}


// Função para adicionar produto e redirecionar para a página de pedidos
function adicionarPedidoERedirecionar(id, nome, preco, imagem) {
  adicionarAoCarrinho(id, nome, preco, imagem); // Adiciona o produto ao carrinho
  window.location.href = 'pedido.html'; // Redireciona para a página de pedidos
  window.location.assign("pedido.html");
}


// Função para reduzir a quantidade do produto do carrinho
function reduzirDoCarrinho(id) {
  const produto = carrinho.find(produto => produto.id === id);

  if (produto) {
    produto.quantidade -= 1;
    if (produto.quantidade <= 0) {
      carrinho = carrinho.filter(produto => produto.id !== id);
    }
  }

  salvarCarrinho();
  atualizarCarrinho();
}

// Função para remover produtos do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(produto => produto.id !== id);

  salvarCarrinho();
  atualizarCarrinho();
}

function cancelarPedido(){
  carrinho.forEach(produto => removerDoCarrinho(produto.id));
  salvarCarrinho();
  atualizarCarrinho();
  location.reload(true);

}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


// Função para atualizar a interface do carrinho
function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  const totalDiv = document.getElementById("total");

  carrinhoDiv.innerHTML = ""; // Limpa o carrinho antes de atualizar
  let total = 0;
  
  carrinho.forEach(produto => {
    total += produto.preco * produto.quantidade;
    salvarCarrinho();

    carrinhoDiv.innerHTML += `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; margin-right: 10px;">
        <div>
          <p>${produto.nome} - R$${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
          <button onclick="adicionarAoCarrinho(${produto.id})">+</button>
          <button onclick="reduzirDoCarrinho(${produto.id})">-</button>
          <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
        </div>
      </div>
    `;
  });

  totalDiv.textContent = total.toFixed(2); // Atualiza o total

}

function finalizarPedido(){
  cancelarPedido();
  alert("Seu Pedido foi finalizado");
  alert("Volte sempre!");
  
}
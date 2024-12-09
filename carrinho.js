let carrinho = [];

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(id, nome, preco, imagem) {
  const produtoExistente = carrinho.find(produto => produto.id === id);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
  }
  atualizarCarrinho();
}

// Função para reduzir a quantidade do produto do carrinho
function reduzirDoCarrinho(id) {
    let produto = carrinho.find(produto => produto.id === id)
    if (produto.quantidade >= 1) {
        produto.quantidade -= 1;
    }else{
        carrinho = carrinho.filter(produto => produto.id !== id);        
    }
    atualizarCarrinho();
}

// Função para remover produtos do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(produto => produto.id !== id);
  atualizarCarrinho();
}

// Função para atualizar a interface do carrinho
function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  const totalDiv = document.getElementById("total");

  carrinhoDiv.innerHTML = ""; // Limpa o carrinho antes de atualizar
  let total = 0;

  carrinho.forEach(produto => {
    total += produto.preco * produto.quantidade;

    carrinhoDiv.innerHTML += `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; margin-right: 10px;">
        <div>
          <p>${produto.nome} - R$${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
          <button onclick="adicionarAoCarrinho(${produto.id})">+</button>
          <button onclick="reduzirDoCarrinho(${produto.id})">--</button>
          <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
        </div>
      </div>
    `;
  });

  totalDiv.textContent = total.toFixed(2); // Atualiza o total

  
}



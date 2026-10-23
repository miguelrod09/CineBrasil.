const mapa = document.getElementById("mapa-assentos");
const lugares = document.getElementById("lugares");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");
const continuar = document.getElementById("continuar");

const precoIngresso = 30;

const fileiras = ["A", "B", "C", "D", "E", "F"];
const assentosPorFileira = 8;

// Assentos ocupados (exemplo)
const ocupados = ["A3", "B6", "C2", "D7", "E5", "F1"];

// Assentos escolhidos pelo usuário
let selecionados = [];

// Recuperar horário escolhido na página anterior
const parametros = new URLSearchParams(window.location.search);

const sessao = parametros.get("sessao") || "Horário não informado";
const filme = parametros.get("filme") || "Filme não informado";
document.getElementById("filme").textContent = filme;
if (!parametros.get("filme") || !parametros.get("sessao")) {
  continuar.disabled = true;
  continuar.textContent = "Volte e escolha um filme e horário";
}

document.getElementById("sessao").textContent = sessao;

// Criar mapa de assentos
fileiras.forEach((fileira) => {
  const linha = document.createElement("div");
  linha.classList.add("fileira");

  const letra = document.createElement("span");
  letra.classList.add("letra");
  letra.textContent = fileira;

  linha.appendChild(letra);

  for (let numero = 1; numero <= assentosPorFileira; numero++) {
    const codigo = fileira + numero;

    const assento = document.createElement("button");

    assento.classList.add("assento");
    assento.textContent = numero;
    assento.type = "button";
    assento.setAttribute("aria-label", "Assento " + codigo);
    assento.setAttribute("aria-pressed", "false");

    // Criar corredor central
    if (numero === 4) {
      assento.classList.add("corredor");
    }

    // Verificar se está ocupado
    if (ocupados.includes(codigo)) {
      assento.classList.add("ocupado");
      assento.disabled = true;
    } else {
      assento.addEventListener("click", () => {
        if (selecionados.includes(codigo)) {
          selecionados = selecionados.filter((item) => item !== codigo);

          assento.classList.remove("selecionado");
          assento.setAttribute("aria-pressed", "false");
        } else {
          selecionados.push(codigo);

          assento.classList.add("selecionado");
          assento.setAttribute("aria-pressed", "true");
        }

        atualizarResumo();
      });
    }

    linha.appendChild(assento);
  }

  mapa.appendChild(linha);
});

// Atualizar valores da compra
function atualizarResumo() {
  const total = selecionados.length * precoIngresso;

  lugares.textContent = selecionados.length
    ? selecionados.join(", ")
    : "Nenhum";

  quantidade.textContent = selecionados.length;

  valor.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  continuar.disabled = selecionados.length === 0 || !parametros.get("filme") || !parametros.get("sessao");
}

// Continuar para pagamento
continuar.addEventListener("click", () => {
  if (continuar.disabled) return;

  const dadosCompra = {
    filme: filme,
    sessao: sessao,
    assentos: selecionados,
    quantidade: selecionados.length,
    total: selecionados.length * precoIngresso,
  };

  // Salvar temporariamente os dados da compra
  sessionStorage.setItem("compraCineBrasil", JSON.stringify(dadosCompra));

  window.location.href = "../pagamento.html";
});

const ingresso = JSON.parse(
  sessionStorage.getItem("ingressoCineBrasil") || "null",
);
const dados = document.getElementById("ingresso-dados");
const dinheiro = (n) =>
  Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function el(tag, cls, text) {
  const x = document.createElement(tag);
  if (cls) x.className = cls;
  if (text !== undefined) x.textContent = text;
  return x;
}
if (
  !ingresso ||
  !Array.isArray(ingresso.assentos) ||
  !ingresso.assentos.length
) {
  dados.append(
    el(
      "p",
      "muted",
      "Nenhum ingresso encontrado. Volte ao início para escolher uma sessão.",
    ),
  );
} else {
  const top = el("div", "ticket-top");
  top.append(
    el("span", "ticket-logo", "🎬 CINEBRASIL"),
    el("span", "ticket-status", "✓ CONFIRMADO"),
  );
  dados.append(top);
  const hero = el("div", "ticket-hero");
  const posters = {
    batman: "imagens/batman.jpg",
    jigsaw: "imagens/jigsaw.jpg",
    jumper: "imagens/jumper.jpg",
  };
  const chaveFilme = (nome) =>
    /batman/i.test(nome)
      ? "batman"
      : /jigsaw/i.test(nome)
        ? "jigsaw"
        : /jumper/i.test(nome)
          ? "jumper"
          : "";
  if (posters[chaveFilme(ingresso.filme)]) {
    const img = el("img");
    img.src = posters[chaveFilme(ingresso.filme)];
    img.alt = "Cartaz de " + ingresso.filme;
    hero.append(img);
  }
  const info = el("div");
  info.append(
    el("span", "summary-eyebrow", "SEU FILME"),
    el("h2", "", ingresso.filme),
    el("p", "muted", "🍿 Aproveite a experiência!"),
  );
  hero.append(info);
  dados.append(hero);
  const grid = el("div", "ticket-grid");
  for (const [label, value] of [
    ["📅 SESSÃO", ingresso.sessao],
    ["💺 ASSENTOS", ingresso.assentos.join(", ")],
    ["🎫 INGRESSOS", String(ingresso.assentos.length)],
    ["💳 PAGAMENTO", ingresso.metodo || "Confirmado"],
  ]) {
    const box = el("div");
    box.append(el("span", "", label), el("strong", "", value));
    grid.append(box);
  }
  dados.append(grid);
  const bottom = el("div", "ticket-bottom");
  const total = el("div");
  total.append(el("span", "TOTAL"), el("strong", "", dinheiro(ingresso.total)));
  bottom.append(
    total,
    el("span", "ticket-ref", ingresso.referencia || "CINEBRASIL"),
  );
  dados.append(bottom);
}

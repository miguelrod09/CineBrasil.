document.addEventListener("DOMContentLoaded", () => {
  const horarios = document.querySelectorAll(".horario");
  const comprar = document.getElementById("comprarIngresso");
  const filme = document.body.dataset.filme;
  horarios.forEach((botao) =>
    botao.addEventListener("click", () => {
      horarios.forEach((outro) => outro.classList.remove("selecionado"));
      botao.classList.add("selecionado");
    }),
  );
  if (comprar)
    comprar.addEventListener("click", (event) => {
      const escolhido = document.querySelector(".horario.selecionado");
      if (!escolhido) {
        event.preventDefault();
        alert("Selecione um horário antes de continuar.");
        return;
      }
      const destino = new URL(comprar.getAttribute("href"), location.href);
      destino.searchParams.set("filme", filme);
      destino.searchParams.set("sessao", escolhido.dataset.horario);
      comprar.href = destino.href;
    });
});

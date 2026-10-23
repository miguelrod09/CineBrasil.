const compra = JSON.parse(sessionStorage.getItem("compraCineBrasil") || "null");
const resumo = document.getElementById("resumo-pagamento");
const area = document.getElementById("area-pagamento");
const dinheiro = n => Number(n).toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
const valido = compra && typeof compra.filme === "string" && typeof compra.sessao === "string" && Array.isArray(compra.assentos) && compra.assentos.length > 0 && compra.total === compra.assentos.length * 30;
function elemento(tag, classe, conteudo) {const el=document.createElement(tag);if(classe)el.className=classe;if(conteudo!==undefined)el.textContent=conteudo;return el;}
function linha(rotulo, texto, classe="") {const el=elemento("div","summary-line "+classe);el.append(elemento("span","",rotulo),elemento("strong","",texto));return el;}
if (!valido) {
  resumo.append(elemento("p","muted","Nenhuma seleção encontrada. Escolha seu filme e seus lugares primeiro."));
  document.querySelector(".metodos").hidden=true;
  area.replaceChildren(); const a=elemento("a","btn-voltar","Escolher filme");a.href="index.html";area.append(a);
} else {
  const poster = {"batman":"imagens/batman.jpg","jigsaw":"imagens/jigsaw.jpg","jumper":"imagens/jumper.jpg"};
  const chaveFilme = nome => /batman/i.test(nome) ? "batman" : /jigsaw/i.test(nome) ? "jigsaw" : /jumper/i.test(nome) ? "jumper" : "";
  const hero=elemento("div","summary-movie");
  if(poster[chaveFilme(compra.filme)]) {const img=document.createElement("img");img.src=poster[chaveFilme(compra.filme)];img.alt="Cartaz de "+compra.filme;hero.append(img);}
  const info=elemento("div","");info.append(elemento("span","summary-eyebrow","SEU FILME"),elemento("h3","",compra.filme));hero.append(info);resumo.append(hero);
  resumo.append(linha("📅 Sessão",compra.sessao),linha("💺 Assentos",compra.assentos.join(", ")),linha("🎫 Ingressos",String(compra.assentos.length)),linha("Total",dinheiro(compra.total),"summary-total"));
  document.querySelectorAll("[data-metodo]").forEach(botao=>botao.addEventListener("click",()=>{
    document.querySelectorAll("[data-metodo]").forEach(b=>{b.classList.toggle("active",b===botao);b.setAttribute("aria-pressed",String(b===botao));});
    if(botao.dataset.metodo==="cartao") mostrarCartao(); else mostrarPix();
  }));
}
function concluir(metodo){if(!valido)return;const pedido={...compra,metodo,referencia:"CB-"+Date.now().toString(36).toUpperCase().slice(-8)};sessionStorage.setItem("ingressoCineBrasil",JSON.stringify(pedido));
try {
  const chave="cinebrasilPedidosV1";
  const anteriores=JSON.parse(localStorage.getItem(chave)||"[]");
  const lista=Array.isArray(anteriores)?anteriores:[];
  lista.unshift({...pedido, criadoEm:new Date().toISOString()});
  localStorage.setItem(chave,JSON.stringify(lista.slice(0,100)));
} catch(e) { console.warn("Histórico local indisponível",e); }sessionStorage.removeItem("compraCineBrasil");location.href="ingresso.html";}
function mostrarCartao(){area.innerHTML=`<form id="form-cartao" class="formulario checkout-form"><div class="form-heading"><span>💳</span><div><h2>Dados do cartão</h2><p class="muted">Use somente os dados de exemplo abaixo.</p></div></div><div class="card-preview"><span>🎬 CINEBRASIL</span><strong>•••• •••• •••• 4242</strong><small>CARTÃO DE APRESENTAÇÃO　　12/30</small></div><label for="nome-cartao">Nome no cartão</label><input id="nome-cartao" value="CLIENTE EXEMPLO" readonly><label for="numero-cartao">Número do cartão</label><input id="numero-cartao" value="4242 4242 4242 4242" readonly><div class="linha-form"><div><label for="validade">Validade</label><input id="validade" value="12/30" readonly></div><div><label for="cvv">CVV</label><input id="cvv" value="•••" readonly></div></div><button type="submit" class="btn-pagar">Confirmar compra • ${dinheiro(compra.total)} →</button></form>`;document.getElementById("form-cartao").addEventListener("submit",e=>{e.preventDefault();concluir("Cartão");});}
function mostrarPix(){area.innerHTML=`<div class="pix-area checkout-pix"><div class="form-heading"><span>⚡</span><div><h2>Pagamento via PIX</h2><p class="muted">Confira o QR Code de apresentação.</p></div></div><div class="pix-total">Valor do pedido <strong>${dinheiro(compra.total)}</strong></div><div class="qr-showcase" aria-label="Ilustração decorativa de QR Code"><div class="qr-art" aria-hidden="true"><span class="qr-corner tl"></span><span class="qr-corner tr"></span><span class="qr-corner bl"></span><span class="qr-pixels"></span><span class="qr-brand">🎬</span></div></div><p class="muted pix-help">QR Code ilustrativo, sem chave de pagamento associada.</p><button type="button" class="btn-pagar" id="confirmar-pix">Concluir compra →</button></div>`;document.getElementById("confirmar-pix").addEventListener("click",()=>concluir("PIX"));}

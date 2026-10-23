"use strict";
const sair=document.getElementById('sair-conta');
if(sair)sair.addEventListener('click',()=>{sessionStorage.removeItem('cinebrasilDemoSession');location.href='login.html';});
const lista=document.getElementById('lista-pedidos');
if(lista){
 const KEY='cinebrasilPedidosV1',posters={batman:'imagens/batman.jpg',jigsaw:'imagens/jigsaw.jpg',jumper:'imagens/jumper.jpg'};
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
 const money=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
 const read=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[]}catch{return []}};
 const render=()=>{
  const orders=read();lista.replaceChildren();
  const subtitle=document.getElementById('pedidos-subtitulo');
  if(subtitle)subtitle.textContent=orders.length?`${orders.length} pedido(s) salvo(s) neste navegador.`:'Seu histórico de ingressos neste navegador.';
  if(!orders.length){const empty=node('div','account-panel empty-orders');empty.append(node('span','empty-icon','🍿'),node('h2','','Ainda não há pedidos por aqui'),node('p','','Quando você concluir uma compra, seus ingressos aparecerão nesta página.'));const a=node('a','btn-pagar','Explorar filmes →');a.href='index.html#filmes';empty.append(a);lista.append(empty);return}
  orders.forEach((p,index)=>{
   if(!p||typeof p.filme!=='string'||!Array.isArray(p.assentos))return;
   const card=node('article','order-card');
   const key=/batman/i.test(p.filme)?'batman':/jigsaw/i.test(p.filme)?'jigsaw':/jumper/i.test(p.filme)?'jumper':'';
   if(key){const img=node('img');img.src=posters[key];img.alt='Cartaz de '+p.filme;img.loading='lazy';card.append(img)}
   const info=node('div','order-info');
   info.append(node('span','order-kicker','✓ PEDIDO CONFIRMADO'),node('h2','',p.filme));
   const meta=node('div','order-meta');
   [['📅 Sessão',p.sessao],['💺 Assentos',p.assentos.join(', ')],['🎫 Ingressos',p.assentos.length],['💳 Método',p.metodo||'—'],['🔖 Referência',p.referencia||'—']].forEach(([label,value])=>{const row=node('p');row.append(node('span','',label+': '),node('strong','',String(value??'—')));meta.append(row)});
   info.append(meta);const footer=node('div','order-footer');footer.append(node('strong','',money(p.total)));if(p.criadoEm&&!isNaN(Date.parse(p.criadoEm)))footer.append(node('span','',new Date(p.criadoEm).toLocaleDateString('pt-BR')));
   const remove=node('button','cb-refund-btn','↩ Cancelar pedido / solicitar reembolso');remove.type='button';
   remove.addEventListener('click',async()=>{
    const ok=await CineDialogs.show({icon:'↩',title:'Cancelar este pedido?',message:'Quer mesmo deletar seu pedido e prosseguir com reembolso? Esta ação remove o ingresso do histórico deste navegador. O reembolso exibido é apenas uma simulação: nenhum valor real será transferido.',confirm:'Confirmar cancelamento',danger:true});
    if(!ok)return;
    const current=read(),position=current.findIndex(x=>x.referencia&&x.referencia===p.referencia);
    const target=position>=0?position:index;
    if(target>=0&&target<current.length)current.splice(target,1);
    try{localStorage.setItem(KEY,JSON.stringify(current));render();await CineDialogs.success('Reembolso demonstrativo concluído!','✓ Pedido removido com sucesso. Este projeto não realiza cobranças nem estornos reais.')}catch{await CineDialogs.success('Não foi possível salvar','O navegador bloqueou a atualização do histórico.')}
   });
   info.append(footer,remove);card.append(info);lista.append(card);
  });
 };
 render();
}

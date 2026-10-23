document.addEventListener('DOMContentLoaded',()=>{
 const b=document.getElementById('cancelar-compra');if(!b)return;
 b.addEventListener('click',async()=>{
  const ok=await CineDialogs.show({icon:'✕',title:'Remover este pedido?',message:'Quer mesmo remover este pedido? Sua seleção atual de assentos e sessão será descartada.',confirm:'Sim, remover',danger:true});
  if(!ok)return;
  sessionStorage.removeItem('compraCineBrasil');
  location.href=location.pathname.includes('/filmes/')?'../index.html#filmes':'index.html#filmes';
 });
});
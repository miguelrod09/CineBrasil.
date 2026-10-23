(()=>{
 const build=()=>{
  if(document.body.classList.contains('login-body'))return;
  const nested=/\/(?:filmes|estados)\//.test(location.pathname);
  const base=nested?'../':'';
  document.querySelectorAll('body > header').forEach(header=>{
   if(header.dataset.futureNav)return;header.dataset.futureNav='1';header.classList.add('future-header');
   const nav=header.querySelector('nav');if(!nav)return;
   nav.innerHTML=`
   <div class="future-links">
    <a href="${base}index.html" class="future-link">⌂ <span>Início</span></a>
    <div class="future-menu"><button type="button" class="future-link future-menu-trigger" aria-expanded="false" aria-controls="future-film-menu">▦ <span>Filmes</span>⌄</button>
     <div id="future-film-menu" class="future-popover" hidden><p>Onde você quer assistir?</p><a href="${base}estados/rj.html">⌖ Rio de Janeiro</a><a href="${base}estados/sp.html">⌖ São Paulo</a><a href="${base}index.html#filmes">Todos os filmes →</a></div>
    </div>
    <a href="${base}index.html#cidades" class="future-link">⌖ <span>Cidades</span></a>
    <a href="${base}meus-pedidos.html" class="future-link">▤ <span>Meus pedidos</span></a>
    <a href="${base}minha-conta.html" class="future-link">♙ <span>Minha conta</span></a>
   </div>
   <div class="future-tools">
    <form class="future-search" role="search"><label class="sr-only" for="future-query">Pesquisar filme</label><input id="future-query" type="search" placeholder="Buscar filmes..." autocomplete="off"><button type="submit" aria-label="Pesquisar">⌕</button><div class="future-search-results" hidden></div></form>
    <a class="future-linkedin" href="https://www.linkedin.com/in/miguel-chagas-lopes/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Miguel Chagas">in</a>
    <a class="future-profile" href="${base}minha-conta.html" aria-label="Perfil Bruce Wayne">♟ <span>Bruce Wayne</span></a>
   </div>`;
   const trigger=nav.querySelector('.future-menu-trigger'),pop=nav.querySelector('.future-popover');
   trigger.addEventListener('click',()=>{const opened=trigger.getAttribute('aria-expanded')==='true';trigger.setAttribute('aria-expanded',String(!opened));pop.hidden=opened;});
   document.addEventListener('click',e=>{if(!e.target.closest('.future-menu')){pop.hidden=true;trigger.setAttribute('aria-expanded','false');}});
   const form=nav.querySelector('.future-search'),input=form.querySelector('input'),results=form.querySelector('.future-search-results');
   const films=[['The Batman 2','filmes/batman.html'],['Jigsaw — Jogos Mortais','filmes/jigsaw.html'],['Jumper','filmes/jumper.html']];
   const render=()=>{const q=input.value.trim().toLocaleLowerCase('pt-BR');results.replaceChildren();if(!q){results.hidden=true;return;}films.filter(f=>f[0].toLocaleLowerCase('pt-BR').includes(q)).forEach(([name,url])=>{const a=document.createElement('a');a.href=base+url;a.textContent='🎬 '+name;results.append(a);});if(!results.children.length){const p=document.createElement('p');p.textContent='Nenhum filme encontrado.';results.append(p)}results.hidden=false;};
   input.addEventListener('input',render);input.addEventListener('focus',render);
   form.addEventListener('submit',e=>{e.preventDefault();const a=results.querySelector('a');if(a)location.href=a.href;else render();});
   document.addEventListener('click',e=>{if(!form.contains(e.target))results.hidden=true});
  });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
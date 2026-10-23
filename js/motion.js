/* CineBrasil: animações de interface sem alterar fluxos existentes */
(() => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (reduced) return;
 const body=document.body;
 if(!body.classList.contains('no-page-intro')){
   body.classList.add('cb-enter');
   requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add('cb-ready')));
 }
 document.addEventListener('click',e=>{
   const control=e.target.closest('button, a, .assento, .card, .card-filme');
   if(control && !control.disabled){
     const r=control.getBoundingClientRect();
     if(r.width && r.height){
       const spark=document.createElement('span');
       spark.className='cb-ripple';
       const size=Math.max(r.width,r.height)*1.7;
       spark.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
       if(getComputedStyle(control).position==='static')control.classList.add('cb-ripple-parent');
       control.appendChild(spark);
       spark.addEventListener('animationend',()=>spark.remove(),{once:true});
     }
   }
   const seat=e.target.closest('.assento:not(:disabled)');
   if(seat){seat.classList.remove('cb-seat-pop');void seat.offsetWidth;seat.classList.add('cb-seat-pop');}
   const link=e.target.closest('a[href]');
   if(!link || e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.hasAttribute('download') || link.target==='_blank')return;
   const u=new URL(link.href,location.href);
   if(u.origin!==location.origin || u.pathname===location.pathname && u.hash || !/\.html$/i.test(u.pathname))return;
   e.preventDefault();
   body.classList.add('cb-leave');
   setTimeout(()=>{location.href=u.href},220);
 });
 const observe=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('cb-visible');observe.unobserve(entry.target)}
  });
 },{threshold:.08,rootMargin:'0px 0px 40px 0px'});
 const add=()=>document.querySelectorAll('.card,.card-filme,.account-panel,.checkout-panel,.ticket,.resumo,.cinema,.orders-list > *, .summary-movie').forEach(el=>{
  if(el.classList.contains('cb-observed'))return;
  el.classList.add('cb-observed');observe.observe(el);
 });
 add();
 const mo=new MutationObserver(add);mo.observe(document.body,{childList:true,subtree:true});
})();

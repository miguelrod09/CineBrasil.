(()=>{
 const show=({icon='✦',title,message,confirm='Confirmar',danger=false})=>new Promise(resolve=>{
  const shade=document.createElement('div');shade.className='cb-dialog-shade';
  shade.innerHTML=`<section class="cb-dialog" role="alertdialog" aria-modal="true" aria-labelledby="cb-dialog-title" aria-describedby="cb-dialog-message"><div class="cb-dialog-icon" aria-hidden="true"></div><h2 id="cb-dialog-title"></h2><p id="cb-dialog-message"></p><div class="cb-dialog-actions"><button type="button" class="cb-dialog-no">Voltar</button><button type="button" class="cb-dialog-yes"></button></div></section>`;
  shade.querySelector('.cb-dialog-icon').textContent=icon;shade.querySelector('h2').textContent=title;shade.querySelector('p').textContent=message;
  const yes=shade.querySelector('.cb-dialog-yes');yes.textContent=confirm;yes.classList.toggle('danger',danger);
  document.body.append(shade);const no=shade.querySelector('.cb-dialog-no'),prev=document.activeElement;no.focus();
  let finished=false;const done=v=>{if(finished)return;finished=true;document.removeEventListener('keydown',key);shade.classList.add('closing');setTimeout(()=>shade.remove(),220);if(prev?.isConnected)prev.focus();resolve(v)};
  const key=e=>{if(e.key==='Escape')done(false);if(e.key==='Tab'){const buttons=[no,yes];const i=buttons.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();yes.focus()}else if(!e.shiftKey&&i===1){e.preventDefault();no.focus()}}};
  document.addEventListener('keydown',key);no.addEventListener('click',()=>done(false));yes.addEventListener('click',()=>done(true));shade.addEventListener('click',e=>{if(e.target===shade)done(false)});
 });
 const success=(title,message)=>new Promise(resolve=>{
  const shade=document.createElement('div');shade.className='cb-dialog-shade';
  shade.innerHTML='<section class="cb-dialog cb-success" role="alertdialog" aria-modal="true"><div class="cb-success-check" aria-hidden="true">✓</div><div class="cb-sparks" aria-hidden="true">✦ ✧ ✦</div><h2></h2><p></p><button type="button" class="cb-dialog-yes">Concluir ✨</button></section>';
  shade.querySelector('h2').textContent=title;shade.querySelector('p').textContent=message;
  document.body.append(shade);const b=shade.querySelector('button');b.focus();b.addEventListener('click',()=>{shade.remove();resolve()},{once:true});
 });
 window.CineDialogs={show,success};
})();
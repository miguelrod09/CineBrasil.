"use strict";
// Demonstração local de sessão, não autenticação segura.
(function(){
  const active=sessionStorage.getItem('cinebrasilDemoSession')==='bruce-wayne';
  const path=location.pathname;
  if(!active && !/\/login\.html$/.test(path)){
    const prefix=/\/(filmes|estados)\/[^/]*$/.test(path)?'../':'';
    const next=encodeURIComponent((prefix ? location.pathname.split('/').slice(-2).join('/') : location.pathname.split('/').pop())+location.search+location.hash);
    location.replace(prefix+'login.html?next='+next);
  }
})();

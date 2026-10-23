"use strict";
document.getElementById('login-form').addEventListener('submit',e=>{
 e.preventDefault();sessionStorage.setItem('cinebrasilDemoSession','bruce-wayne');
 const next=new URLSearchParams(location.search).get('next');
 // Permitir apenas caminhos internos simples, sem URL externa.
 location.href=next && /^(?:(?:filmes|estados)\/)?[\w-]+\.html(?:[?#][^\s]*)?$/.test(next) && next!=='login.html'?next:'index.html';
});

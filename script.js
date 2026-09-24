// script.js — interações e animações do portfólio de Vinicius Furtado

(function(){
  "use strict";
  /* Safety net: whatever else happens in this script, no section stays
     invisible forever. Runs independently of everything below. */
  setTimeout(function(){
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el){
      el.classList.add('is-visible');
    });
    if(window.__syncTimelineFill){ window.__syncTimelineFill(); }
  }, 2000);

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero letter stagger */
  document.querySelectorAll('.hero h1 .line span').forEach(function(el, i){
    el.style.animationDelay = (i * 0.08) + 's';
  });

  /* Typing effect in terminal */
  var typedEl = document.getElementById('typedLine');
  var fullText = 'const dev = { nome: "Vinicius Furtado", foco: "Full Stack", status: "aberto a estágios" };';
  if(reduceMotion){
    typedEl.textContent = fullText;
  } else {
    var i = 0;
    function typeStep(){
      if(i <= fullText.length){
        typedEl.innerHTML = fullText.slice(0, i) + '<span class="cursor"></span>';
        i++;
        setTimeout(typeStep, 22);
      }
    }
    setTimeout(typeStep, 500);
  }

  /* Toast helper */
  var toastEl = document.getElementById('toast');
  var toastTimer;
  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 2200);
  }

  /* Copy to clipboard */
  function copyText(text, label){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        showToast(label + ' copiado!');
      }).catch(function(){
        showToast(label + ': ' + text);
      });
    } else {
      showToast(label + ': ' + text);
    }
  }
  document.getElementById('copyEmail').addEventListener('click', function(){
    copyText('vnniwzx@gmail.com', 'E-mail');
  });
  document.getElementById('copyPhone').addEventListener('click', function(){
    copyText('11 91415-0572', 'Telefone');
  });

  /* Photo: fixed picture bundled with the site (no swap option) */
  try{
    var photoFrame = document.querySelector('.photo-frame');
    var photoPlaceholder = document.getElementById('photoPlaceholder');
    var photoImg = document.getElementById('photoImg');
    photoImg.addEventListener('error', function(){
      photoImg.hidden = true;
      photoPlaceholder.hidden = false;
      photoFrame.classList.add('broken');
    });
  }catch(e){}

  /* Back to top (declared early: onScroll below needs it) */
  var toTopBtn = document.getElementById('toTop');
  function toggleTopBtn(){
    if(toTopBtn){ toTopBtn.classList.toggle('show', window.scrollY > 500); }
  }
  if(toTopBtn){
    toTopBtn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* Nav scroll state */
  try{
    var header = document.getElementById('siteHeader');
    function onScroll(){
      if(window.scrollY > 30){ header.classList.add('scrolled'); }
      else{ header.classList.remove('scrolled'); }
      toggleTopBtn();
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }catch(e){}

  /* Mobile menu */
  try{
    var burger = document.getElementById('burger');
    var panel = document.getElementById('mobilePanel');
    burger.addEventListener('click', function(){
      var open = panel.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        panel.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }catch(e){}

  /* Active nav link + reveal on scroll */
  try{
    var sections = document.querySelectorAll('main section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a, .mobile-panel a');
    var revealEls = document.querySelectorAll('.reveal');

    function syncTimelineFill(){
      var timeline = document.getElementById('timeline');
      if(!timeline) return;
      var lit = timeline.querySelectorAll('.tl-item.is-visible');
      if(!lit.length){ timeline.style.setProperty('--tl-progress', '0px'); return; }
      var last = lit[lit.length - 1];
      timeline.style.setProperty('--tl-progress', (last.offsetTop + 8) + 'px');
    }
    window.__syncTimelineFill = syncTimelineFill;

    if('IntersectionObserver' in window){
      var navObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            var id = entry.target.getAttribute('id');
            navAnchors.forEach(function(a){
              a.classList.toggle('active', a.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function(s){ navObserver.observe(s); });

      var revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
            if(entry.target.classList.contains('tl-item')){ syncTimelineFill(); }
          }
        });
      }, { threshold: .15 });
      revealEls.forEach(function(el){ revealObserver.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('is-visible'); });
      syncTimelineFill();
    }
  }catch(e){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* Timeline: keep the fill line correct if the layout reflows */
  try{
    window.addEventListener('resize', function(){
      if(window.__syncTimelineFill){ window.__syncTimelineFill(); }
    });
  }catch(e){}

  /* Cursor glow (desktop only) */
  try{
    var glow = document.getElementById('cursor-glow');
    var isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if(!isCoarse && !reduceMotion){
      window.addEventListener('mousemove', function(e){
        glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      }, { passive:true });
    } else {
      glow.style.display = 'none';
    }
  }catch(e){}

  /* Footer year */
  try{
    document.getElementById('year').textContent = new Date().getFullYear();
  }catch(e){}
})();

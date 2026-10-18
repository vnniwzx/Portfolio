// Portfólio — Vinicius Furtado
(function(){
  // typed role
  const words=["sites","apps","sistemas","jogos","interfaces"];
  const el=document.getElementById("typed");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduce){
    let w=0,i=words[0].length,del=true;
    setTimeout(function tick(){
      const word=words[w];
      if(del){i--; if(i<=0){del=false;w=(w+1)%words.length;}}
      else{i++; if(i>=words[w].length){del=true; el.textContent=words[w].slice(0,i); return setTimeout(tick,1600);}}
      el.textContent=words[w].slice(0,Math.max(i,0))||"​";
      setTimeout(tick,del?60:110);
    },1800);
  }

  // skills
  const skills=[
    ["HTML","Estrutura e semântica","HTML",7,"Sólido",true],
    ["CSS","Layout, responsivo, animação","CSS",7,"Sólido",true],
    ["JS","Lógica e interatividade","JavaScript",6,"Intermediário",true],
    ["Py","Lógica, dados, arquivos","Python",6,"Intermediário",true],
    ["C#","Orientação a objetos","C#",5,"Intermediário",false],
    ["SQL","SQL Server Management Studio","SQL",5,"Intermediário",false],
    ["⚛","Componentes e hooks","React",2,"Carregando…",false,true]
  ];
  document.getElementById("inv").innerHTML=skills.map(function(s,k){
    let bar="";for(let n=0;n<10;n++)bar+='<i class="'+(n<s[3]?"on":"")+'" style="animation-delay:'+(k*.08+n*.05)+'s"></i>';
    return '<div class="skill'+(s[6]?" loading":"")+'"><div class="skill-top"><span class="glyph">'+s[0]+'</span><div><h3>'+s[2]+'</h3><small>'+s[1]+'</small></div>'+(s[5]?'<span class="badge">FIAP ✓</span>':(s[6]?'<span class="badge">Aprendendo</span>':''))+'</div><div class="bar" role="img" aria-label="Nível '+s[3]+' de 10">'+bar+'</div><div class="lvl"><span>LV '+s[3]+'/10</span><b>'+s[4]+'</b></div></div>';
  }).join("");

  // projects
  const colors={Python:"#3572A5",JavaScript:"#E3C11B",SQL:"#E38C00",Dart:"#00B4AB"};
  const projects=[
    ["Sistema_RPG","Python","Lógica de jogo em Python, unindo programação e a paixão por games que começou tudo.",true],
    ["Sistema-Hospitalar","SQL","Modelagem e consultas de banco de dados em T-SQL para um sistema hospitalar."],
    ["Cadastrar-Jogadores","Python","Cadastro e organização de jogadores com estruturas de dados em Python."],
    ["Cronometro","JavaScript","Cronômetro interativo para o navegador com JavaScript."],
    ["Calculos-Financeiros","Dart","Cálculos financeiros implementados em Dart."],
    ["Viagem_Espaco","Dart","Projeto temático de viagem espacial desenvolvido em Dart."],
    ["Manipulacao_Arquivos","Python","Leitura e escrita de arquivos com Python."],
    ["Estruturas_Compostas","Python","Listas, tuplas e dicionários aplicados em exercícios práticos."],
    ["Portfolio","HTML","Versão anterior do meu portfólio pessoal em HTML e CSS."]
  ];
  colors.HTML="#E34C26";
  const grid=document.getElementById("projects");
  grid.innerHTML=projects.map(function(p){
    return '<a class="proj'+(p[3]?" feat":"")+'" data-lang="'+p[1]+'" href="https://github.com/vnniwzx/'+p[0]+'" target="_blank" rel="noopener">'+(p[3]?'<span class="ribbon">DESTAQUE</span>':'')+'<div class="meta"><span class="lang-dot" style="--c:'+colors[p[1]]+'">'+(p[1]==="SQL"?"T-SQL":p[1])+'</span><span>Repo</span></div><h3>'+p[0].replace(/[_-]/g," ")+'</h3><p>'+p[2]+'</p><span class="go">Ver código <span>↗</span></span></a>';
  }).join("");
  document.querySelectorAll(".filters button").forEach(function(b){
    b.addEventListener("click",function(){
      document.querySelectorAll(".filters button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});
      const f=b.dataset.f;let n=0;
      grid.querySelectorAll(".proj").forEach(function(c){
        const show=(f==="all"||c.dataset.lang===f);
        c.hidden=!show;c.style.display=show?"":"none";
        c.classList.remove("in");
        if(show){void c.offsetWidth;c.style.animationDelay=(n++*.06)+"s";c.classList.add("in")}
      });
    });
  });

  // photo tilt
  const frame=document.getElementById("frame");
  if(!reduce && matchMedia("(hover:hover)").matches){
    frame.parentElement.addEventListener("mousemove",function(e){
      const r=frame.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      frame.style.animation="none";
      frame.style.transform="rotateY("+(x*10)+"deg) rotateX("+(-y*10)+"deg)";
    });
    frame.parentElement.addEventListener("mouseleave",function(){frame.style.transform=""});
  }

  // progress bar
  const bar=document.getElementById("progress");
  addEventListener("scroll",function(){
    const h=document.documentElement.scrollHeight-innerHeight;
    bar.style.width=(h>0?scrollY/h*100:0)+"%";
  },{passive:true});

  // toast + copy
  const toast=document.getElementById("toast");let tt;
  function show(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("show")},2600)}
  document.querySelectorAll("[data-copy]").forEach(function(btn){btn.addEventListener("click",function(){
    const node=document.getElementById(btn.dataset.copy),label=btn.dataset.label,t=node.textContent;
    function fallback(){const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r);show(label+" selecionado. Use Ctrl+C para copiar")}
    try{navigator.clipboard.writeText(t).then(function(){show(label+" copiado ✓")},fallback)}catch(e){fallback()}
  })});

  // konami
  const code=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let pos=0;
  addEventListener("keydown",function(e){
    const k=e.key.length===1?e.key.toLowerCase():e.key;
    pos=(k===code[pos])?pos+1:(k===code[0]?1:0);
    if(pos===code.length){pos=0;show("🎮 +1000 XP · Conquista desbloqueada: contratar o Vinicius");document.body.animate([{filter:"hue-rotate(0deg)"},{filter:"hue-rotate(360deg)"}],{duration:1200})}
  });
})();

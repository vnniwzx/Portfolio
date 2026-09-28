const $$=s=>[...document.querySelectorAll(s)];
$$('[data-split]').forEach(e=>{e.setAttribute('aria-label',e.textContent);e.innerHTML=[...e.textContent].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${c}</span>`).join('')});
$$('.meter').forEach(m=>{m.innerHTML=Array.from({length:5},(_,i)=>`<s class="${i<m.dataset.n?'on':''}" style="--k:${i}"></s>`).join('')});
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.4}):null;
$$('.lang').forEach(e=>io?io.observe(e):e.classList.add('in'));
function tab(n){$$('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===n));$$('.pane').forEach(p=>p.classList.toggle('show',p.id===n))}
$$('[data-tab]').forEach(a=>a.addEventListener('click',()=>tab(a.dataset.tab)));
const bar=document.querySelector('.bar');
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?scrollY/h:0})`},{passive:true});

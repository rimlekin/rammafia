const hero=document.getElementById('hero'),cnt=document.getElementById('cnt');
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// логотип по буквам
'РамМафия'.split('').forEach((c,i)=>{const s=document.createElement('span');s.textContent=c;s.style.animationDelay=(i*.07+.15)+'s';document.getElementById('logo').append(s)});
// прожектор
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
// падающие стулья
let n=0;const words=['БАХ!','ГРОХ!','УПАЛ!','ОЙ!','ТРЕСК!'];
function spawn(){
  if(document.hidden)return;
  const c=document.createElement('button');c.className='chair';c.textContent='🪑';c.setAttribute('aria-label','Упавший стул');
  c.style.left=(Math.random()*92)+'%';c.style.fontSize=(30+Math.random()*36)+'px';c.style.animationDuration=(3.5+Math.random()*4)+'s';
  c.addEventListener('animationend',()=>c.remove());
  c.addEventListener('click',e=>{
    n++;cnt.textContent=n;
    const p=document.createElement('span');p.className='pop';p.textContent=words[Math.floor(Math.random()*words.length)];
    const r=hero.getBoundingClientRect();p.style.left=(e.clientX-r.left-30)+'px';p.style.top=(e.clientY-r.top-20)+'px';
    hero.append(p);setTimeout(()=>p.remove(),800);c.remove();
    hero.classList.remove('shake');void hero.offsetWidth;hero.classList.add('shake');
    if(n===10)cnt.textContent='10 — ты в деле!';
  });
  hero.append(c);
}
for(let i=0;i<3;i++)setTimeout(spawn,i*350);
setInterval(spawn,rm?3000:850);
// появление при скролле + счётчики
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-to]').forEach(b=>{
    const to=+b.dataset.to,d=+(b.dataset.d||0),t0=performance.now();
    (function f(t){const k=Math.min((t-t0)/1400,1);b.textContent=(to*k).toFixed(d).replace('.',',');if(k<1)requestAnimationFrame(f)})(t0);
  });
}),{threshold:.2});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// день / ночь
const tb=document.getElementById('tb');
tb.onclick=()=>{
  const day=document.documentElement.dataset.theme!=='day';
  document.documentElement.dataset.theme=day?'day':'night';
  tb.innerHTML=day?'☀️ <span>Город просыпается</span>':'🌙 <span>Город засыпает</span>';
};
// меню на телефоне
const nav=document.getElementById('nav'),bg=document.getElementById('bg');
bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');bg.setAttribute('aria-expanded','false')}));
// роли
const R=[['🔪','Мафия','Ночью выбираешь жертву, днём — играешь невинного.'],['🏘','Мирный житель','Твоё оружие — внимание и голос. Найди мафию!'],['🕵️','Комиссар','Каждую ночь проверяешь одного игрока. Главное — не выдать себя.'],['💉','Доктор','Спасаешь одного игрока за ночь. Угадаешь — город твой должник.'],['🎭','Маньяк','Играешь сам за себя. Опасен для всех.']];
const fl=document.getElementById('fl');
document.getElementById('draw').onclick=()=>{
  const go=()=>{const r=R[Math.floor(Math.random()*R.length)];
    re.textContent=r[0];rn.textContent=r[1];rd.textContent=r[2];fl.classList.add('on')};
  if(fl.classList.contains('on')){fl.classList.remove('on');setTimeout(go,400)}else go();
};

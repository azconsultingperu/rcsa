const burger=document.getElementById('burgerBtn'), menu=document.getElementById('mobileMenu');
if(burger&&menu){
  burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o?'true':'false')});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}));
}
// Reveal with stagger
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      const idx=[...els].indexOf(e.target);
      setTimeout(()=>e.target.classList.add('in'), idx%3*60);
      io.unobserve(e.target)
    }
  }),{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el))
}else els.forEach(el=>el.classList.add('in'));

// Header hide/show on scroll + shadow intensity
let lastY=0, ticking=false;
const header=document.querySelector('header');
window.addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      if(header){
        if(y>80) header.style.boxShadow='0 8px 32px rgba(0,0,0,.28), 0 1px 4px rgba(0,0,0,.15)';
        else header.style.boxShadow='0 4px 24px rgba(0,0,0,.2)';
        if(y>lastY && y>300) header.style.transform='translateY(-100%)';
        else header.style.transform='translateY(0)';
        header.style.transition='transform .35s cubic-bezier(.22,.61,.36,1), box-shadow .3s';
      }
      lastY=y; ticking=false;
    }); ticking=true;
  }
});

// Parallax subtle for hero radar
const radar=document.querySelector('.hero-radar');
if(radar && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    radar.style.transform=`translateY(calc(-50% + ${y*0.06}px))`;
  }, {passive:true});
}

// Copy mail
const copyBtn=document.getElementById('copyMail');
if(copyBtn){
  copyBtn.addEventListener('click',async()=>{
    const t=document.getElementById('mailText').textContent.trim();
    try{await navigator.clipboard.writeText(t)}catch(e){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
    const toast=document.getElementById('toast');if(toast){toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
    copyBtn.textContent='✓ Copiado'; setTimeout(()=>copyBtn.textContent='Copiar',1500);
  });
}

// Smooth focus for keyboard users
document.addEventListener('keydown',e=>{
  if(e.key==='Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown',()=>document.body.classList.remove('keyboard-nav'));

// Scroll to top
const scrollBtn=document.getElementById('scrollTop');
if(scrollBtn){
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400) scrollBtn.classList.add('visible');
    else scrollBtn.classList.remove('visible');
  }, {passive:true});
  scrollBtn.addEventListener('click',()=>window.scrollTo({top:0, behavior:'smooth'}));
}
// Preload images hover
document.querySelectorAll('.op-card.real img, .service-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{el.style.willChange='transform'}, {once:true});
});

import { useEffect, useState } from '/src/vendor/react.bundle.mjs';
import { applyLanguage } from '../i18n';

const links = [['/suites','Suites'],['/dining','Mesa'],['/experiences','Experiências'],['/journal','Journal']];
const A=({to,go,children,className='',onNavigate})=><a className={className} href={to} onClick={e=>{e.preventDefault();onNavigate?.();go(to)}}>{children}</a>;

function useExperienceRail(path){useEffect(()=>{if(path!=='/experiences')return;const rail=document.querySelector('.experience-rail, .rail'),controls=document.querySelectorAll('.railmeta button');if(!rail||controls.length!==2)return;const cards=[...rail.querySelectorAll(':scope > button')];let visible=false,hoverPaused=false,lastWheel=0,blockedUntil=0,autoClick=false;const prioritize=(delay=2200)=>{if(!autoClick)blockedUntil=Date.now()+delay};const advance=()=>{if(!visible||hoverPaused||Date.now()<blockedUntil)return;autoClick=true;controls[1].click();autoClick=false};const interval=setInterval(advance,1800);const onWheel=e=>{const now=Date.now();if(Math.abs(e.deltaY)<12||now-lastWheel<500)return;lastWheel=now;controls[e.deltaY>0?1:0].click();prioritize()};const onEnter=()=>{hoverPaused=true};const onLeave=()=>{hoverPaused=false;blockedUntil=Date.now()+900};const onFocus=()=>{hoverPaused=true};const onBlur=()=>{hoverPaused=false;blockedUntil=Date.now()+900};const onControlClick=()=>prioritize();const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{threshold:.2});observer.observe(rail);cards.forEach(card=>{card.addEventListener('pointerenter',onEnter);card.addEventListener('pointerleave',onLeave);card.addEventListener('focus',onFocus);card.addEventListener('blur',onBlur)});controls.forEach(control=>control.addEventListener('click',onControlClick));rail.addEventListener('wheel',onWheel,{passive:true});return()=>{clearInterval(interval);observer.disconnect();rail.removeEventListener('wheel',onWheel);cards.forEach(card=>{card.removeEventListener('pointerenter',onEnter);card.removeEventListener('pointerleave',onLeave);card.removeEventListener('focus',onFocus);card.removeEventListener('blur',onBlur)});controls.forEach(control=>control.removeEventListener('click',onControlClick))}},[path])}

export function Header({path,go}){
  const[open,setOpen]=useState(false);
  const[language,setLanguage]=useState(()=>localStorage.getItem('juniper-language')||'en');
  useExperienceRail(path);
  useEffect(()=>{if(!open)return undefined;const previous=document.body.style.overflow;document.body.style.overflow='hidden';document.body.classList.add('menu-open');return()=>{document.body.style.overflow=previous;document.body.classList.remove('menu-open')}},[open]);
  useEffect(()=>{if(path!=='/suites')return;const room=Number(new URLSearchParams(location.search).get('room'));if(Number.isInteger(room)&&room>=0&&room<3){const id=requestAnimationFrame(()=>document.querySelectorAll('.suites>aside button')[room]?.click());return()=>cancelAnimationFrame(id)}},[path]);
  useEffect(()=>{const id=setTimeout(()=>applyLanguage(language),0);localStorage.setItem('juniper-language',language);return()=>clearTimeout(id)},[language,path]);
  return <header className={`header ${open?'open':''}`}>
    <A to="/" go={go} className="brand" onNavigate={()=>setOpen(false)}>JUNIPER</A>
    <nav id="primary-navigation">{links.map(([to,label])=><A key={to} to={to} go={go} onNavigate={()=>setOpen(false)} className={path===to?'active':''}>{label}</A>)}</nav>
    <div className="header-actions">
      <div className="language-switch" role="group" aria-label="Language"><button className={language==='en'?'active':''} onClick={()=>setLanguage('en')} aria-label="English">EN</button><i/><button className={language==='pt'?'active':''} onClick={()=>setLanguage('pt')} aria-label="Português">PT</button></div>
      <A to="/reservations" go={go} className="book">Reservar ↗</A>
    </div>
    <button className="hamb" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Menu'} aria-expanded={open} aria-controls="primary-navigation"><i/><i/></button>
  </header>
}

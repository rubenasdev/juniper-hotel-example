import { forwardRef, useEffect, useRef, useState } from 'react';
import { applyLanguage } from '../i18n';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useLanguage } from '../hooks/useLanguage';

const links = [['/suites','Suites'],['/dining','Mesa'],['/experiences','Experiências'],['/journal','Journal']];
const A=({to,go,children,className='',onNavigate})=><a className={className} href={to} onClick={e=>{e.preventDefault();onNavigate?.();go(to)}}>{children}</a>;

export const Header = forwardRef(function Header({path,go,contentRef},headerRef){
  const navigationRef=useRef(null);
  const[open,setOpen]=useState(false);
  const language=useLanguage();
  const[pastHero,setPastHero]=useState(false);
  useBodyScrollLock(open);
  useEffect(()=>{if(!open)return undefined;document.body.classList.add('menu-open');navigationRef.current?.querySelector('a')?.focus();const close=event=>{if(event.key==='Escape')setOpen(false)};window.addEventListener('keydown',close);return()=>{document.body.classList.remove('menu-open');window.removeEventListener('keydown',close)}},[open]);
  useEffect(()=>{
    if(!path.startsWith('/experiences/')) return undefined;
    const update=()=>{const hero=contentRef.current?.querySelector('.experience-detail-hero');setPastHero(window.scrollY>Math.max(80,(hero?.offsetHeight||window.innerHeight)-76))};
    const frame=requestAnimationFrame(update);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
  },[path,contentRef]);
  return <header ref={headerRef} className={`header ${open?'open':''} ${path.startsWith('/experiences/')&&pastHero?'after-hero':''}`}>
    <A to="/" go={go} className="brand" onNavigate={()=>setOpen(false)}>JUNIPER</A>
    <nav ref={navigationRef} id="primary-navigation">{links.map(([to,label])=><A key={to} to={to} go={go} onNavigate={()=>setOpen(false)} className={path===to||(to==='/experiences'&&path.startsWith('/experiences/'))?'active':''}>{label}</A>)}</nav>
    <div className="header-actions">
      <div className="language-switch" role="group" aria-label="Language"><button className={language==='en'?'active':''} onClick={()=>applyLanguage('en')} aria-pressed={language==='en'} aria-label="English">EN</button><i/><button className={language==='pt'?'active':''} onClick={()=>applyLanguage('pt')} aria-pressed={language==='pt'} aria-label="Português">PT</button></div>
      <A to="/reservations" go={go} className="book">Reservar ↗</A>
    </div>
    <button className="hamb" onClick={()=>setOpen(value=>!value)} aria-label={open?'Close menu':'Menu'} aria-expanded={open} aria-controls="primary-navigation"><i/><i/></button>
  </header>
});

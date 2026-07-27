import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { GalleryDialog } from '../components/gallery/GalleryDialog';
import { Icon } from '../components/ui/Icon';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { gsap } from '../lib/gsap';
import { suites } from '../data/suites';
import { ArrowLeft, ArrowRight, PageLink as Link } from './shared';

export function Suites({go}){
  const[a,setA]=useState(()=>{const room=Number(new URLSearchParams(location.search).get('room'));return Number.isInteger(room)&&room>=0&&room<suites.length?room:0}),[photo,setPhoto]=useState(0),[detailTab,setDetailTab]=useState('features'),[imageOpen,setImageOpen]=useState(false);
  const galleryRef=useRef(null),animating=useRef(false),s=suites[a];
  const selectSuite=i=>{if(animating.current)return;setA(i);setPhoto(0)};
  const galleryOrder=s.photos.map((src,index)=>({src,index})).filter(item=>item.index!==photo).sort((x,y)=>((x.index-photo+s.photos.length)%s.photos.length)-((y.index-photo+s.photos.length)%s.photos.length));
  const transitionTo=(next,source)=>{
    if(next===photo||animating.current)return;
    const gallery=galleryRef.current;
    const card=source||gallery?.querySelector(`[data-photo="${next}"]`);
    const stage=gallery?.querySelector('.suiteimg'),current=stage?.querySelector(':scope > img');
    const shade=gallery?.querySelector('.suite-shade'),copy=gallery?.querySelector('.suite-carousel-copy'),ui=gallery?.querySelector('.suite-carousel-ui');
    if(!gsap||!card||!stage||window.matchMedia('(prefers-reduced-motion: reduce)').matches){setPhoto(next);return}
    animating.current=true;
    const from=card.getBoundingClientRect(),to=stage.getBoundingClientRect();
    const flight=document.createElement('img');
    flight.className='suite-card-flight';flight.src=s.photos[next];flight.alt='';stage.appendChild(flight);
    gsap.set(flight,{position:'absolute',left:from.left-to.left,top:from.top-to.top,width:from.width,height:from.height,zIndex:10,objectFit:'cover',borderRadius:3});
    const cards=Array.from(gallery.querySelectorAll('.suite-thumbnails button'));
    const shift=from.width+10;
    gsap.timeline({defaults:{ease:'sine.inOut'},onComplete:()=>{setPhoto(next);requestAnimationFrame(()=>requestAnimationFrame(()=>{gsap.set([current,...cards],{clearProps:'transform,opacity'});gsap.timeline({onComplete:()=>{flight.remove();animating.current=false}}).to(flight,{opacity:0,duration:.16,ease:'sine.out'}).to(shade,{opacity:1,duration:.58,ease:'sine.out'},'>-.02').fromTo(copy,{opacity:0,y:22},{opacity:1,y:0,duration:.55,ease:'power2.out'},'<.08').fromTo(ui,{opacity:0,y:12},{opacity:1,y:0,duration:.48,ease:'power2.out'},'<.08')}))}})
      .to(cards,{x:-shift,opacity:(i,el)=>el===card?0:1,duration:.72,stagger:.035},0)
      .to([shade,copy,ui],{opacity:0,duration:.22,ease:'sine.out'},0)
      .to(current,{scale:1.08,opacity:.32,duration:.82},0)
      .to(flight,{left:0,top:0,width:to.width,height:to.height,borderRadius:0,duration:.88},0);
  };
  const move=step=>transitionTo((photo+step+s.photos.length)%s.photos.length);
  const moveOnTimer=useEffectEvent(()=>move(1));
  useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setTimeout(moveOnTimer,5200);return()=>clearTimeout(timer)},[a,photo,s.photos.length]);
  useBodyScrollLock(imageOpen);
  useEffect(()=>{if(!imageOpen)return;const close=event=>{if(event.key==='Escape')setImageOpen(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[imageOpen]);
  const handleTabKeyDown=event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=[...event.currentTarget.querySelectorAll('[role="tab"]')],current=tabs.indexOf(document.activeElement),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next]?.focus();tabs[next]?.click()};
  return <section className="suites">
    <header><h1>Espaços<br/>de calma.</h1><p>Cada quarto é uma paisagem privada, desenhada para devolver espaço ao tempo.</p></header>
    <aside>{suites.map((x,i)=><button key={x.name} className={a===i?'active':''} onClick={()=>selectSuite(i)}><small>0{i+1}</small>{x.name}</button>)}</aside>
    <div ref={galleryRef} className="suitegallery cinematic"><div className="suiteimg">
      <img key={s.photos[photo]} src={s.photos[photo]} alt={`${s.name} — fotografia ${photo+1}`}/><div className="suite-shade"/>
      <button className="suite-image-open" onClick={()=>setImageOpen(true)} aria-label="Ver imagem em tamanho completo"><Icon name="expand" size={19}/><span>Ver imagem</span></button>
      <div className="suite-carousel-copy"><small>0{a+1} · {s.meta}</small><h2>{s.name}</h2><p>{s.description}</p><Link to="/reservations" go={go} light>Ver disponibilidade</Link></div>
      <div className="suite-carousel-ui"><div className="suite-thumbnails" aria-label={`Galeria da ${s.name}`}>{galleryOrder.map(({src,index})=><button key={src} data-photo={index} className={index===photo?'active':''} aria-pressed={index===photo} onClick={event=>transitionTo(index,event.currentTarget)} aria-label={`Ver fotografia ${index+1} da ${s.name}`}><img src={src} alt=""/><span>0{index+1}</span></button>)}</div><div className="suite-controls"><button onClick={()=>move(-1)} aria-label="Fotografia anterior"><ArrowLeft/></button><button onClick={()=>move(1)} aria-label="Fotografia seguinte"><ArrowRight/></button><div className="suite-progress"><i key={`${a}-${photo}`}/></div><b>0{photo+1}</b><span>/ 0{s.photos.length}</span></div></div>
    </div></div>
    {imageOpen?<GalleryDialog images={s.photos} activeIndex={photo} title={s.name} variant="suite" onClose={()=>setImageOpen(false)} onChange={setPhoto}/>:null}
    <section className="suite-details" aria-labelledby="suite-details-title"><h2 id="suite-details-title">Detalhes</h2><div className="detail-tabs" role="tablist" aria-label="Detalhes da suite" onKeyDown={handleTabKeyDown}><button id="suite-tab-features" role="tab" aria-controls="suite-detail-panel" aria-selected={detailTab==='features'} tabIndex={detailTab==='features'?0:-1} className={detailTab==='features'?'active':''} onClick={()=>setDetailTab('features')}>Características</button><button id="suite-tab-amenities" role="tab" aria-controls="suite-detail-panel" aria-selected={detailTab==='amenities'} tabIndex={detailTab==='amenities'?0:-1} className={detailTab==='amenities'?'active':''} onClick={()=>setDetailTab('amenities')}>Comodidades</button></div>{detailTab==='features'?<div id="suite-detail-panel" className="feature-grid" role="tabpanel" aria-labelledby="suite-tab-features">{s.features.map(([icon,title,text])=><article key={title}><Icon name={icon} size={44}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>:<div id="suite-detail-panel" className="amenity-grid" role="tabpanel" aria-labelledby="suite-tab-amenities">{s.amenities.map(([group,items])=><article key={group}><h3>{group}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>}</section>
  </section>
}


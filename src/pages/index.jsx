import {useEffect,useRef,useState} from 'react';
import {Hero} from '../components/Hero';
import {useGsapContext} from '../hooks/useGsapContext';
import {BookingOptionCard} from '../components/booking/BookingOptionCard';
import {GalleryDialog} from '../components/gallery/GalleryDialog';
import {Icon} from '../components/ui/Icon';
import {MediaVideo} from '../components/ui/MediaVideo';
const ArrowRight=p=><Icon name="right" {...p}/>,ArrowLeft=p=><Icon name="left" {...p}/>,CalendarDays=p=><Icon name="calendar" {...p}/>,Minus=p=><Icon name="minus" {...p}/>,Plus=p=><Icon name="plus" {...p}/>;
const img={suite:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=88',garden:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=88',atelier:'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=2000&q=88',dining:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=88',spa:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=88',coast:'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=2000&q=88',horse:'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=88',field:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88'};
const Link=({to,go,children,light=false})=><a className={`link ${light?'light':''}`} href={to} onClick={e=>{e.preventDefault();go(to)}}>{children}<ArrowRight size={14}/></a>;
const sectionLinks=[['home-opening','Abertura'],['home-essence','Essência'],['home-stay','Permanecer'],['home-rooms','Alojamentos'],['home-spa','Spa'],['home-table','Mesa'],['home-reserve','Reservar']];
function SectionNav(){const[active,setActive]=useState('home-opening');useEffect(()=>{const footer=document.querySelector('footer');if(footer)footer.id='home-reserve';const elements=sectionLinks.map(([id])=>document.getElementById(id)).filter(Boolean);const observer=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActive(visible.target.id)},{rootMargin:'-32% 0px -48%',threshold:[0,.1,.35,.6]});elements.forEach(element=>observer.observe(element));return()=>{observer.disconnect();if(footer)footer.removeAttribute('id')}},[]);const jump=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});return <nav className="section-nav" aria-label="Secções da homepage">{sectionLinks.map(([id,label],index)=><button key={id} className={active===id?'active':''} onClick={()=>jump(id)} aria-label={`Ir para ${label}`}><i/><span><small>0{index+1}</small>{label}</span></button>)}</nav>}
export function Home({go,canPlay=true}){const root=useRef(null);useGsapContext(root,()=>{const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.utils.toArray('.scroll-reveal').forEach(section=>{gsap.from(Array.from(section.children),{autoAlpha:0,y:70,duration:1.15,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 78%',once:true}})});gsap.from('.preview>img',{clipPath:'inset(12%)',scale:1.08,duration:1.5,ease:'power3.out',scrollTrigger:{trigger:'.preview',start:'top 75%',once:true}})});return()=>mm.revert()},[]);return <div ref={root}><SectionNav/><div id="home-opening"><Hero canPlay={canPlay}/></div><section id="home-essence" className="manifest scroll-reveal"><small>Juniper não é um lugar para visitar.</small><h2>É um lugar para <em>sentir</em> — devagar, com todos os sentidos.</h2><div><span>Arquitetura silenciosa</span><span>Cozinha da terra</span><span>Rituais de bem-estar</span></div></section><section id="home-stay" className="preview scroll-reveal"><img src={img.garden} alt="Pátio privado da Garden House"/><div><small>01 / Permanecer</small><h2>Espaços que<br/>guardam a calma.</h2><p>Materiais naturais, luz filtrada e a intimidade rara de não precisar de mais nada.</p><Link to="/suites" go={go}>Explorar suites</Link></div></section></div>}
const suiteLandscapePhotos=[
  ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=88'],
  ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=88'],
  ['https://images.pexels.com/photos/5461600/pexels-photo-5461600.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461582/pexels-photo-5461582.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461590/pexels-photo-5461590.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&w=2000']
];
const suiteDefinitions=[
  {name:'Cabana',meta:'52 m² · Jardim privado',description:'Entre pinheiros, abre-se para um terraço protegido e manhãs sem pressa.',photos:['https://images.unsplash.com/photo-1748007702945-cca7b75d96ca?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1748007702787-612b3ab4adb1?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1748007702852-afd852d6f1b5?auto=format&fit=crop&w=2000&q=88','https://images.unsplash.com/photo-1748007702716-0ba414a96ceb?auto=format&fit=crop&w=2000&q=88'],features:[['bed','Cama','Uma cama king e sofá de leitura'],['users','Ocupação','2 adultos'],['expand','Área','52 m² interiores · jardim de 34 m²'],['bath','Casa de banho','Walk-in shower e duche exterior'],['star','Distintivo','Jardim resguardado entre pinheiros'],['home','Disponibilidade','4 cabanas independentes']],amenities:[['No quarto',['Minibar refrigerado','Cofre individual','Máquina de café e chá']],['Conforto',['Roupões de algodão','Almofadas hipoalergénicas','Climatização silenciosa']],['Serviço',['Housekeeping diário','Concierge 24 horas','Room service até às 23h']],['Tecnologia',['Wi-Fi de alta velocidade','Smart TV 55”','Coluna Bluetooth']]]},
  {name:'Juniper Villa',meta:'78 m² · Terraço panorâmico',description:'Luz ampla, materiais naturais e uma varanda aberta sobre a paisagem da Comporta.',photos:['https://images.pexels.com/photos/36852532/pexels-photo-36852532.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/36852535/pexels-photo-36852535.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/36852537/pexels-photo-36852537.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/36852544/pexels-photo-36852544.jpeg?auto=compress&cs=tinysrgb&w=2000'],features:[['bed','Camas','Cama king e sofá-cama individual'],['users','Ocupação','3 adultos ou 2 adultos e 1 criança'],['expand','Área','78 m² interiores · terraço de 28 m²'],['bath','Casa de banho','Banheira, duche walk-in e lavatório duplo'],['terrace','Distintivo','Terraço panorâmico orientado a poente'],['home','Disponibilidade','2 villas exclusivas']],amenities:[['No quarto',['Minibar de cortesia','Cofre para portátil','Máquina Nespresso']],['Bem-estar',['Banheira profunda','Menu de almofadas','Produtos botânicos Juniper']],['Serviço',['Housekeeping duas vezes ao dia','Concierge dedicado','Pequeno-almoço no terraço']],['Tecnologia',['Wi-Fi de alta velocidade','Smart TV 65”','Sistema de som integrado']]]},
  {name:'Atelier',meta:'64 m² · Pátio de água',description:'Um refúgio sereno onde a pedra, a madeira e a água desenham o ritmo do dia.',photos:['https://images.pexels.com/photos/5461579/pexels-photo-5461579.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461582/pexels-photo-5461582.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461590/pexels-photo-5461590.jpeg?auto=compress&cs=tinysrgb&w=2000','https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&w=2000'],features:[['bed','Camas','Uma cama king ou duas camas twin'],['users','Ocupação','2 adultos'],['expand','Área','64 m² interiores · pátio de 20 m²'],['bath','Casa de banho','Duche de chuva e banheira de imersão'],['star','Distintivo','Pátio de água e mesa de trabalho artesanal'],['home','Disponibilidade','3 ateliers']],amenities:[['No quarto',['Bar de autor','Cofre individual','Mesa de trabalho']],['Conforto',['Lençóis de linho português','Roupões e chinelos','Controlo individual de temperatura']],['Serviço',['Housekeeping diário','Concierge 24 horas','Serviço de lavandaria']],['Tecnologia',['Wi-Fi de alta velocidade','Smart TV 55”','Carregamento USB-C']]]}
];
const suites=suiteDefinitions.map((suite,index)=>({...suite,photos:suiteLandscapePhotos[index]}));
export function Suites({go}){
  const[a,setA]=useState(0),[photo,setPhoto]=useState(0),[detailTab,setDetailTab]=useState('features'),[imageOpen,setImageOpen]=useState(false);
  const galleryRef=useRef(null),animating=useRef(false),s=suites[a];
  const selectSuite=i=>{if(animating.current)return;setA(i);setPhoto(0)};
  const galleryOrder=s.photos.map((src,index)=>({src,index})).filter(item=>item.index!==photo).sort((x,y)=>((x.index-photo+s.photos.length)%s.photos.length)-((y.index-photo+s.photos.length)%s.photos.length));
  const transitionTo=(next,source)=>{
    if(next===photo||animating.current)return;
    const gallery=galleryRef.current,gsap=window.gsap;
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
  // The timer intentionally restarts when the active suite or photo changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setTimeout(()=>move(1),5200);return()=>clearTimeout(timer)},[a,photo,s.photos.length]);
  useEffect(()=>{if(!imageOpen)return;const previous=document.body.style.overflow;const close=event=>{if(event.key==='Escape')setImageOpen(false)};document.body.style.overflow='hidden';window.addEventListener('keydown',close);return()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',close)}},[imageOpen]);
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
    <section className="suite-details" aria-labelledby="suite-details-title"><h2 id="suite-details-title">Detalhes</h2><div className="detail-tabs" role="tablist" aria-label="Detalhes da suite"><button role="tab" aria-selected={detailTab==='features'} className={detailTab==='features'?'active':''} onClick={()=>setDetailTab('features')}>Características</button><button role="tab" aria-selected={detailTab==='amenities'} className={detailTab==='amenities'?'active':''} onClick={()=>setDetailTab('amenities')}>Comodidades</button></div>{detailTab==='features'?<div className="feature-grid" role="tabpanel">{s.features.map(([icon,title,text])=><article key={title}><Icon name={icon} size={44}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>:<div className="amenity-grid" role="tabpanel">{s.amenities.map(([group,items])=><article key={group}><h3>{group}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>}</section>
  </section>
}
const menus={Jantar:[['Carabineiro da costa','arroz de tomate fumado, limão'],['Robalo de linha','batata doce, algas, ervas'],['Borrego alentejano','iogurte fumado, hortelã'],['Figo de verão','azeite, flor de sal']],Almoço:[['Ostra da ria','pepino, poejo'],['Salada do nosso jardim','queijo fresco, sementes'],['Peixe do dia','arroz caldoso, coentros']],Bar:[['Juniper No. 01','zimbro, limão, folha de figueira'],['Atlantic Highball','salicórnia, toranja'],['Noite Clara','amêndoa, flor de laranjeira']]};
const dishDetails={
  'Carabineiro da costa':['Grelhado sobre carvão e servido com um arroz cremoso de tomate fumado.','Crustáceos · Sulfitos'],
  'Robalo de linha':['Peixe da costa, curado brevemente e acompanhado por batata-doce assada e algas locais.','Peixe'],
  'Borrego alentejano':['Cozinhado lentamente com ervas do jardim, iogurte fumado e hortelã fresca.','Leite'],
  'Figo de verão':['Figo maduro, azeite novo e flor de sal numa sobremesa leve de estação.','Sem alergénios declarados'],
  'Ostra da ria':['Ostra fresca da ria com pepino marinado e óleo aromático de poejo.','Moluscos'],
  'Salada do nosso jardim':['Folhas e legumes colhidos no dia, queijo fresco e sementes tostadas.','Leite · Sésamo'],
  'Peixe do dia':['A seleção diária da lota, servida com arroz caldoso e coentros.','Peixe'],
  'Juniper No. 01':['Cocktail da casa, fresco e botânico, inspirado nos aromas do pinhal.','Contém álcool'],
  'Atlantic Highball':['Um highball mineral e cítrico com salicórnia da costa e toranja.','Contém álcool'],
  'Noite Clara':['Cocktail suave e aromático de amêndoa e flor de laranjeira.','Frutos de casca rija · Contém álcool']
};
const dishImages={
  'Carabineiro da costa':'https://images.pexels.com/photos/36605446/pexels-photo-36605446.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Robalo de linha':'https://images.pexels.com/photos/37400035/pexels-photo-37400035.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Borrego alentejano':'https://images.pexels.com/photos/36678413/pexels-photo-36678413.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Figo de verão':'https://images.pexels.com/photos/29228286/pexels-photo-29228286.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Ostra da ria':'https://images.pexels.com/photos/2647936/pexels-photo-2647936.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Salada do nosso jardim':'https://images.pexels.com/photos/30469688/pexels-photo-30469688.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Peixe do dia':'https://images.pexels.com/photos/19615788/pexels-photo-19615788.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Juniper No. 01':'https://images.pexels.com/photos/29707878/pexels-photo-29707878.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Atlantic Highball':'https://images.pexels.com/photos/24868932/pexels-photo-24868932.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'Noite Clara':'https://images.pexels.com/photos/36366522/pexels-photo-36366522.jpeg?auto=compress&cs=tinysrgb&w=1400'
};
const menuOpenings={
  Jantar:{image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=88',kicker:'Serviço de jantar',label:'O restaurante ao anoitecer'},
  Almoço:{image:'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=88',kicker:'Serviço de almoço',label:'Luz à mesa'},
  Bar:{image:'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=88',kicker:'Juniper Bar',label:'O balcão ao fim do dia'}
};
const diningVideos=['/media/dining-plating.mp4','/media/dining-finish.mp4','/media/dining-bar.mp4'];
function DiningVideoLoop(){
  const[active,setActive]=useState(0),videoRefs=useRef([]);
  useEffect(()=>{const current=videoRefs.current[active];if(current){current.currentTime=0;current.play().catch(()=>{})}},[active]);
  return <div className="dining-video-loop" aria-hidden="true">{diningVideos.map((src,index)=><MediaVideo key={src} ref={element=>videoRefs.current[index]=element} src={src} className={active===index?'active':''} autoPlay={index===0} preload={index===0?'auto':'metadata'} onEnded={()=>{if(active===index)setActive((index+1)%diningVideos.length)}}/>)}<div className="dining-video-mask"/><span className="dining-clip-count">0{active+1} / 03</span></div>
}
export function Dining({go}){
  const[m,setM]=useState('Jantar'),[menuLeaving,setMenuLeaving]=useState(false),[expanded,setExpanded]=useState(null),[hoveredDish,setHoveredDish]=useState(null),menuTimer=useRef(null);
  const selectMenu=next=>{if(next===m||menuLeaving)return;setExpanded(null);setHoveredDish(null);setMenuLeaving(true);clearTimeout(menuTimer.current);menuTimer.current=setTimeout(()=>{setM(next);setMenuLeaving(false)},220)};
  useEffect(()=>()=>clearTimeout(menuTimer.current),[]);
  const featuredDish=hoveredDish||expanded,visual=featuredDish?{image:dishImages[featuredDish],kicker:'Seleção',label:featuredDish}:menuOpenings[m];
  return <section className="dining"><div className="dininghero cinematic"><DiningVideoLoop/><div className="dininghero-copy"><h1>Enraizada no<br/>lugar e na estação.</h1><p>A nossa cozinha é guiada pela terra, pela lagoa e pelo oceano.</p></div></div><div className="menuarea"><aside role="tablist" aria-label="Menus">{Object.keys(menus).map(x=><button key={x} role="tab" aria-selected={m===x} className={m===x?'active':''} onClick={()=>selectMenu(x)}><span>{x}</span></button>)}</aside><div key={m} className={`menu-list ${menuLeaving?'is-changing':''}`} role="tabpanel" aria-live="polite">{menus[m].map(([n,d],index)=>{const open=expanded===n,[description,allergens]=dishDetails[n];return <article key={n} className={open?'open':''} style={{'--menu-index':index}} onMouseEnter={()=>setHoveredDish(n)} onMouseLeave={()=>setHoveredDish(null)}><button className="dish-toggle" onFocus={()=>setHoveredDish(n)} onBlur={()=>setHoveredDish(null)} onClick={()=>setExpanded(open?null:n)} aria-expanded={open} aria-controls={`dish-${index}`}><span><h3>{n}</h3><p>{d}</p></span><Plus size={15}/></button><div className="dish-more" id={`dish-${index}`} aria-hidden={!open}><div><p>{description}</p><small><b>Alergénios</b>{allergens}</small></div></div></article>})}</div><figure className="dish-visual"><img key={visual.image} src={visual.image} alt={visual.label}/><figcaption><span>{visual.kicker}</span>{visual.label}</figcaption></figure></div><div className="diningcta"><p>Uma mesa, ao ritmo do dia.</p><Link to="/reservations" go={go} light>Reservar mesa</Link></div></section>
}
const experienceCatalog=[
  {slug:'praia-oceano',title:'Praia & oceano',hero:img.coast,secondary:img.field,kicker:'Atlântico · 3 horas',lead:'Uma manhã desenhada pela maré.',description:'Partimos cedo para caminhar na areia ainda vazia, descobrir a costa e mergulhar onde o oceano encontra a lagoa.',duration:'3 horas',season:'Todo o ano',guests:'1—6 pessoas',includes:['Transfer privado','Guia local','Toalhas e água','Pequeno-almoço na praia'],steps:[['07:30','Partida do Juniper'],['08:00','Caminhada na costa'],['09:15','Mergulho ou pausa junto à lagoa'],['10:00','Pequeno-almoço na areia']]},
  {slug:'cavalo-pinhal',title:'A cavalo na praia',hero:img.horse,secondary:img.coast,kicker:'Praia · 2 horas',lead:'Um passeio ao ritmo das marés.',description:'Um percurso privado entre a areia, as dunas e o Atlântico, adaptado à experiência de cada cavaleiro e ao ritmo da maré.',duration:'2 horas',season:'Setembro—Junho',guests:'1—4 pessoas',includes:['Transfer privado','Cavalo e equipamento','Guia equestre','Refresco no final'],steps:[['08:30','Encontro no Juniper'],['09:00','Preparação e introdução'],['09:20','Travessia da praia'],['10:30','Regresso e refresco']]},
  {slug:'arrozais-aldeias',title:'Arrozais & aldeias',hero:img.field,secondary:img.horse,kicker:'Comporta · Meio dia',lead:'Histórias guardadas entre a terra e a água.',description:'Conheça produtores, artesãos e lugares discretos da Comporta numa viagem construída à volta da estação.',duration:'4 horas',season:'Todo o ano',guests:'2—6 pessoas',includes:['Guia privado','Transporte','Visita a um artesão','Prova de produtos locais'],steps:[['09:30','Partida do hotel'],['10:00','Cais Palafítico'],['11:00','Atelier ou produtor local'],['12:15','Prova junto aos arrozais']]},
  {slug:'wellness-rituais',title:'Bem-estar & rituais',hero:img.spa,secondary:img.atelier,kicker:'Juniper Spa · 90 minutos',lead:'Regressar ao corpo, sem pressa.',description:'Um ritual privado inspirado no zimbro, sal marinho e plantas da região, criado de acordo com aquilo de que o corpo precisa.',duration:'90 minutos',season:'Todo o ano',guests:'1—2 pessoas',includes:['Consulta breve','Ritual corporal','Infusão botânica','Acesso à zona de repouso'],steps:[['00:00','Chegada e consulta'],['00:15','Respiração e preparação'],['00:25','Tratamento personalizado'],['01:20','Infusão e repouso']]}
];
const experienceVideos={
  'praia-oceano':'/media/experience-ocean.mp4',
  'cavalo-pinhal':'/media/experience-horse.mp4',
  'arrozais-aldeias':'/media/experience-rice.mp4',
  'wellness-rituais':'/media/07-retreat.mp4'
};
const px=id=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2200`;
const experienceMedia={
  'praia-oceano':{
    intro:'Começamos à primeira luz e seguimos o ritmo do Atlântico — descalços, sem pressa e longe das praias mais percorridas.',
    momentsTitle:<>A maré conta<br/>o resto.</>,
    includedTitle:<>Só precisa de<br/>seguir o oceano.</>,
    bookingTitle:<>A próxima maré<br/>pode ser sua.</>,
    bookingText:'Ajustamos o percurso à maré, ao vento e ao ritmo que preferir.',
    overview:[px(20621401),px(17669407)],
    gallery:[px(457882),px(1032650),px(994605),px(1174732)],
    related:px(355312),
    chapters:[['07:30','Primeira luz','Café ainda quente, areia vazia e a primeira leitura da maré.',px(189349)],['08:00','Caminho costeiro','Seguimos pelas dunas e passadiços com o oceano sempre ao lado.',px(1261728)],['09:15','Lagoa','Uma pausa para entrar na água ou simplesmente ficar junto à margem.',px(1450360)],['10:00','Mesa na areia','Fruta, pão quente e café servidos num lugar resguardado.',px(376464)]]
  },
  'cavalo-pinhal':{
    intro:'Uma travessia privada entre pinheiros, dunas e mar, ajustada à experiência de cada cavaleiro e guiada por quem conhece estes trilhos.',
    momentsTitle:<>Entre rédeas,<br/>sombra e areia.</>,
    includedTitle:<>Tudo preparado<br/>para montar.</>,
    bookingTitle:<>Escolha o trilho.<br/>Nós tratamos do resto.</>,
    bookingText:'Adaptamos cavalo, duração e andamento à experiência de cada cavaleiro.',
    overview:[px(1996333),px(37184461)],
    gallery:[px(20781247),px(10586269),px(15259465),px(11247739)],
    related:px(18676549),
    chapters:[['08:30','Encontro','Conhecemos os cavalos e escolhemos o ritmo do percurso.',px(13282299)],['09:00','Sob os pinheiros','Entramos no pinhal por caminhos de areia fresca e sombra.',px(37654014)],['09:40','Dunas abertas','O trilho alarga-se e revela a linha do Atlântico.',px(33122042)],['10:15','Regresso lento','Terminamos com água fresca e tempo para cuidar dos cavalos.',px(5505668)]]
  },
  'arrozais-aldeias':{
    intro:'Um percurso conduzido por pessoas da terra, entre campos de água, cais tradicionais, ateliers e sabores que contam a Comporta.',
    momentsTitle:<>A paisagem feita<br/>por muitas mãos.</>,
    includedTitle:<>Portas que se abrem<br/>só para si.</>,
    bookingTitle:<>Conheça a Comporta<br/>por dentro.</>,
    bookingText:'Construímos cada visita de acordo com a estação, os ofícios e quem estiver disponível para nos receber.',
    overview:[px(14828729),px(7741484)],
    gallery:[px(5865443),px(247599),px(34360581),px(36813329)],
    related:px(37838041),
    chapters:[['09:30','Estrada dos campos','Partimos devagar pelos caminhos que dividem os arrozais.',px(16296436)],['10:00','Água e cultivo','Descobrimos como a paisagem muda com cada estação.',px(16296427)],['11:00','Ofício local','Entramos num atelier e conhecemos quem mantém um saber vivo.',px(8289978)],['12:15','Prova da terra','Terminamos à mesa com arroz, ervas e produtos da região.',px(29733497)]]
  },
  'wellness-rituais':{
    intro:'Um ritual silencioso e privado, preparado com zimbro, sal marinho e botânicos locais para devolver espaço ao corpo e à respiração.',
    momentsTitle:<>Quatro gestos<br/>para abrandar.</>,
    includedTitle:<>Tempo, silêncio<br/>e cuidado.</>,
    bookingTitle:<>O corpo também<br/>sabe regressar.</>,
    bookingText:'Personalizamos aromas, pressão e duração a partir de uma breve conversa consigo.',
    overview:[px(35884502),px(34478574)],
    gallery:[px(32729950),px(6724529),px(6311829),px(31390599)],
    related:px(6683021),
    chapters:[['00:00','Escuta','Uma breve conversa define intenção, pressão e aromas.',px(19695939)],['00:15','Respiração','Calor, silêncio e uma preparação lenta para o tratamento.',px(3757942)],['00:25','Ritual corporal','Movimentos personalizados com óleos botânicos da região.',px(6621182)],['01:20','Repouso','Infusão de ervas e tempo sem interrupções na sala de descanso.',px(3865676)]]
  }
};
const moments=experienceCatalog.map(({title,hero,lead,slug})=>[title,hero,lead,slug]);
const places=[['Praia da Comporta','Areia branca · 8 min','p0'],['Cais Palafítico','Carrasqueira · 14 min','p1'],['Museu do Arroz','Cultura local · 6 min','p2'],['Juniper Hotel','O seu ponto de partida','p3']];
export function Experiences({go}){const[a,setA]=useState(0),[place,setPlace]=useState(3);return <section className="experiences"><header><h1>Experiências que<br/>ficam consigo.</h1><p>De dias lentos na areia a encontros artesanais e paisagens inesperadas.</p></header><div className="rail">{moments.map((x,i)=><button key={x[0]} onMouseEnter={()=>setA(i)} onFocus={()=>setA(i)} onClick={()=>go(`/experiences/${x[3]}`)} className={a===i?'active':''} style={{backgroundImage:`url(${x[1]})`}} aria-label={`Descobrir ${x[0]}`}><span>0{i+1}</span><h2>{x[0]}</h2><i><ArrowRight/></i></button>)}</div><div className="railmeta"><p>{moments[a][2]}</p><span><button onClick={()=>setA((a+3)%4)}><ArrowLeft/></button>0{a+1} / 04<button onClick={()=>setA((a+1)%4)}><ArrowRight/></button></span></div><div className="map"><svg className="map-art" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path className="ocean" d="M0 0h445c52 90 13 166 70 244 50 69 22 145 73 219 43 62 36 143 82 237H0Z"/><path className="coastline" d="M445 0c52 90 13 166 70 244 50 69 22 145 73 219 43 62 36 143 82 237"/><g className="rice-fields"><path d="M710 60h760v118H690z"/><path d="M760 198h690v100H725z"/><path d="M690 320h790v112H650z"/><path d="M750 455h690v165H700z"/></g><g className="field-lines"><path d="M720 100h720M740 138h670M780 232h610M755 270h680M700 360h730M680 400h700M760 505h650M740 558h680"/></g><path className="road main-road" d="M510 650C750 520 800 350 1120 40"/><path className="road side-road" d="M720 500c230-20 420-130 690-170"/><path className="lagoon" d="M420 410c85-35 154-25 202 24-56 56-116 68-181 29-27-16-34-35-21-53Z"/><text x="115" y="610" className="water-label">OCEANO ATLÂNTICO</text><text x="1040" y="655" className="land-label">ARROZAIS DA COMPORTA</text></svg><div className="map-card"><span className="map-kicker">Entre o oceano e os arrozais</span><h2>Parta sem<br/>um destino.</h2><p>Desenhamos cada itinerário de acordo com o clima, a estação e a sua curiosidade.</p><div className="selected-place"><small>Selecionado</small><strong>{places[place][0]}</strong><span>{places[place][1]}</span></div><Link to={place===0?'/experiences/praia-oceano':place===1||place===2?'/experiences/arrozais-aldeias':'/reservations'} go={go}>{place===3?'Criar itinerário':'Descobrir experiência'}</Link></div><div className="compass"><b>N</b><i/></div>{places.map((x,i)=><button key={x[0]} className={`map-marker ${x[2]} ${place===i?'active':''}`} onClick={()=>setPlace(i)} aria-label={x[0]}><i/><span><b>{x[0]}</b><small>{x[1]}</small></span></button>)}<div className="map-legend"><span><i/>Hotel</span><span><i/>Descobrir</span></div></div></section>}
export function ExperienceDetail({go,slug}){
  const root=useRef(null),[chapter,setChapter]=useState(0),[lightbox,setLightbox]=useState(null);
  const experience=experienceCatalog.find(item=>item.slug===slug)||experienceCatalog[0];
  const media=experienceMedia[experience.slug],related=experienceCatalog.filter(item=>item.slug!==experience.slug).slice(0,2);
  useEffect(()=>{document.body.style.overflow=lightbox!==null?'hidden':'';const close=e=>e.key==='Escape'&&setLightbox(null);window.addEventListener('keydown',close);return()=>{document.body.style.overflow='';window.removeEventListener('keydown',close)}},[lightbox]);
  useGsapContext(root,()=>{
    const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;if(!gsap||!ScrollTrigger)return;
    gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.from('.experience-hero-copy > *',{y:55,autoAlpha:0,duration:1.05,stagger:.1,ease:'power3.out',delay:.15});
      gsap.utils.toArray('.experience-reveal').forEach(section=>gsap.from(section.children,{y:65,autoAlpha:0,duration:1,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 78%',once:true}}));
      gsap.utils.toArray('.experience-parallax').forEach(image=>gsap.fromTo(image,{yPercent:-5,scale:1.06},{yPercent:5,scale:1,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
    });return()=>mm.revert();
  },[experience.slug]);
  useEffect(()=>{const gsap=window.gsap,img=root.current?.querySelector('.experience-chapter-visual img');if(gsap&&img&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(img,{autoAlpha:0,scale:1.045,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,scale:1,clipPath:'inset(0 0 0% 0)',duration:.85,ease:'power3.out'})},[chapter]);
  return <article ref={root} className={`experience-detail experience--${experience.slug}`}>
    <section className="experience-detail-hero" style={{backgroundImage:`url(${experience.hero})`}}><MediaVideo key={experience.slug} src={experienceVideos[experience.slug]} loop preload="metadata" poster={experience.hero} aria-hidden="true"/><div className="experience-hero-copy"><button onClick={()=>go('/experiences')}><ArrowLeft/> Todas as experiências</button><small>{experience.kicker}</small><h1>{experience.title}</h1><p>{experience.lead}</p></div><span className="experience-scroll">Deslizar <i/></span></section>
    <section className="experience-overview experience-reveal"><div><span>Sobre a experiência</span><h2>{media.intro}</h2></div><dl><div><dt>Duração</dt><dd>{experience.duration}</dd></div><div><dt>Disponibilidade</dt><dd>{experience.season}</dd></div><div><dt>Participantes</dt><dd>{experience.guests}</dd></div></dl><div className="experience-overview-images"><figure><img className="experience-parallax" src={media.overview[0]} alt={`Enquadramento de ${experience.title}`}/></figure><figure><img className="experience-parallax" src={media.overview[1]} alt={`Paisagem de ${experience.title}`}/></figure></div></section>
    <section className="experience-chapters"><header><span>A experiência</span><strong>0{chapter+1} / 04</strong></header><nav aria-label="Momentos da experiência">{media.chapters.map((item,index)=><button className={chapter===index?'active':''} onClick={()=>setChapter(index)} key={item[1]}><small>0{index+1}</small><span>{item[1]}</span><i/></button>)}</nav><div className="experience-chapter-body"><div><span>{media.chapters[chapter][0]}</span><h2>{media.chapters[chapter][1]}</h2><p>{media.chapters[chapter][2]}</p><button onClick={()=>setChapter((chapter+1)%media.chapters.length)}>Próximo momento <ArrowRight/></button></div><figure className="experience-chapter-visual"><img key={media.chapters[chapter][3]} src={media.chapters[chapter][3]} alt={media.chapters[chapter][1]}/></figure></div></section>
    <section className="experience-moments experience-reveal"><header><span>Momentos</span><h2>{media.momentsTitle}</h2></header><div>{media.gallery.map((src,index)=><button key={src} onClick={()=>setLightbox(index)} aria-label={`Abrir imagem ${index+1}`}><img src={src} alt=""/><span>0{index+1}</span></button>)}</div></section>
    <section className="experience-included experience-reveal"><div><span>Incluído</span><h2>{media.includedTitle}</h2></div><ul>{experience.includes.map((item,index)=><li key={item}><small>0{index+1}</small>{item}</li>)}</ul></section>
    <section className="experience-book experience-reveal"><span>Experiência privada</span><h2>{media.bookingTitle}</h2><p>{media.bookingText}</p><Link to="/reservations" go={go} light>Reservar experiência</Link></section>
    <section className="experience-related experience-reveal"><header><span>Continuar a descobrir</span><h2>Outras experiências</h2></header><div>{related.map(item=><button key={item.slug} onClick={()=>go(`/experiences/${item.slug}`)} style={{backgroundImage:`url(${experienceMedia[item.slug].related})`}}><span>{item.kicker}</span><h3>{item.title}</h3><ArrowRight/></button>)}</div></section>
    {lightbox!==null?<GalleryDialog images={media.gallery} activeIndex={lightbox} title={experience.title} variant="experience" onClose={()=>setLightbox(null)} onChange={setLightbox}/>:null}
  </article>
}
const stories=[['Lugar','A luz na Comporta',img.coast],['Design','Materiais que envelhecem bem',img.atelier],['Pessoas','Os pescadores do Sado',img.horse],['Viver','Um guia para manhãs lentas',img.dining],['Lugar','Caminhos entre pinheiros',img.field]];
export function Journal(){const[f,setF]=useState('Todos'),items=f==='Todos'?stories:stories.filter(x=>x[0]===f);return <section className="journal"><header><h1>Journal</h1><p>Pensamentos sobre lugar, pessoas, design e a arte de viver devagar.</p></header><nav>{['Todos','Lugar','Design','Pessoas','Viver'].map(x=><button key={x} className={f===x?'active':''} onClick={()=>setF(x)}>{x}</button>)}</nav><div className="stories">{items.map((x,i)=><article key={x[1]} className={i===0?'featured':''}><img src={x[2]} alt={x[1]} loading="lazy"/><div><small>{x[0]}</small><h2>{x[1]}</h2><p>Uma história sobre o ritmo das estações e a beleza da simplicidade.</p><button>Ler história <ArrowRight size={14}/></button></div></article>)}</div></section>}
const bookingRooms=suites.map((suite,index)=>({
  name:suite.name,
  meta:suite.meta,
  price:['€ 790','€ 1.150','€ 940'][index],
  image:suite.photos[0],
}));
const bookingExperiences=[
  {name:'Cavalos na areia',meta:'2h · Costa atlântica',price:'€ 280',image:img.horse,video:'/media/experience-horse.mp4'},
  {name:'Caminho dos arrozais',meta:'3h · Aldeias e paisagem',price:'€ 240',image:img.field,video:'/media/experience-rice.mp4'},
  {name:'Mesa da Comporta',meta:'Jantar · Menu de autor',price:'€ 190',image:img.dining,video:'/media/dining-plating.mp4'},
  {name:'Ritual Juniper',meta:'90 min · Spa botânico',price:'€ 220',image:img.spa,video:'/media/07-retreat.mp4'},
];
const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const sameDay=(a,b)=>a&&b&&dateKey(a)===dateKey(b);
const formatBookingDate=date=>date?.toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit',year:'numeric'})||'';
function BookingCalendar({start,end,onChange,onClose}){
  const initial=new Date(start.getFullYear(),start.getMonth(),1);
  const[month,setMonth]=useState(initial);
  const selectDate=date=>{
    if(!start||end||date<start)onChange(date,null);
    else onChange(start,date);
  };
  const renderMonth=offset=>{
    const first=new Date(month.getFullYear(),month.getMonth()+offset,1);
    const days=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
    const leading=(first.getDay()+6)%7;
    const cells=[...Array(leading).fill(null),...Array.from({length:days},(_,i)=>new Date(first.getFullYear(),first.getMonth(),i+1))];
    return <div className="calendar-month"><h3>{first.toLocaleDateString('pt-PT',{month:'long',year:'numeric'})}</h3><div className="calendar-weekdays">{['S','T','Q','Q','S','S','D'].map((day,i)=><span key={`${day}${i}`}>{day}</span>)}</div><div className="calendar-days">{cells.map((date,i)=>date?<button type="button" key={dateKey(date)} onClick={()=>selectDate(date)} className={`${sameDay(date,start)?'range-start ':''}${sameDay(date,end)?'range-end ':''}${start&&end&&date>start&&date<end?'in-range':''}`} aria-label={date.toLocaleDateString('pt-PT')}>{date.getDate()}</button>:<i key={`empty-${i}`}/>)}</div></div>;
  };
  return <div className="booking-calendar" role="dialog" aria-label="Escolher datas"><div className="calendar-nav"><button type="button" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))} aria-label="Mês anterior"><ArrowLeft/></button><button type="button" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))} aria-label="Mês seguinte"><ArrowRight/></button></div><div className="calendar-grid">{renderMonth(0)}{renderMonth(1)}</div><footer><span><b>{formatBookingDate(start)}</b>{end?` — ${formatBookingDate(end)}`:' — escolha a saída'}</span><button type="button" disabled={!end} onClick={onClose}>Aplicar</button></footer></div>;
}
export function Booking(){
  const defaultStart=new Date(2026,6,29),defaultEnd=new Date(2026,6,31);
  const[g,setG]=useState(2),[done,setDone]=useState(false),[calendarOpen,setCalendarOpen]=useState(false),[start,setStart]=useState(defaultStart),[end,setEnd]=useState(defaultEnd),[selectedRoom,setSelectedRoom]=useState(bookingRooms[0].name),[selectedExperiences,setSelectedExperiences]=useState([]),[hoveredVisual,setHoveredVisual]=useState(null),[visualVersion,setVisualVersion]=useState(0);
  const activeVisual=hoveredVisual||{name:'',price:'',image:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',video:null};
  const selectedExperienceData=null;
  const showVisual=item=>{setHoveredVisual(item);setVisualVersion(version=>version+1)};
  const selectRoom=room=>{setSelectedRoom(room.name);setVisualVersion(version=>version+1)};
  const toggleExperience=experience=>{setSelectedExperiences(current=>current.includes(experience.name)?current.filter(item=>item!==experience.name):[...current,experience.name]);setVisualVersion(version=>version+1)};
  const clearVisual=()=>setHoveredVisual(null);
  return <section className="booking">
    <div className="bookingform">
      {done?<div className="success"><small>Pedido recebido</small><h1>O seu tempo<br/>começa aqui.</h1><p>Recebemos o seu pedido para {formatBookingDate(start)} — {formatBookingDate(end)}, em {selectedRoom}{selectedExperiences.length?`, incluindo ${selectedExperiences.length} ${selectedExperiences.length===1?'experiência':'experiências'}`:''}. A nossa equipa entrará em contacto consigo muito em breve.</p><button onClick={()=>setDone(false)}>Alterar pedido</button></div>:<>
        <h1>Reservas</h1>
        <p>Comece a desenhar a sua estadia e acrescente os momentos que quer viver.</p>
        <form onSubmit={e=>{e.preventDefault();setDone(true)}}>
          <label className="date-field">Check-in — Check-out<button type="button" className="date-trigger" onClick={()=>setCalendarOpen(open=>!open)} aria-expanded={calendarOpen}><span>{formatBookingDate(start)} — {formatBookingDate(end)}</span><CalendarDays size={17}/></button>{calendarOpen?<BookingCalendar start={start} end={end} onChange={(nextStart,nextEnd)=>{setStart(nextStart);setEnd(nextEnd)}} onClose={()=>setCalendarOpen(false)}/>:null}</label>
          <label>Hóspedes<span className="step"><button type="button" onClick={()=>setG(Math.max(1,g-1))}><Minus/></button><b>{g} Adultos</b><button type="button" onClick={()=>setG(g+1)}><Plus/></button></span></label>
          <fieldset className="booking-rooms"><legend>Alojamento <small>Selecione um</small></legend><div>{bookingRooms.map(room=><BookingOptionCard key={room.name} item={room} selected={selectedRoom===room.name} priceLabel="Desde" suffix="/ noite" onPreview={showVisual} onPreviewEnd={clearVisual} onSelect={selectRoom}/>)}</div></fieldset>
          <fieldset className="booking-experiences"><legend>Experiências <small>Selecione todas as que desejar</small></legend><div>{bookingExperiences.map(experience=><BookingOptionCard key={experience.name} item={experience} selected={selectedExperiences.includes(experience.name)} priceLabel="Por pessoa" showStatus onPreview={showVisual} onPreviewEnd={clearVisual} onSelect={toggleExperience}/>)}</div></fieldset>
          <button className="submit" disabled={!start||!end}>Verificar disponibilidade</button>
        </form>
        <small>Prefere falar connosco?<br/>+351 265 499 120</small>
      </>}
    </div>
    <figure className="booking-visual">
      <MediaVideo className="booking-base-video" src="/media/08-evening.mp4" loop/>
      {activeVisual.video?<MediaVideo className="booking-active-media" key={`${activeVisual.name}-${visualVersion}`} src={activeVisual.video} loop poster={activeVisual.image} aria-label={activeVisual.name}/>:<img className="booking-active-media" key={`${activeVisual.name}-${visualVersion}`} src={activeVisual.image} alt={activeVisual.name}/>}
      <div className="booking-visual-caption"><span>{hoveredVisual?'A descobrir':selectedExperienceData?'Experiência selecionada':'Alojamento selecionado'}</span><b>{activeVisual.name}</b><small>{activeVisual.price}</small></div>
      <figcaption>Comporta · Portugal</figcaption>
    </figure>
  </section>;
}

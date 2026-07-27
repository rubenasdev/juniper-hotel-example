import { useEffect, useRef, useState } from 'react';
import { GalleryDialog } from '../components/gallery/GalleryDialog';
import { MediaVideo } from '../components/ui/MediaVideo';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { images as img } from '../data/images';
import { ArrowLeft, ArrowRight, PageLink as Link } from './shared';

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
  useBodyScrollLock(lightbox!==null);
  useEffect(()=>{const close=e=>e.key==='Escape'&&setLightbox(null);window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[]);
  useGsapContext(root,()=>{
    gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.from('.experience-hero-copy > *',{y:55,autoAlpha:0,duration:1.05,stagger:.1,ease:'power3.out',delay:.15});
      gsap.utils.toArray('.experience-reveal').forEach(section=>gsap.from(section.children,{y:65,autoAlpha:0,duration:1,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 78%',once:true}}));
      gsap.utils.toArray('.experience-parallax').forEach(image=>gsap.fromTo(image,{yPercent:-5,scale:1.06},{yPercent:5,scale:1,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
    });return()=>mm.revert();
  },experience.slug);
  useEffect(()=>{const img=root.current?.querySelector('.experience-chapter-visual img');if(img&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(img,{autoAlpha:0,scale:1.045,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,scale:1,clipPath:'inset(0 0 0% 0)',duration:.85,ease:'power3.out'})},[chapter]);
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

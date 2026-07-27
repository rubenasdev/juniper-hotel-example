import { useEffect, useRef, useState } from 'react';
import { MediaVideo } from '../components/ui/MediaVideo';
import { PageLink as Link } from './shared';

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

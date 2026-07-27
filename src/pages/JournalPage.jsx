import { useState } from 'react';
import { images as img } from '../data/images';
import { ArrowRight } from './shared';

const stories=[['Lugar','A luz na Comporta',img.coast],['Design','Materiais que envelhecem bem',img.atelier],['Pessoas','Os pescadores do Sado',img.horse],['Viver','Um guia para manhãs lentas',img.dining],['Lugar','Caminhos entre pinheiros',img.field]];
export function Journal(){const[f,setF]=useState('Todos'),items=f==='Todos'?stories:stories.filter(x=>x[0]===f);return <section className="journal"><header><h1>Journal</h1><p>Pensamentos sobre lugar, pessoas, design e a arte de viver devagar.</p></header><nav>{['Todos','Lugar','Design','Pessoas','Viver'].map(x=><button key={x} className={f===x?'active':''} onClick={()=>setF(x)}>{x}</button>)}</nav><div className="stories">{items.map((x,i)=><article key={x[1]} className={i===0?'featured':''}><img src={x[2]} alt={x[1]} loading="lazy"/><div><small>{x[0]}</small><h2>{x[1]}</h2><p>Uma história sobre o ritmo das estações e a beleza da simplicidade.</p><button>Ler história <ArrowRight size={14}/></button></div></article>)}</div></section>}

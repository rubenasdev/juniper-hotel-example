import { useState } from '/src/vendor/react.bundle.mjs';
const links=[['/suites','Suites'],['/dining','Mesa'],['/experiences','Experiências'],['/journal','Journal']];
const A=({to,go,children,className=''})=><a className={className} href={to} onClick={e=>{e.preventDefault();go(to)}}>{children}</a>;
export function Header({path,go}){const[open,setOpen]=useState(false);return <header className={`header ${open?'open':''}`}><A to="/" go={go} className="brand">JUNIPER</A><nav>{links.map(([to,label])=><A key={to} to={to} go={go} className={path===to?'active':''}>{label}</A>)}</nav><A to="/reservations" go={go} className="book">Reservar ↗</A><button className="hamb" onClick={()=>setOpen(!open)} aria-label="Menu"><i/><i/></button></header>}

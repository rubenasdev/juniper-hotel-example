import { useEffect, useState } from '/src/vendor/react.bundle.mjs';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home, Suites, Dining, Experiences, Journal, Booking } from './components/Pages';
const routes={'/':Home,'/suites':Suites,'/dining':Dining,'/experiences':Experiences,'/journal':Journal,'/reservations':Booking};
export function App(){const [path,setPath]=useState(location.pathname);useEffect(()=>{const sync=()=>setPath(location.pathname);addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync)},[]);const go=(to)=>{history.pushState({},'',to);dispatchEvent(new PopStateEvent('popstate'));scrollTo(0,0)};const Page=routes[path]||Home;return <div className={`site ${['/','/dining','/reservations'].includes(path)?'dark-head':''} ${path==='/'?'home-route':''}`}><Header path={path} go={go}/><main key={path}><Page go={go}/></main>{path!='/reservations'&&<Footer go={go}/>}</div>}

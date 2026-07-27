import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home, Suites, Dining, Experiences, ExperienceDetail, Journal, Booking } from './pages';
import { HomeExtensions } from './components/HomeExtensions';
import { Loader } from './components/Loader';
import { useVideoPreloader } from './hooks/useVideoPreloader';
import { videos } from './data/media';
const HomeComplete=({go,canPlay})=><><Home go={go} canPlay={canPlay}/><HomeExtensions go={go}/></>;
const routes={'/':HomeComplete,'/suites':Suites,'/dining':Dining,'/experiences':Experiences,'/journal':Journal,'/reservations':Booking};
export function App(){const [path,setPath]=useState(location.pathname);const[entered,setEntered]=useState(()=>location.pathname!=='/');const{ready,progress}=useVideoPreloader(videos);useEffect(()=>{const sync=()=>setPath(location.pathname);addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync)},[]);const go=useCallback((to)=>{history.pushState({},'',to);dispatchEvent(new PopStateEvent('popstate'));scrollTo(0,0)},[]);const enter=useCallback(()=>setEntered(true),[]);const experienceSlug=path.startsWith('/experiences/')?path.split('/')[2]:null;const Page=experienceSlug?ExperienceDetail:(routes[path]||Home);const routeName=experienceSlug?'experience-detail':path==='/'?'home':path.slice(1);return <div className={`site route-${routeName} ${['/','/dining','/reservations'].includes(path)||experienceSlug?'dark-head':''} ${path==='/'?'home-route':''}`}>{path==='/'&&!entered?<Loader progress={progress} ready={ready} onComplete={enter}/>:null}<Header path={path} go={go}/><main key={path}><Page go={go} slug={experienceSlug} canPlay={entered||path!=='/'}/></main>{path!='/reservations'?<Footer go={go}/>:null}</div>}

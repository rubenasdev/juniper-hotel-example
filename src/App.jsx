import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeExtensions } from './components/HomeExtensions';
import { Loader } from './components/Loader';
import { RouteLoader } from './components/RouteLoader';
import { useVideoPreloader } from './hooks/useVideoPreloader';
import { videos } from './data/media';
import { Booking, Dining, ExperienceDetail, Experiences, Home, Journal, NotFound, Suites } from './pages/lazyRoutes';
import { useLanguage } from './hooks/useLanguage';

const experienceSlugs = new Set(['praia-oceano', 'cavalo-pinhal', 'arrozais-aldeias', 'wellness-rituais']);
const routes = { '/suites': Suites, '/dining': Dining, '/experiences': Experiences, '/journal': Journal, '/reservations': Booking };

function HomeComplete({ go, canPlay, headerRef }) {
  return <><Home go={go} canPlay={canPlay} headerRef={headerRef}/><HomeExtensions go={go}/></>;
}

function resolveRoute(path) {
  if (path === '/') return { Page: HomeComplete, name: 'home', valid: true };
  const slug = path.match(/^\/experiences\/([^/]+)\/?$/)?.[1];
  if (slug && experienceSlugs.has(slug)) return { Page: ExperienceDetail, name: 'experience-detail', slug, valid: true };
  if (routes[path]) return { Page: routes[path], name: path.slice(1), valid: true };
  return { Page: NotFound, name: 'not-found', valid: false };
}

export function App() {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const language = useLanguage();
  const [path, setPath] = useState(() => location.pathname.replace(/\/$/, '') || '/');
  const [entered, setEntered] = useState(() => location.pathname !== '/');
  const { ready, progress } = useVideoPreloader(videos);
  useEffect(() => {
    const sync = () => setPath(location.pathname.replace(/\/$/, '') || '/');
    addEventListener('popstate', sync);
    return () => removeEventListener('popstate', sync);
  }, []);
  const go = useCallback(to => {
    const next = new URL(to, location.origin);
    history.pushState({}, '', `${next.pathname}${next.search}${next.hash}`);
    setPath(next.pathname.replace(/\/$/, '') || '/');
    scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const completeEntrance = useCallback(() => setEntered(true), []);
  const route = resolveRoute(path);
  const darkHead = ['/', '/dining', '/reservations'].includes(path) || route.name === 'experience-detail';
  return <div key={language} className={`site route-${route.name} ${darkHead ? 'dark-head' : ''} ${path === '/' ? 'home-route' : ''}`}>
    {path === '/' && !entered ? <Loader progress={progress} ready={ready} onComplete={completeEntrance}/> : null}
    <Header ref={headerRef} contentRef={contentRef} path={path} go={go}/>
    <main ref={contentRef} id="main-content" key={path} tabIndex="-1">
      <Suspense fallback={<RouteLoader/>}><route.Page go={go} slug={route.slug} canPlay={entered || path !== '/'} headerRef={headerRef}/></Suspense>
    </main>
    {path !== '/reservations' ? <Footer id={path==='/'?'home-reserve':undefined} go={go}/> : null}
  </div>;
}

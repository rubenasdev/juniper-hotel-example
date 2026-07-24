import { useEffect, useRef, useState } from '/src/vendor/react.bundle.mjs';
const gsap = window.gsap; const ScrollTrigger = window.ScrollTrigger;
import { videos } from '../data/media';
import { useGsapContext } from '../hooks/useGsapContext';
gsap.registerPlugin(ScrollTrigger);

export function Hero({ canPlay }) {
  const root = useRef(null); const [active, setActive] = useState(0);
  useEffect(() => {
    if (!canPlay) return;
    const el = root.current?.querySelector('video'); if (!el) return;
    el.load(); el.play().catch(() => {});
  }, [active, canPlay]);
  useGsapContext(root, () => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const header = document.querySelector('.header');
      const timeline = gsap.timeline({scrollTrigger:{trigger:root.current,start:'top top',end:'+=240%',scrub:1,pin:true,onLeave:()=>header?.classList.add('after-hero'),onEnterBack:()=>header?.classList.remove('after-hero')}})
        .to(header,{autoAlpha:0,y:-12,duration:.18},.05)
        .to('.hero-copy,.scroll-cue',{opacity:0,y:-24,duration:.25},0)
        .to('.hero-mask',{webkitMaskSize:'650% 650%',maskSize:'650% 650%',duration:.82,ease:'none'},0)
        .to('.hero-mask',{opacity:0,duration:.18,ease:'none'},.82)
        .to('.clip-count',{opacity:0,duration:.15},.85)
        .fromTo('.hero-location',{autoAlpha:0,y:42},{autoAlpha:1,y:0,duration:.42,ease:'power2.out'},.96)
        .to('.hero-location',{autoAlpha:0,y:-24,duration:.22,ease:'power2.in'},1.72)
        .to(header,{autoAlpha:1,y:0,duration:.18,ease:'power2.out'},1.78);
      return () => { timeline.kill(); header?.classList.remove('after-hero'); };
    });
    return () => mm.revert();
  }, []);
  return <section className="hero" id="top" ref={root}>
    <div className="hero-media"><video key={videos[active]} autoPlay={canPlay} muted playsInline preload={active < 2 ? 'auto' : 'metadata'} onEnded={() => setActive(i => (i + 1) % videos.length)}><source src={videos[active]} type="video/mp4"/></video></div>
    <div className="hero-mask" aria-hidden="true"/>
    <h1 className="hero-title">JUNIPER</h1>
    <div className="hero-copy"><p>Hotel & Retreat</p><p>Comporta · Portugal</p></div>
    <div className="scroll-cue"><span>Deslize para entrar</span><i/></div>
    <div className="clip-count" aria-live="polite">{String(active+1).padStart(2,'0')} / 08</div>
    <div className="hero-location">
      <span>Juniper Hotel & Retreat</span>
      <h2>Comporta</h2>
      <p>Entre o pinhal, os arrozais e o Atlântico</p>
      <div><a href="/reservations">Reservar</a><i/><span>Portugal · 38.3805° N</span></div>
    </div>
  </section>;
}

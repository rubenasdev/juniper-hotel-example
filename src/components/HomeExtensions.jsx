import { useEffect, useRef } from 'react';
import { MEDIA } from '../config/responsive';

const rooms = [
  { name: 'Cabana', meta: '52 m² · Jardim privado', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88' },
  { name: 'Juniper Villa', meta: '78 m² · Terraço panorâmico', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=88' },
  { name: 'Atelier', meta: '64 m² · Pátio de água', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1800&q=88' },
];

function Arrow(){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>}

export function HomeExtensions({ go }) {
  const section = useRef(null);
  const rail = useRef(null);
  useEffect(() => {
    const root = section.current;
    const element = rail.current;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!root || !element || !gsap || !ScrollTrigger) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(MEDIA.horizontalRooms, () => {
      const distance = () => Math.max(0, element.scrollWidth - window.innerWidth + window.innerWidth * .05);
      const tween = gsap.to(element, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${Math.max(distance(), window.innerWidth * 1.25)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    media.add(MEDIA.roomsNative, () => {
    const horizontalWheel = event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };
    element.addEventListener('wheel', horizontalWheel, { passive: false });
    return () => element.removeEventListener('wheel', horizontalWheel);
    });
    return () => media.revert();
  }, []);

  const openRoom = index => go(`/suites?room=${index}`);
  return <>
    <section className="home-rooms" id="home-rooms" ref={section}>
      <header><span>02 / Alojamentos</span><h2><span>Escolha o seu</span> <em>lugar de pausa.</em></h2><p>Três formas distintas de habitar a mesma paisagem. Percorra para descobrir.</p></header>
      <div className="home-room-rail" ref={rail}>
        {rooms.map((room,index)=><button key={room.name} onClick={()=>openRoom(index)} className="home-room-card">
          <img src={room.image} alt={room.name}/><span>0{index+1}</span><div><h3>{room.name}</h3><p>{room.meta}</p><i><Arrow/></i></div>
        </button>)}
        <button className="home-room-end" onClick={()=>go('/suites')}><span>Ver todos<br/>os espaços</span><Arrow/></button>
      </div>
      <div className="rail-instruction"><i/><span>Scroll horizontal</span></div>
    </section>

    <section className="home-spa" id="home-spa">
      <div className="spa-copy"><span>03 / Spa</span><h2>O corpo também<br/>precisa de <em>silêncio.</em></h2><p>Rituais lentos, botânica local e o tempo necessário para regressar a si.</p><a href="/experiences" onClick={event=>{event.preventDefault();go('/experiences')}}>Descobrir os rituais <Arrow/></a></div>
      <div className="spa-media"><video autoPlay muted loop playsInline><source src="/media/07-retreat.mp4" type="video/mp4"/></video><span>Respirar · Libertar · Renovar</span></div>
      <blockquote>“O luxo de não ter pressa.”</blockquote>
    </section>

    <section className="home-table" id="home-table">
      <div className="table-media"><video autoPlay muted loop playsInline><source src="/media/05-dining.mp4" type="video/mp4"/></video></div>
      <div className="table-copy"><span>04 / Mesa</span><h2>Da terra,<br/>para a mesa.</h2><p>Uma cozinha guiada pelo que cresce perto, pelo que chega do mar e pelo ritmo de cada estação.</p><div><a href="/dining" onClick={event=>{event.preventDefault();go('/dining')}}>Conhecer o restaurante <Arrow/></a><small>Jantar · 19:00—23:00</small></div></div>
      <p className="table-note">Comporta · Portugal</p>
    </section>
  </>;
}

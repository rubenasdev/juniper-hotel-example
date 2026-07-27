import { useEffect, useRef } from 'react';

const gsap = window.gsap;

export function Loader({ progress, ready, onComplete }) {
  const root = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    if (!ready || !root.current) return undefined;
    const timeline = gsap.timeline({ delay: .28, onComplete });
    timeline
      .to(root.current.querySelector('.loader-minimal'), { opacity: 0, y: -8, duration: .3, ease: 'power2.in' })
      .to(root.current.querySelector('.loader-curtain--left'), { xPercent: -101, duration: 1, ease: 'power4.inOut' }, .15)
      .to(root.current.querySelector('.loader-curtain--right'), { xPercent: 101, duration: 1, ease: 'power4.inOut' }, .15);
    return () => timeline.kill();
  }, [ready, onComplete]);

  return <div className="loader" ref={root} aria-label="Loading Juniper" aria-live="polite">
    <div className="loader-curtain loader-curtain--left"/><div className="loader-curtain loader-curtain--right"/>
    <div className="loader-minimal">
      <span>Comporta · Portugal</span>
      <strong>{String(progress).padStart(2,'0')}</strong>
      <div><i style={{ transform: `scaleX(${progress / 100})` }}/></div>
      <small>A preparar a sua chegada</small>
    </div>
  </div>;
}

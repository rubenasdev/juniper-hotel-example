import { Icon } from '../ui/Icon';
import { useEffect, useRef } from 'react';

const formatIndex = value => String(value + 1).padStart(2, '0');

export function GalleryDialog({ images, activeIndex, title, variant, onClose, onChange }) {
  const dialogRef = useRef(null);
  const isSuite = variant === 'suite';
  const previous = () => onChange((activeIndex - 1 + images.length) % images.length);
  const next = () => onChange((activeIndex + 1) % images.length);
  const closeFromBackdrop = event => {
    if (event.target === event.currentTarget) onClose();
  };
  const image = images[activeIndex];
  const count = `${formatIndex(activeIndex)} / ${String(images.length).padStart(2, '0')}`;
  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector('button')?.focus();
    const keepFocus = event => {
      if (event.key !== 'Tab' || !dialog) return;
      const controls = [...dialog.querySelectorAll('button:not(:disabled)')];
      if (!controls.length) return;
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', keepFocus);
    return () => { window.removeEventListener('keydown', keepFocus); previousFocus?.focus?.(); };
  }, []);

  return <div
    ref={dialogRef}
    className={isSuite ? 'suite-lightbox' : 'experience-lightbox'}
    role="dialog"
    aria-modal="true"
    aria-label={isSuite ? `Imagem ampliada da ${title}` : 'Galeria da experiência'}
    onMouseDown={isSuite ? closeFromBackdrop : undefined}
    onClick={isSuite ? undefined : closeFromBackdrop}
  >
    <button className={isSuite ? 'suite-lightbox-close' : 'close'} onClick={onClose} aria-label={isSuite ? 'Fechar imagem' : 'Fechar'}>
      {isSuite ? <span>Fechar</span> : null}<Icon name="plus" size={isSuite ? 22 : 20}/>
    </button>
    {!isSuite ? <button className="prev" aria-label="Imagem anterior" onClick={event => { event.stopPropagation(); previous(); }}><Icon name="left"/></button> : null}
    <img src={image} alt={isSuite ? `${title} — fotografia ${activeIndex + 1} ampliada` : `${title}, imagem ${activeIndex + 1}`} onClick={isSuite ? undefined : event => event.stopPropagation()}/>
    {!isSuite ? <button className="next" aria-label="Imagem seguinte" onClick={event => { event.stopPropagation(); next(); }}><Icon name="right"/></button> : null}
    {isSuite ? <div className="suite-lightbox-count">{count}</div> : <span>{count}</span>}
  </div>;
}

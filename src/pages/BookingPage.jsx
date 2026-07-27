import { useCallback, useEffect, useRef, useState } from 'react';
import { BookingOptionCard } from '../components/booking/BookingOptionCard';
import { MediaVideo } from '../components/ui/MediaVideo';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { suites } from '../data/suites';
import { images as img } from '../data/images';
import { ArrowLeft, CalendarDays, Minus, Plus } from './shared';

const bookingRooms=suites.map((suite,index)=>({
  name:suite.name,
  meta:suite.meta,
  price:['€ 790','€ 1.150','€ 940'][index],
  image:suite.photos[0],
}));
const bookingExperiences=[
  {name:'Cavalos na areia',meta:'2h · Costa atlântica',price:'€ 280',image:img.horse,video:'/media/experience-horse.mp4'},
  {name:'Caminho dos arrozais',meta:'3h · Aldeias e paisagem',price:'€ 240',image:img.field,video:'/media/experience-rice.mp4'},
  {name:'Mesa da Comporta',meta:'Jantar · Menu de autor',price:'€ 190',image:img.dining,video:'/media/dining-plating.mp4'},
  {name:'Ritual Juniper',meta:'90 min · Spa botânico',price:'€ 220',image:img.spa,video:'/media/07-retreat.mp4'},
];
const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const sameDay=(a,b)=>a&&b&&dateKey(a)===dateKey(b);
const formatBookingDate=date=>date?.toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit',year:'numeric'})||'';
const today=()=>{const value=new Date();return new Date(value.getFullYear(),value.getMonth(),value.getDate())};
const addDays=(date,days)=>new Date(date.getFullYear(),date.getMonth(),date.getDate()+days);
function BookingCalendar({start,end,onChange,onClose}){
  const dialogRef=useRef(null);
  const initial=new Date(start.getFullYear(),start.getMonth(),1);
  const[month,setMonth]=useState(initial);
  const minimum=today();
  const selectDate=date=>{
    if(date<minimum)return;
    if(!start||end||date<start)onChange(date,null);
    else onChange(start,date);
  };
  const renderMonth=offset=>{
    const first=new Date(month.getFullYear(),month.getMonth()+offset,1);
    const days=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
    const leading=(first.getDay()+6)%7;
    const cells=[...Array(leading).fill(null),...Array.from({length:days},(_,i)=>new Date(first.getFullYear(),first.getMonth(),i+1))];
    return <div className="calendar-month"><h3>{first.toLocaleDateString('pt-PT',{month:'long',year:'numeric'})}</h3><div className="calendar-weekdays" aria-hidden="true">{['S','T','Q','Q','S','S','D'].map((day,i)=><span key={`${day}${i}`}>{day}</span>)}</div><div className="calendar-days">{cells.map((date,i)=>date?<button type="button" key={dateKey(date)} disabled={date<minimum} onClick={()=>selectDate(date)} className={`${sameDay(date,start)?'range-start ':''}${sameDay(date,end)?'range-end ':''}${start&&end&&date>start&&date<end?'in-range':''}`} aria-pressed={sameDay(date,start)||sameDay(date,end)} aria-label={date.toLocaleDateString('pt-PT',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}>{date.getDate()}</button>:<i key={`empty-${i}`} aria-hidden="true"/>)}</div></div>;
  };
  const previousDisabled=new Date(month.getFullYear(),month.getMonth()+1,0)<minimum;
  useEffect(()=>{const previousFocus=document.activeElement,dialog=dialogRef.current;dialog?.querySelector('button:not(:disabled)')?.focus();const keyboard=event=>{if(event.key==='Escape'){onClose();return}if(event.key!=='Tab'||!dialog)return;const controls=[...dialog.querySelectorAll('button:not(:disabled)')],first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};window.addEventListener('keydown',keyboard);return()=>{window.removeEventListener('keydown',keyboard);previousFocus?.focus?.()}},[onClose]);
  return <div ref={dialogRef} id="booking-calendar" className="booking-calendar" role="dialog" aria-modal="true" aria-label="Escolher datas"><div className="calendar-nav"><button type="button" disabled={previousDisabled} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))} aria-label="Mês anterior"><ArrowLeft/></button><button type="button" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))} aria-label="Mês seguinte"><ArrowRight/></button></div><div className="calendar-grid">{renderMonth(0)}{renderMonth(1)}</div><footer><span><b>{formatBookingDate(start)}</b>{end?` — ${formatBookingDate(end)}`:' — escolha a saída'}</span><button type="button" disabled={!end} onClick={onClose}>Aplicar</button></footer></div>;
}
export function Booking(){
  const[g,setG]=useState(2),[done,setDone]=useState(false),[calendarOpen,setCalendarOpen]=useState(false),[start,setStart]=useState(()=>addDays(today(),2)),[end,setEnd]=useState(()=>addDays(today(),4)),[selectedRoom,setSelectedRoom]=useState(bookingRooms[0].name),[selectedExperiences,setSelectedExperiences]=useState([]),[hoveredVisual,setHoveredVisual]=useState(null),[visualVersion,setVisualVersion]=useState(0);
  useBodyScrollLock(calendarOpen);
  const closeCalendar=useCallback(()=>setCalendarOpen(false),[]);
  const selectedRoomData=bookingRooms.find(room=>room.name===selectedRoom);
  const selectedExperienceData=bookingExperiences.findLast(experience=>selectedExperiences.includes(experience.name));
  const activeVisual=hoveredVisual||selectedExperienceData||selectedRoomData;
  const showVisual=item=>{setHoveredVisual(item);setVisualVersion(version=>version+1)};
  const selectRoom=room=>{setSelectedRoom(room.name);setVisualVersion(version=>version+1)};
  const toggleExperience=experience=>{setSelectedExperiences(current=>current.includes(experience.name)?current.filter(item=>item!==experience.name):[...current,experience.name]);setVisualVersion(version=>version+1)};
  const clearVisual=()=>setHoveredVisual(null);
  return <section className="booking">
    <div className="bookingform">
      {done?<div className="success"><small>Pedido recebido</small><h1>O seu tempo<br/>começa aqui.</h1><p>Recebemos o seu pedido para {formatBookingDate(start)} — {formatBookingDate(end)}, em {selectedRoom}{selectedExperiences.length?`, incluindo ${selectedExperiences.length} ${selectedExperiences.length===1?'experiência':'experiências'}`:''}. A nossa equipa entrará em contacto consigo muito em breve.</p><button onClick={()=>setDone(false)}>Alterar pedido</button></div>:<>
        <h1>Reservas</h1>
        <p>Comece a desenhar a sua estadia e acrescente os momentos que quer viver.</p>
        <form onSubmit={e=>{e.preventDefault();setDone(true)}}>
          <div className="date-field"><span>Check-in — Check-out</span><button type="button" className="date-trigger" onClick={()=>setCalendarOpen(open=>!open)} aria-expanded={calendarOpen} aria-controls="booking-calendar"><span>{formatBookingDate(start)} — {formatBookingDate(end)}</span><CalendarDays size={17}/></button>{calendarOpen?<BookingCalendar start={start} end={end} onChange={(nextStart,nextEnd)=>{setStart(nextStart);setEnd(nextEnd)}} onClose={closeCalendar}/>:null}</div>
          <div className="guest-field"><span>Hóspedes</span><span className="step"><button type="button" aria-label="Remover hóspede" onClick={()=>setG(current=>Math.max(1,current-1))}><Minus/></button><b aria-live="polite">{g} Adultos</b><button type="button" aria-label="Adicionar hóspede" onClick={()=>setG(current=>current+1)}><Plus/></button></span></div>
          <fieldset className="booking-rooms"><legend>Alojamento <small>Selecione um</small></legend><div>{bookingRooms.map(room=><BookingOptionCard key={room.name} item={room} selected={selectedRoom===room.name} priceLabel="Desde" suffix="/ noite" onPreview={showVisual} onPreviewEnd={clearVisual} onSelect={selectRoom}/>)}</div></fieldset>
          <fieldset className="booking-experiences"><legend>Experiências <small>Selecione todas as que desejar</small></legend><div>{bookingExperiences.map(experience=><BookingOptionCard key={experience.name} item={experience} selected={selectedExperiences.includes(experience.name)} priceLabel="Por pessoa" showStatus onPreview={showVisual} onPreviewEnd={clearVisual} onSelect={toggleExperience}/>)}</div></fieldset>
          <button className="submit" disabled={!start||!end}>Verificar disponibilidade</button>
        </form>
        <small>Prefere falar connosco?<br/>+351 265 499 120</small>
      </>}
    </div>
    <figure className="booking-visual">
      <MediaVideo className="booking-base-video" src="/media/08-evening.mp4" loop/>
      {activeVisual.video?<MediaVideo className="booking-active-media" key={`${activeVisual.name}-${visualVersion}`} src={activeVisual.video} loop poster={activeVisual.image} aria-label={activeVisual.name}/>:<img className="booking-active-media" key={`${activeVisual.name}-${visualVersion}`} src={activeVisual.image} alt={activeVisual.name}/>}
      <div className="booking-visual-caption"><span>{hoveredVisual?'A descobrir':selectedExperienceData?'Experiência selecionada':'Alojamento selecionado'}</span><b>{activeVisual.name}</b><small>{activeVisual.price}</small></div>
      <figcaption>Comporta · Portugal</figcaption>
    </figure>
  </section>;
}
